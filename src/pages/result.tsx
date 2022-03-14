import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { OverviewContainer } from "../elements/results-overview";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { toResults } from "../lib/page-links";
import { dynamic } from "../lib/react-util";
import { getLocationSearchParams } from "../lib/url-params";
import { Ready, useLoadSession } from "../lib/use-session";
import "./result.scss";

export default function ResultPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Result lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Result(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state] = useLoadSession();

	const onReady = ({ session }: Ready): JSX.Element => {
		const pageUrn = getLocationSearchParams().get("urn");
		const result = session.resultsList.find(r => r.urn === pageUrn);

		return (
			<OverviewContainer
				{...props}
				title="Text alignment"
				backTo={toResults({
					urn: session.urn,
					view: getLocationSearchParams().get("view") ?? undefined,
				})}>
				<div>foo</div>
			</OverviewContainer>
		);
	};

	return (
		<Page {...props} className="Result" header="small">
			<SessionState {...props} state={state} onReady={onReady} />
		</Page>
	);
}

const locales: Locales<SimpleString<"invalidUrn">> = {
	en: {
		// TODO: Better error message
		invalidUrn: "Invalid link. The result you are trying to access is not available.",
	},
	de: {
		invalidUrn: "Falscher Link. Das Ergebnis ist nicht verfügbar.",
	},
};
