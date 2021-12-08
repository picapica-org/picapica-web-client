import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { StepActionBar } from "../elements/step-action-bar";
import { BackButton } from "../elements/step-buttons";
import { SessionState } from "../elements/session-creating-loading";
import { getSessionUrn, Ready, useLoadSession } from "../lib/use-session";
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

	const onReady = ({ session }: Ready): JSX.Element => (
		<>
			<StepActionBar
				left={<BackButton {...props} to={getLinkToStep("analysis", session.urn)} />}
				right={<span className="next-spacer" />}
				instruction={l.instruction}
			/>

			<StepActionBar
				left={<BackButton {...props} to={getLinkToStep("analysis", session.urn)} />}
				right={<span className="next-spacer" />}
				instruction={""}
			/>
		</>
	);

	return (
		<Page {...props} className="Results" header="small">
			<StepSelectorGroup {...props} sessionUrn={getSessionUrn(state)} current="results">
				<SessionState {...props} state={state} onReady={onReady} />
			</StepSelectorGroup>
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
