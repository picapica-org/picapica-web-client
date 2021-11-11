import React, { useEffect, useState, useCallback } from "react";
import { getSessionClient } from "../lib/client";
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

interface Creating {
	readonly type: "Creating";
	readonly retries: number;
}
interface Loading {
	readonly type: "Loading";
	readonly sessionId: string;
	readonly retries: number;
}
interface NoSessionParam {
	readonly type: "NoSessionParam";
}
interface Ready {
	readonly type: "Ready";
	readonly session: DeepReadonly<Session.AsObject>;
}

export type State = Ready | Loading | Creating | NoSessionParam;
export type CreateState = Ready | Loading | Creating;
export type LoadState = Ready | Loading | NoSessionParam;
type InternalState = Ready | Loading | Creating;

export type SessionStateVisitor<S extends State> = {
	[K in S["type"]]: S extends { readonly type: K } ? (state: S) => React.ReactNode : never;
};

export interface ManagedState<S extends State> {
	readonly state: S;
	readonly visit: (visitor: SessionStateVisitor<S>) => React.ReactNode;
	readonly reload: () => void;
	readonly change: (sessionId: string) => void;
}

export type CreateHandler = (s: ManagedState<CreateState>) => React.ReactNode;
export type LoadHandler = (s: ManagedState<LoadState>) => React.ReactNode;

export type SessionManagerProps =
	| { readonly create: true; readonly handler: CreateHandler }
	| { readonly create: false; readonly handler: LoadHandler };

export function SessionManager(props: SessionManagerProps): JSX.Element {
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
					if (!props.create) {
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
		[state, setState, props.create]
	);

	// memoize a few functions
	const reload: ManagedState<State>["reload"] = useCallback(
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
	const change: ManagedState<State>["change"] = useCallback(
		id => setState({ type: "Loading", retries: 0, sessionId: id }),
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

	let result;
	if (props.create) {
		result = props.handler({
			state: stableState,
			reload,
			change,
			visit: visitor => visit(stableState, visitor),
		});
	} else {
		const s = toLoadState(stableState);

		result = props.handler({
			state: s,
			reload,
			change,
			visit: visitor => visit(s, visitor),
		});
	}
	return <>{result}</>;
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

const NO_SESSION_PARAM: NoSessionParam = { type: "NoSessionParam" };

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

function visit<S extends State>(state: S, visitor: SessionStateVisitor<S>): React.ReactNode {
	const fn = visitor[state.type as never] as (state: S) => React.ReactNode;
	return fn(state);
}
