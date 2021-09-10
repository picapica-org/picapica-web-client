import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, LocalizableProps, SupportedLanguage } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import PosterDe from "../../assets/images/poster-de.inline.svg";
import PosterEn from "../../assets/images/poster-en.inline.svg";
import "./poster.scss";

export default function PosterPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Poster lang={getCurrentLang()} />
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

function Poster(props: LocalizableProps): JSX.Element {
	const Poster = POSTERS[props.lang];

	return (
		<Page {...props} className="Poster" header="big">
			<Poster />
		</Page>
	);
}
