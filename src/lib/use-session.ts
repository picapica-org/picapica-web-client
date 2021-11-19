import { useEffect, useState, useCallback } from "react";
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
import { changeURLSearchParams, getURLSearchParams } from "../lib/url-params";
import { assertNever, DeepReadonly, delay } from "../lib/util";

export interface Creating {
	readonly type: "Creating";
	readonly retries: number;
}
export interface Loading {
	readonly type: "Loading";
	readonly sessionId: string;
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

export type SessionMutator = (session: DeepReadonly<Session.AsObject>) => DeepReadonly<Session.AsObject>;

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
 * This is the implementation of the public `use*Session` variants above.
 *
 * ## Mutations
 *
 * Regarding mutations, this implements a type of write-ahead log. All mutations are done via the returned `update`
 * function and have to provide a mutator. This mutator is used to "write ahead" on our current view of the session
 * object. We will synchronize with the server after all concurrent mutations have been applied.
 *
 * ### Assumptions
 *
 * This write-ahead approach means that we do not have to wait for the server to respond until the effects of mutations
 * are show to the user. However, it also means that we make additional assumptions:
 *
 * 1. We assume that the current user has exclusive write access to the session. (This is typically the case.)
 *
 *    If the assumption is not met, then the lack of synchronization while mutations are execution means that we might
 *    be mutating an outdated version of the session.
 *
 * 2. We assume that mutations of the server are applied in the same order as in our write-ahead log.
 *
 *    If the assumption is not met, then mutations will fail in the best case (we can detect and handle this) or
 *    succeed and produce different results on the server compared to our write-ahead log in the worst case.
 *
 *    The impact of not meeting this assumption very much depends on how long a mutation takes to execute on the server
 *    from the client's perspective (network latency + actual processing time) and how many mutation the client sends.
 *    If there are no *concurrent* mutations, then they can't be out of order.
 *
 * 3. We assume that the mutators have the same effect as the mutations done by the server.
 *
 *    This is a rather obvious assumption. The write-ahead log will only work if we write ahead the right thing.
 *
 *    This means in practice, that the server and the mutators have to have a common understanding of how operations
 *    are implemented.
 *
 * @param create
 * @returns
 */
function useSession(create: boolean): UseSessionArray<InternalState> {
	const [state, setState] = useState<InternalState>(getDefaultState());
	const [concurrentMutations, setConcurrentMutations] = useState(0);

	// update the session id on URL changes
	useEffect(
		() =>
			addLocationChangeListener(() => {
				const id = getURLSearchParams().get("id");
				setState(prev => {
					const sessionId = getSessionId(prev);

					if (id !== sessionId) {
						if (id) {
							return { type: "Loading", sessionId: id, retries: 0 };
						} else {
							return { type: "Creating", retries: 0 };
						}
					} else {
						return prev;
					}
				});
			}),
		[setState]
	);

	// set the current URL params based on the current session
	useEffect(() => {
		const sessionId = getSessionId(state);
		if (sessionId) {
			changeURLSearchParams("replace", { id: sessionId });
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
					req.setSessionId(state.sessionId);
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
					setState({ type: "Loading", retries: 0, sessionId: resp.getSessionId() });
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

	const reload = useCallback(
		() =>
			setState(prev => {
				switch (prev.type) {
					case "Creating":
						return prev;
					case "Loading":
						return { ...prev, retries: 0 };
					case "Ready":
						return { type: "Loading", retries: 0, sessionId: prev.session.id };
					default:
						assertNever(prev);
				}
			}),
		[setState]
	);

	// update the last ready state
	const [lastReady, setLastReady] = useState<Ready | undefined>();
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

	// The write-ahead log is implemented as a starting state and a list of mutations applied to the session.
	const [log, setLog] = useState<WriteAheadLog>();

	// reset the log after each refresh
	useEffect(() => {
		if (log && log.forState !== stableState) {
			setLog(undefined);
		}
	}, [log, setLog, stableState]);

	const update: UseSessionArray[1] = useCallback(
		(action, mutator) => {
			setConcurrentMutations(prev => prev + 1);

			const item = new MutatorItem(mutator);

			setLog(prev => {
				const log = prev ?? (stableState.type === "Ready" ? WriteAheadLog.empty(stableState) : undefined);
				return log?.withMutation(item);
			});

			action.then(
				() => {
					setConcurrentMutations(prev => prev - 1);
					reload();
				},
				() => {
					setConcurrentMutations(prev => prev - 1);
					// An error occurred, so we want to roll back the mutation in our write-ahead log.
					// This is done by simply removing the mutator.
					setLog(prev => prev?.withoutMutation(item.id));
					reload();
				}
			);
		},
		[stableState, setLog, setConcurrentMutations, reload]
	);

	console.log(state);

	return [log?.current ?? stableState, update];
}

function getDefaultState(): InternalState {
	const sessionId = getURLSearchParams().get("id");

	if (sessionId) {
		return { type: "Loading", sessionId, retries: 0 };
	} else {
		return { type: "Creating", retries: 0 };
	}
}

function getSessionId(state: State): string | null {
	switch (state.type) {
		case "Loading":
			return state.sessionId;
		case "Ready":
			return state.session.id;
		default:
			return null;
	}
}

function getRetryDelay(retries: number): number {
	if (retries < 3) {
		// the first 3 retires should be fast
		return 1_000;
	} else if (retries <= 10) {
		// then we slow down a little
		return 5_000;
	} else {
		// and then slow sown even further
		return 60_000;
	}
}

const NO_SESSION_PARAM: Loading = { type: "Loading", sessionId: "", retries: Infinity };

function toLoadState(state: InternalState): LoadState {
	if (state.type === "Creating") {
		return NO_SESSION_PARAM;
	} else {
		return state;
	}
}

function getStableState(state: InternalState, lastReady: Ready | undefined): InternalState {
	if (state.type === "Loading" && state.retries < 3 && lastReady && lastReady.session.id === state.sessionId) {
		return lastReady;
	}
	return state;
}

class WriteAheadLog {
	readonly forState: Ready;
	readonly mutations: readonly MutatorItem[];
	readonly current: Ready;

	private constructor(forState: Ready, mutations: readonly MutatorItem[], current: Ready) {
		this.forState = forState;
		this.mutations = mutations;
		this.current = current;
	}

	static empty(forState: Ready): WriteAheadLog {
		return new WriteAheadLog(forState, [], forState);
	}

	withMutation(mutator: MutatorItem): WriteAheadLog {
		return new WriteAheadLog(this.forState, [...this.mutations, mutator], {
			type: "Ready",
			session: mutator.mutator(this.current.session),
		});
	}

	withoutMutation(id: string): WriteAheadLog {
		const mutations = this.mutations.filter(m => m.id !== id);
		return new WriteAheadLog(this.forState, mutations, {
			type: "Ready",
			session: mutations.reduce((session, item) => {
				return item.mutator(session);
			}, this.forState.session),
		});
	}
}

class MutatorItem {
	readonly id: string;
	readonly mutator: SessionMutator;

	constructor(mutator: SessionMutator) {
		this.id = uuidV4();
		this.mutator = mutator;
	}
}
