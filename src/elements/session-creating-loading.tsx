import { Link } from "gatsby";
import React from "react";
import { Locales, SimpleString } from "../lib/localization";
import { toSubmit } from "../lib/page-links";
import { useLocalization } from "../lib/use-localization";
import { Creating, Loading, Ready, State, visitState } from "../lib/use-session";
import "./session-creating-loading.scss";

export interface SessionCreatingProps {
	readonly state: Creating;
}

export function SessionCreating(props: SessionCreatingProps): JSX.Element {
	const l = useLocalization(locales);

	return (
		<div className="SessionCreating">
			{props.state.retries < 3 ? (
				<div className="first">
					<p>{l.creatingSession}</p>
				</div>
			) : (
				<div className="failed">
					<p>{l.failedCreatingSession}</p>
				</div>
			)}
		</div>
	);
}

export interface SessionLoadingProps {
	readonly state: Loading;
}

export function SessionLoading(props: SessionLoadingProps): JSX.Element {
	const l = useLocalization(locales);

	return (
		<div className="SessionLoading">
			{props.state.retries < 3 ? (
				<div className="first">
					<p>{l.loadingSession}</p>
				</div>
			) : (
				<div className="failed">
					<p>{l.failedLoadingSession}</p>
					<p>{l.newSession()}</p>
				</div>
			)}
		</div>
	);
}

export interface SessionStateProps {
	readonly state: State;
	readonly onReady: (state: Ready) => JSX.Element;
}

export function SessionState(props: SessionStateProps): JSX.Element {
	return visitState(props.state, {
		Creating(state) {
			return <SessionCreating state={state} />;
		},
		Loading(state) {
			return <SessionLoading state={state} />;
		},
		Ready(state) {
			return props.onReady(state);
		},
	});
}

const locales: Locales<
	SimpleString<"creatingSession" | "failedCreatingSession" | "loadingSession" | "failedLoadingSession"> & {
		newSession: () => JSX.Element;
	}
> = {
	en: {
		creatingSession: "Creating session...",
		failedCreatingSession: "Failed to create session. Trying again...",

		loadingSession: "Loading session...",
		failedLoadingSession: "Failed to load session. Trying again...",
		newSession: () => (
			<>
				Do you want to <Link to={toSubmit()}>start a new analysis</Link>?
			</>
		),
	},
	de: {
		creatingSession: "Sitzung wird erstellt...",
		failedCreatingSession: "Sitzung konnte nicht erstellt werden. Es wird erneut versucht...",

		loadingSession: "Sitzung wird geladen...",
		failedLoadingSession: "Sitzung konnte nicht geladen werden. Es wird erneut versucht...",
		newSession: () => (
			<>
				Möchten Sie <Link to={toSubmit()}>eine neue Analyse beginnen</Link>?
			</>
		),
	},
};
