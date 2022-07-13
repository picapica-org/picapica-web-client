import { Link } from "gatsby";
import React from "react";
import { Locales } from "../lib/localization";
import { toSubmit } from "../lib/page-links";
import { useLocalization } from "../lib/use-localization";
import { Buttons } from "./buttons";
import { PicaIcon } from "./icon";

export function NewAnalysis(): JSX.Element {
	const l = useLocalization(locales);

	return (
		<span className={"NewAnalysis " + Buttons.BUTTON_GROUP}>
			<Link to={toSubmit()} className={Buttons.BUTTON}>
				{l.newAnalysis}
			</Link>
			<Link to={toSubmit() + "#file"} className={Buttons.BUTTON} title={l.file}>
				<PicaIcon kind="file" />
			</Link>
			<Link to={toSubmit() + "#url"} className={Buttons.BUTTON} title={l.url}>
				<PicaIcon kind="url" />
			</Link>
			<Link to={toSubmit() + "#text"} className={Buttons.BUTTON} title={l.text}>
				<PicaIcon kind="text" />
			</Link>
		</span>
	);
}

const locales: Locales<Record<"newAnalysis" | "file" | "url" | "text", string>> = {
	en: {
		newAnalysis: "New analysis",
		file: "Upload files",
		url: "URL",
		text: "Plain text",
	},
	de: {
		newAnalysis: "Neue Analyse",
		file: "Dateien hochladen",
		url: "URL",
		text: "Einfacher Text",
	},
};
