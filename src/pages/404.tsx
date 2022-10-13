import React from "react";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { Locales } from "../lib/localization";
import { dynamicComponent } from "../lib/react-util";
import { useLocalization } from "../lib/use-localization";
import "./404.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica - 404</title>
		<meta name="robots" content="noindex"></meta>
		<SharedHead />
	</>
);

export default dynamicComponent(Error404);

function Error404(): JSX.Element {
	const l = useLocalization(locales);

	return (
		<Page className="Error404" title="Picapica - 404" header="small">
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
