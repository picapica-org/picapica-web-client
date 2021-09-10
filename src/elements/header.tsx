import React from "react";
import { getLocalization, Locales, LocalizableProps } from "../lib/localization";
import { Link } from "gatsby";
import "./header.scss";
import logoDark from "../../assets/images/picapica3-logo2-rgb-dark.min.svg";
import logoWhite from "../../assets/images/picapica3-logo2-rgb-white.min.svg";

export type Props = LocalizableProps;

export function SmallHeader(props: Props): JSX.Element {
	return (
		<div className="SmallHeader">
			<Link to="/">
				<img src={logoDark} alt="Picapica Logo" />
			</Link>
		</div>
	);
}

export function BigHeader(props: Props): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<div className="BigHeader">
			<div className="logo-row">
				<Link to="/">
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
