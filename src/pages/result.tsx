import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import "./results.scss";

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

	return (
		<Page {...props} className="Result" header="small">
			TODO
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
