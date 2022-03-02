import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { dynamic } from "../lib/react-util";
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
		return (
			<>
				<p>TODO</p>
			</>
		);
	};

	return (
		<Page {...props} className="Result" header="small">
			<SessionState {...props} state={state} onReady={onReady} />
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
