import { useEffect, useState, useCallback } from "react";
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

interface TempState {
	readonly forState: State;
	readonly temp: Ready;
}

export type UseSessionArray<S extends State = State> = [
	state: S,
	/**
	 * Reloads the current session.
	 *
	 * This will request the current session information from the server and re-render the page afterwards.
	 */
	reload: () => void,
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
	update: (action: Promise<void>, updatedSession?: Session.AsObject | undefined) => void
];

export function useCreateSession(): UseSessionArray<CreateState> {
	return useSession(true);
}

export function useLoadSession(): UseSessionArray<LoadState> {
	const [state, reload, update] = useSession(false);
	return [toLoadState(state), reload, update];
}

function useSession(create: boolean): UseSessionArray<InternalState> {
	const [state, setState] = useState<InternalState>(getDefaultState());
	console.log(state);

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
		[state, setState, create]
	);

	// memoize a few functions
	const reload: UseSessionArray[1] = useCallback(
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

	// Temporary state is a trick to apply updates to a session immediately without waiting for a reload.
	//
	// Basically, we want to be able to say: "Here is a Promise of some update action I did and a session object that
	// you will get from the server after my action succeeds. Display display this session object until you reload
	// again."
	//
	// Conceptually, temporary state is dependent on stable state. Once the stable state changes, the temporary state
	// is no longer valid.
	const [tempState, setTempState] = useState<TempState>();
	useEffect(() => {
		if (tempState && tempState.forState !== stableState) {
			setTempState(undefined);
		}
	}, [tempState, setTempState, stableState]);

	const [concurrentUpdates, setConcurrentUpdates] = useState(0);

	const update: UseSessionArray[2] = useCallback(
		(action, updatedSession) => {
			setConcurrentUpdates(prev => prev + 1);

			// Setting a temporary session state only makes sense when 1) we are not currently doing an update and
			// 2) we are not currently reloading the session.
			if (updatedSession && state.type === "Ready" && concurrentUpdates === 0) {
				setTempState({ forState: state, temp: { type: "Ready", session: updatedSession } });
				action.then(
					() => {
						setConcurrentUpdates(prev => prev - 1);
						reload();
					},
					() => {
						setConcurrentUpdates(prev => prev - 1);
						setTempState(undefined);
						reload();
					}
				);
			} else {
				action.then(
					() => {
						setConcurrentUpdates(prev => prev - 1);
						reload();
					},
					() => {
						setConcurrentUpdates(prev => prev - 1);
						reload();
					}
				);
			}
		},
		[state, setTempState, concurrentUpdates, setConcurrentUpdates, reload]
	);

	const displayState = tempState?.forState === stableState ? tempState.temp : stableState;

	return [displayState, reload, update];
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
	if (retries === 0) {
		return 0;
	} else if (retries <= 3) {
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