import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, LocalizableProps, Locales, SimpleString, getLocalization } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { StepActionBar } from "../elements/step-action-bar";
import { BackButton } from "../elements/step-buttons";
import { SessionLoading } from "../elements/session-creating-loading";
import { LoadState, useLoadSession, visitState } from "../lib/use-session";
import "./results.scss";

export default function ResultsPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Results lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Results(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state] = useLoadSession();

	const content = visitState<LoadState, JSX.Element>(state, {
		Loading(state) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={state.sessionId} current="results">
					<SessionLoading {...props} state={state} />
				</StepSelectorGroup>
			);
		},
		Ready({ session }) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={session.id} current="results">
					<StepActionBar
						left={<BackButton {...props} to={getLinkToStep("analysis", session.id)} />}
						right={<span className="next-spacer" />}
						instruction={l.instruction}
					/>

					{"TODO"}

					<StepActionBar
						left={<BackButton {...props} to={getLinkToStep("analysis", session.id)} />}
						right={<span className="next-spacer" />}
						instruction={""}
					/>
				</StepSelectorGroup>
			);
		},
	});

	return (
		<Page {...props} className="Results" header="small">
			{content}
		</Page>
	);
}

const locales: Locales<SimpleString<"instruction">> = {
	en: {
		instruction: "TODO",
	},
	de: {
		instruction: "TODO",
	},
};
