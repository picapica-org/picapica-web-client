import React from "react";
import { Locales } from "../lib/localization";
import { useLocalization } from "../lib/use-localization";
import { Link } from "gatsby";
import { NewAnalysis } from "./new-analysis";
import logoDark from "../../assets/images/picapica3-logo2-rgb-dark.min.svg";
import logoWhite from "../../assets/images/picapica3-logo2-rgb-white.min.svg";
import { toIndex } from "../lib/page-links";
import "./header.scss";

export function SmallHeader(): JSX.Element {
	return (
		<div className="SmallHeader">
			<Link to={toIndex}>
				<img src={logoDark} alt="Picapica Logo" />
			</Link>

			<NewAnalysis />
		</div>
	);
}

export function BigHeader(): JSX.Element {
	const l = useLocalization(locales);

	return (
		<div className="BigHeader">
			<div className="logo-row">
				<Link to={toIndex}>
					<img src={logoWhite} alt="Picapica Logo" />
				</Link>
			</div>
			<div className="slogan-row">
				<span>{l.slogan}</span>
			</div>
		</div>
	);
}

const locales: Locales<Record<"slogan", string>> = {
	en: {
		slogan: "Picapica offers tools to analyze text reuse",
	},
	de: {
		slogan: "Picapica bietet Werkzeuge zum Textvergleich",
	},
};
