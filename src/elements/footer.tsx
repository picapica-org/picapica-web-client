import { Link } from "gatsby";
import React, { useContext } from "react";
import { LocalizationContext } from "../context/localization";
import { Locales, SupportedLanguage } from "../lib/localization";
import { toHelp, toLegal, toPoster } from "../lib/page-links";
import { useLocalization } from "../lib/use-localization";
import "./footer.scss";

export function Footer(): JSX.Element {
	const l = useLocalization(locales);

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
					<LangSelect thisLang="de">Deutsch</LangSelect>
					<Bullet />
					<LangSelect thisLang="en">English</LangSelect>
				</div>
			</div>

			<div style={{ clear: "both" }}></div>
		</div>
	);
}

function LangSelect({ thisLang, children }: React.PropsWithChildren<{ thisLang: SupportedLanguage }>): JSX.Element {
	const { lang, setLang } = useContext(LocalizationContext);

	const className = lang === thisLang ? "current-lang" : "";
	const clickHandler = (): void => {
		setLang(thisLang);
	};

	return (
		<button className={className} onClick={clickHandler}>
			{children}
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
