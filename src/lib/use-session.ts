import { useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getSessionClient } from "../lib/session/client";
import {
	CreateSessionRequest,
	CreateSessionResponse,
	GetSessionRequest,
	GetSessionResponse,
	Session,
} from "../lib/generated/v1/services_pb";
import { addLocationChangeListener, useAsyncEffect } from "../lib/react-util";
import { changeLocationSearchParams, getLocationSearchParams } from "../lib/url-params";
import { assertNever, DeepReadonly, delay, noop } from "../lib/util";
import { SessionMutator } from "./session/mutator";
import { StorageCache } from "./storage-cache";

export interface Creating {
	readonly type: "Creating";
	readonly retries: number;
}
export interface Loading {
	readonly type: "Loading";
	readonly sessionUrn: string;
	readonly retries: number;
}
export interface Ready {
	readonly type: "Ready";
	readonly session: DeepReadonly<Session.AsObject>;
}

export type State = Ready | Loading | Creating;
export type CreateState = Ready | Loading | Creating;
export type LoadState = Ready | Loading;
type InternalState = Ready | Loading | Creating;

export type StateVisitor<S extends State, R> = {
	[K in S["type"]]: S extends { readonly type: K } ? (state: S) => R : never;
};

export function visitState<S extends State, R>(state: S, visitor: StateVisitor<S, R>): R {
	const fn = visitor[state.type as never] as (state: S) => R;
	return fn(state);
}

export type UseSessionArray<S extends State = State> = [
	state: S,
	/**
	 * This will temporarily change the currently displayed state to the given session object. After the given action
	 * completes (successfully or unsuccessfully), the session will be reloaded.
	 *
	 * This given session is only a temporary state to apply changes immediately on the user side.
	 *
	 * This function **will not** completely ignore the result/error of the given action promise. If the action
	 * succeeds, then the session will simply be reloaded. If the action fails, then the temporary change will
	 * immediately be rolled back and the session will be reloaded.
	 *
	 * This method is intended to be called synchronously. Calling this method asynchronously will result in undefined
	 * behavior.
	 */
	update: (action: Promise<void>, mutate: SessionMutator) => void
];

export function useCreateSession(): UseSessionArray<CreateState> {
	return useSession(true);
}

export function useLoadSession(): UseSessionArray<LoadState> {
	const [state, update] = useSession(false);
	return [toLoadState(state), update];
}

/**
 * The maximum amount of time after which a session object has to be refreshed.
 */
const AUTO_REFRESH_INTERVAL = 30_000;

/**
 * This is the implementation of the public `use*Session` variants above.
 *
 * ## Mutations
 *
 * Regarding mutations, this implements a journal. All mutations are done via the returned `update` function and have
 * to provide a mutator. This mutator is used to create a history of all mutations applied to our current view of the
 * session, the journal. This allows us to displays the effects of mutations immediately without having to synchronize
 * with the backend server. This significantly improves the user experience.
 *
 * We will synchronize with the backend server after all concurrent mutation requests completed.
 *
 * ### Assumptions
 *
 * This journal approach means that we do not have to wait for the backend server to respond until the effects of
 * mutations are shown to the user. However, it also means that we need to make additional assumptions:
 *
 * 1. We assume that the current user has exclusive write access to the session. (This is typically the case.)
 *
 *    If this assumption is not met, then the lack of synchronization while mutations are executing means that we might
 *    be mutating an outdated version of the session.
 *
 * 2. We assume that mutations of the backend server are applied in the same order as in our journal.
 *
 *    If this assumption is not met, then mutations will fail in the best case (we can detect and handle this) or
 *    succeed and produce different results on the backend server compared to our client-side view in the worst case.
 *
 *    The impact of not meeting this assumption very much depends on how long a mutation takes to execute on the
 *    backend server from the client's perspective (this includes network latency) and how many mutation requests the
 *    client sends. If there are no *concurrent* mutations, then they can't be out of order.
 *
 * 3. We assume that the mutators have the same effect as the mutations done by the server.
 *
 *    This is a rather obvious assumption. The journal will only work if we do the right thing as the backend server.
 *
 *    This means in practice, that the backend server and the mutators have to have a common understanding of how
 *    operations are implemented.
 *
 * @param create
 * @returns
 */
