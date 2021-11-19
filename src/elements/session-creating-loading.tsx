import React from "react";
import { Link } from "gatsby";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { Creating, Loading } from "../lib/use-session";
import "./session-creating-loading.scss";

export interface SessionCreatingProps extends LocalizableProps {
	readonly state: Creating;
}

export function SessionCreating(props: SessionCreatingProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<div className="SessionCreating">
			{props.state.retries < 3 ? (
				<div className="first">
					<p>{l.loadingSession}</p>
				</div>
			) : (
				<div className="failed">
					<p>{l.failedLoadingSession}</p>
				</div>
			)}
		</div>
	);
}

export interface SessionLoadingProps extends LocalizableProps {
	readonly state: Loading;
}

export function SessionLoading(props: SessionLoadingProps): JSX.Element {
	const l = getLocalization(props, locales);

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
				Do you want to <Link to="/submit/">start a new analysis</Link>?
			</>
		),
	},
	de: {
		creatingSession: "Sitzung wird erstellt...",
		failedCreatingSession: "Sitzung konnte nicht erstellt werden. Es wird erneut versucht...",

		loadingSession: "Sitzung wird geladed...",
		failedLoadingSession: "Sitzung konnte nicht geladen werden. Es wird erneut versucht...",
		newSession: () => (
			<>
				Möchten Sie <Link to="/submit/">eine neue Analyse beginnen</Link>?
			</>
		),
	},
};
