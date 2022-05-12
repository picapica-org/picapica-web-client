import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { SupportedLanguage } from "../lib/localization";
import { LocalizationContext } from "../lib/use-localization";
import { dynamic } from "../lib/react-util";
import PosterDe from "../../assets/images/poster-de.inline.svg";
import PosterEn from "../../assets/images/poster-en.inline.svg";
import "./poster.scss";

export default function PosterPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Poster />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

const POSTERS: Record<SupportedLanguage, () => JSX.Element> = {
	en: PosterEn,
	de: PosterDe,
};

function Poster(): JSX.Element {
	const { lang } = useContext(LocalizationContext);
	const Poster = POSTERS[lang];

	return (
		<Page className="Poster" header="big">
			<Poster />
		</Page>
	);
}
