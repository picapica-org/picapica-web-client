import { Link } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Icon } from "../elements/icon";
import { NewAnalysis } from "../elements/new-analysis";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, Locales, LocalizableProps, getLocalization } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import "./index.scss";

export default function HomePage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Home lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
				{/* TODO: */}
				{/* <meta
					name="keywords"
					content=""
				/>
				<meta
					name="description"
					content=""0
				/> */}
			</Helmet>
		</>
	);
}

function Home(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<Page {...props} className="Home" header="big">
			<div className="new-analysis-container">
				<NewAnalysis {...props} />
			</div>

			<div className="features">
				<div className="feature">
					<h4>{l.featureWikipediaTitle()}</h4>
					<p>{l.featureWikipedia()}</p>
				</div>
				<div className="feature">
					<h4>{l.featureLanguagesTitle()}</h4>
					<p>{l.featureLanguages()}</p>
				</div>
				<div className="feature">
					<h4>{l.featureAlgorithmsTitle()}</h4>
					<p>{l.featureAlgorithms()}</p>
				</div>
				<div className="feature">
					<h4>{l.featureBetaTitle()}</h4>
					<p>{l.featureBeta()}</p>
				</div>
			</div>
		</Page>
	);
}

const locales: Locales<
	Record<
		| "featureWikipediaTitle"
		| "featureWikipedia"
		| "featureLanguagesTitle"
		| "featureLanguages"
		| "featureAlgorithmsTitle"
		| "featureAlgorithms"
		| "featureBetaTitle"
		| "featureBeta",
		() => JSX.Element
	>
> = {
	en: {
		featureWikipediaTitle: () => <>Search Wikipedia</>,
		featureWikipedia: () => (
			<>
				Picapica lets you compare a text to the entire Wikipedia. In seconds, it searches for passages of reused
				text, extracts them, and displays them in a convenient form.
			</>
		),
		featureLanguagesTitle: () => <>Languages</>,
		featureLanguages: () => (
			<>
				Picapica currently supports analyses in 10 languages: English, German, Spanish, French, Italian, Dutch,
				Swedish, Portuguese, Catalan, and Basque.
			</>
		),
		featureAlgorithmsTitle: () => <>How it works</>,
		featureAlgorithms: () => (
			<>
				There's no magic in Picapica, but a number of state-of-the-art algorithms. Don't hesitate to{" "}
				<Link to="/poster/">take a look</Link> under the hood.
			</>
		),
		featureBetaTitle: () => <>Beta</>,
		featureBeta: () => (
			<>
				Picapica is in public beta, and still subject to R&amp;D. It's not perfect, but we're working hard to
				improve. Let us know of any errors you observe!
			</>
		),
	},
	de: {
		featureWikipediaTitle: () => <>Wikipedia durchsuchen</>,
		featureWikipedia: () => (
			<>
				Picapica ermöglicht den Vergleich von Texten mit der gesamten Wikipedia. In Sekunden werden
				wiederverwendete Textpassagen gesucht, extrahiert, undanschaulich dargestellt.
			</>
		),
		featureLanguagesTitle: () => <>Sprachen</>,
		featureLanguages: () => (
			<>
				Picapica unterstützt gegenwärtig Analysen in 10 Sprachen: Deutsch, Englisch, Spanisch, Französisch,
				Italienisch, Niederländisch, Schwedisch, Portugiesisch, Katalnisch, and Baskisch.
			</>
		),
		featureAlgorithmsTitle: () => <>Wie funktionierts?</>,
		featureAlgorithms: () => (
			<>
				Es steckt keine Magie hinter Picapica, aber dafür eine Reihe moderner Algorithmen. Scheuen Sie sich
				nicht, mal einen Blick <Link to="/poster/">unter die Haube</Link> zu werfen.
			</>
		),
		featureBetaTitle: () => <>Beta</>,
		featureBeta: () => (
			<>
				Picapica ist in der Beta-Phase; wir forschen weiter daran. Der Dienst ist noch nicht perfekt, aber wir
				arbeiten stetig an Verbesserungen. Geben Sie uns Bescheid, falls Ihnen Fehler auffallen.
			</>
		),
	},
};
