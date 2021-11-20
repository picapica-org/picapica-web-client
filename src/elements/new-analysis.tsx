import React from "react";
import { Link } from "gatsby";
import { getLocalization, Locales, LocalizableProps } from "../lib/localization";
import { PicaIcon } from "./icon";
import { Buttons } from "./buttons";

export function NewAnalysis(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<span className={"NewAnalysis " + Buttons.BUTTON_GROUP}>
			<Link to="/submit/" className={Buttons.BUTTON}>
				{l.newAnalysis}
			</Link>
			<Link to="/submit/#file" className={Buttons.BUTTON} title={l.file}>
				<PicaIcon kind="file" />
			</Link>
			<Link to="/submit/#url" className={Buttons.BUTTON} title={l.url}>
				<PicaIcon kind="url" />
			</Link>
			<Link to="/submit/#text" className={Buttons.BUTTON} title={l.text}>
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