function useSession(create: boolean): UseSessionArray<InternalState> {
	const [state, setState] = useState<InternalState>(getDefaultState);
	const reload = useCallback(() => setState(getReloadState), [setState]);

	const [concurrentMutations, setConcurrentMutations] = useState(0);

	// update the session URN on URL changes
	useEffect(() => {
		return addLocationChangeListener(() => {
			const urn = getLocationSessionUrn();
			setState(prev => {
				const sessionUrn = getSessionUrn(prev);

				if (urn !== sessionUrn) {
					if (urn) {
						return { type: "Loading", sessionUrn: urn, retries: 0 };
					} else {
						return { type: "Creating", retries: 0 };
					}
				} else {
					return prev;
				}
			});
		});
	}, [setState]);

	// set the current URL params based on the current session
	useEffect(() => {
		const sessionUrn = getSessionUrn(state);
		if (sessionUrn) {
			setLocationSessionUrn(sessionUrn);
		}
	}, [state]);

	// this effect will advance the async state machine
	useAsyncEffect(
		async token => {
			switch (state.type) {
				case "Creating": {
					if (!create) {
						return;
					}
					await delay(getRetryDelay(state.retries));
					token.checkCanceled();

					return getSessionClient().createSession(new CreateSessionRequest(), null);
				}
				case "Loading": {
					if (concurrentMutations > 0) {
						// reloading while mutating doesn't make much sense right now.
						return;
					}

					await delay(getRetryDelay(state.retries));
					token.checkCanceled();

					const req = new GetSessionRequest();
					req.setSessionUrn(state.sessionUrn);
					return getSessionClient().getSession(req, null);
				}
			}
		},
		result => {
			if (result === undefined) {
				// don't change the current state
				return;
			}

			switch (state.type) {
				case "Creating": {
					const resp = result as CreateSessionResponse;
					setState({ type: "Loading", retries: 0, sessionUrn: resp.getSessionUrn() });
					break;
				}
				case "Loading": {
					const resp = result as GetSessionResponse;
					setState({ type: "Ready", session: (resp.getSession() ?? new Session()).toObject() });
					break;
				}
			}
		},
		reason => {
			console.error(reason);

			switch (state.type) {
				case "Creating":
					setState({ ...state, retries: state.retries + 1 });
					break;
				case "Loading":
					setState({ ...state, retries: state.retries + 1 });
					break;
				default:
					console.warn("Reached unreachable part");
			}
		},
		[concurrentMutations, state, setState, create]
	);

	// auto reload
	useAsyncEffect(
		async () => {
			if (state.type === "Ready") {
				await delay(AUTO_REFRESH_INTERVAL);
			} else {
				throw new Error("Not ready");
			}
		},
		reload,
		noop,
		[state, reload]
	);

	// update the last ready state
	const [lastReady, setLastReady] = useState<Ready | undefined>(
		state.type === "Loading" ? displayCache.get(state.sessionUrn) : undefined
	);
	useEffect(() => {
		if (state.type === "Ready") {
			setLastReady(state);
		}
	}, [state, setLastReady]);

	// This is a little trick to get a stable page.
	//
	// When we reload the current session, we will go into a loading state. This means that the page will then display
	// a loading page. This is very annoying when the reload happens because of user interaction (e.g. the user adding
	// a new item). So to prevent the loading page from being visible for a fraction of a second, we will instead show
	// the last ready state while internally working on uploading the session.
	const stableState = getStableState(state, lastReady);

	const [journal, setJournal] = useState<Journal>();

	// reset the log after each refresh
	useEffect(() => {
		if (journal && journal.forState !== stableState) {
			setJournal(undefined);
		}
	}, [journal, setJournal, stableState]);

	const update: UseSessionArray[1] = useCallback(
		(action, mutator) => {
			setConcurrentMutations(prev => prev + 1);

			const item = new JournalItem(mutator);

			setJournal(prev => {
				const log = prev ?? (stableState.type === "Ready" ? Journal.empty(stableState) : undefined);
				return log?.withMutation(item);
			});

			action.then(
				() => {
					setConcurrentMutations(prev => prev - 1);
					reload();
				},
				() => {
					setConcurrentMutations(prev => prev - 1);
					// An error occurred, so we want to roll back the mutation in our journal.
					// This is done by simply removing the mutator.
					setJournal(prev => prev?.withoutMutation(item.id));
					reload();
				}
			);
		},
		[stableState, setJournal, setConcurrentMutations, reload]
	);

	console.log(state);

	const displayState = journal?.current ?? stableState;
	useEffect(() => {
		if (displayState.type === "Ready") {
			displayCache.set(displayState.session.urn, displayState, AUTO_REFRESH_INTERVAL * 2);
		} else if (displayState.type === "Loading") {
			displayCache.delete(displayState.sessionUrn);
		}
	}, [displayState]);

	return [displayState, update];
}

