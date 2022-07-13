import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { Locales } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { useLocalization } from "../lib/use-localization";
import "./404.scss";

export default function Error404Page(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Error404 />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica - 404</title>
			</Helmet>
		</>
	);
}

function Error404(): JSX.Element {
	const l = useLocalization(locales);

	return (
		<Page className="Error404" header="small">
			<h2 id="publisher">{l.title}</h2>
			{l.content()}
		</Page>
	);
}

const locales: Locales<{
	title: string;
	content: () => JSX.Element;
}> = {
	en: {
		title: "404 - Page not found",
		content: () => (
			<p>The page you requested could not be found. Please check that there are no typos in the URL.</p>
		),
	},
	de: {
		title: "404 - Seite nicht gefunden",
		content: () => (
			<p>
				Die von Ihnen angefragte Seite konnte nicht gefunden werden. Bitte überprüfen Sie, dass der URL richtig
				eingegeben wurde.
			</p>
		),
	},
};
