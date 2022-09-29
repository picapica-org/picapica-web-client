import React, { useContext } from "react";
import PosterDe from "../../assets/images/poster-de.inline.svg";
import PosterEn from "../../assets/images/poster-en.inline.svg";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { SupportedLanguage } from "../lib/localization";
import { dynamicComponent } from "../lib/react-util";
import { LocalizationContext } from "../lib/use-localization";
import "./poster.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica</title>
		<SharedHead />
	</>
);

export default dynamicComponent(Poster);

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