function getLocationSessionUrn(): string | null {
	const sessionUrn = getLocationSearchParams().get("urn");
	if (sessionUrn) {
		return sessionUrn;
	} else {
		return null;
	}
}
function setLocationSessionUrn(sessionUrn: string): void {
	changeLocationSearchParams("replace", { urn: sessionUrn });
}

function getDefaultState(): InternalState {
	const sessionUrn = getLocationSessionUrn();

	if (sessionUrn) {
		return { type: "Loading", sessionUrn, retries: 0 };
	} else {
		return { type: "Creating", retries: 0 };
	}
}

const displayCache = new StorageCache<string, Ready>("last-display");

function getReloadState(state: InternalState): InternalState {
	switch (state.type) {
		case "Creating":
			return state;
		case "Loading":
			return { ...state, retries: 0 };
		case "Ready":
			return { type: "Loading", retries: 0, sessionUrn: state.session.urn };
		default:
			assertNever(state);
	}
}

type SessionUrn<S extends State> = S extends Loading ? string : S extends Ready ? string : null;
export function getSessionUrn<S extends State>(state: S): SessionUrn<S>;
export function getSessionUrn(state: State): string | null {
	switch (state.type) {
		case "Loading":
			return state.sessionUrn;
		case "Ready":
			return state.session.urn;
		default:
			return null;
	}
}

function getRetryDelay(retries: number): number {
	if (retries === 0) {
		return 0;
	} else if (retries < 3) {
		// the first 3 retires should be fast
		return 500;
	} else if (retries <= 10) {
		// then we slow down a little
		return 5_000;
	} else {
		// and then slow sown even further
		return 60_000;
	}
}

const NO_SESSION_PARAM: Loading = { type: "Loading", sessionUrn: "", retries: Infinity };

function toLoadState(state: InternalState): LoadState {
	if (state.type === "Creating") {
		return NO_SESSION_PARAM;
	} else {
		return state;
	}
}

function getStableState(state: InternalState, lastReady: Ready | undefined): InternalState {
	if (state.type === "Loading" && state.retries < 3 && lastReady && lastReady.session.urn === state.sessionUrn) {
		return lastReady;
	}
	return state;
}

class Journal {
	readonly forState: Ready;
	readonly mutations: readonly JournalItem[];
	readonly current: Ready;

	private constructor(forState: Ready, mutations: readonly JournalItem[], current: Ready) {
		this.forState = forState;
		this.mutations = mutations;
		this.current = current;
	}

	static empty(forState: Ready): Journal {
		return new Journal(forState, [], forState);
	}

	withMutation(mutator: JournalItem): Journal {
		return new Journal(this.forState, [...this.mutations, mutator], {
			type: "Ready",
			session: mutator.mutator(this.current.session),
		});
	}

	withoutMutation(id: string): Journal {
		const mutations = this.mutations.filter(m => m.id !== id);
		return new Journal(this.forState, mutations, {
			type: "Ready",
			session: mutations.reduce((session, item) => {
				return item.mutator(session);
			}, this.forState.session),
		});
	}
}

class JournalItem {
	readonly id: string;
	readonly mutator: SessionMutator;

	constructor(mutator: SessionMutator) {
		this.id = uuidV4();
		this.mutator = mutator;
	}
}
