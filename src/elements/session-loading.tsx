import React from "react";
import { Link } from "gatsby";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { Loading } from "./session-manager";
import "./session-loading.scss";

export interface SessionLoadingProps extends LocalizableProps {
	readonly state: Loading;
}

export function SessionLoading(props: SessionLoadingProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<div className="SessionLoading">
			{props.state.retries === 0 ? (
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

const locales: Locales<SimpleString<"loadingSession" | "failedLoadingSession"> & { newSession: () => JSX.Element }> = {
	en: {
		loadingSession: "Loading session...",
		failedLoadingSession: "Failed to load session. Trying again...",
		newSession: () => (
			<>
				Do you want to <Link to="/submit/">start a new analysis</Link>?
			</>
		),
	},
	de: {
		loadingSession: "Sitzung wird geladed...",
		failedLoadingSession: "Sitzung konnte nicht geladen werden. Es wird erneut versucht...",
		newSession: () => (
			<>
				Möchten Sie <Link to="/submit/">eine neue Analyse beginnen</Link>?
			</>
		),
	},
};
