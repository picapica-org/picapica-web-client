import { Link } from "gatsby";
import React from "react";
import { getLocalization, Locales, LocalizableProps, setCurrentLang, SupportedLanguage } from "../lib/localization";
import { toHelp, toLegal, toPoster } from "../lib/page-links";
import "./footer.scss";

export function Footer(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<div className="Footer">
			<div>
				<div id="webis-copyright">
					{`\xA9 ${new Date().getFullYear()} `}
					<a href="https://webis.de" target="_blank" rel="noopener noreferrer">
						Webis Group
					</a>
					<Bullet />
					<a href="https://webis.de/people.html" target="_blank" rel="noopener noreferrer" id="contact">
						{l.contact}
					</a>
					<Bullet />
					<a
						href="https://github.com/picapica-org"
						target="_blank"
						rel="noopener noreferrer"
						className="img"
						id="github"
						title="GitHub">
						<span></span>
					</a>
					{/*<a
						href="https://twitter.com/_netspeak_"
						target="_blank"
						rel="noopener noreferrer"
						className="img"
						id="twitter"
						title="Twitter">
						<span></span>
					</a>
					<a
						href="https://www.youtube.com/playlist?list=PLgD1TOdHQCI97rA9s4z1EGxRJSXCHzwBk"
						target="_blank"
						rel="noopener noreferrer"
						className="img"
						id="youtube"
						title="YouTube">
						<span></span>
					</a>*/}
					<Bullet />
					<Link to={toLegal} id="impressum-and-privacy">
						{l.impressumAndPrivacy}
					</Link>
				</div>
				<div id="netspeak-points">
					<Link to={toHelp}>{l.help}</Link>
					<Bullet />
					<Link to={toPoster}>{l.poster}</Link>
				</div>
				<div id="language-section">
					<span className="pipe">|</span>
					<LangSelect lang={props.lang} thisLang="de">
						Deutsch
					</LangSelect>
					<Bullet />
					<LangSelect lang={props.lang} thisLang="en">
						English
					</LangSelect>
				</div>
			</div>

			<div style={{ clear: "both" }}></div>
		</div>
	);
}

function LangSelect(props: { lang: string; thisLang: SupportedLanguage; children: React.ReactNode }): JSX.Element {
	const { lang, thisLang } = props;

	const className = lang === thisLang ? "current-lang" : "";
	const clickHandler = (): void => {
		setCurrentLang(thisLang);
		window.location.reload();
	};

	return (
		<button className={className} onClick={clickHandler}>
			{props.children}
		</button>
	);
}

function Bullet(): JSX.Element {
	return <span className="bullet">{"\u2022"}</span>;
}

const locales: Locales<Record<"help" | "contact" | "poster" | "impressumAndPrivacy", string>> = {
	en: {
		help: "Help",
		poster: "Poster",

		contact: "Contact",
		impressumAndPrivacy: "Impressum\u00A0/\u00A0Terms\u00A0/\u00A0Privacy",
	},
	de: {
		help: "Hilfe",
		poster: "Poster",

		contact: "Kontakt",
		impressumAndPrivacy: "Impressum\u00A0/\u00A0AGB\u00A0/\u00A0Datenschutz",
	},
};
