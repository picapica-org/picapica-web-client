import React from "react";
import { Link } from "gatsby";
import { LocalizableProps, Locales, getLocalization } from "../lib/localization";
import { Icon } from "./icon";
import { Buttons } from "./buttons";

export function NewAnalysis(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<span className={"NewAnalysis " + Buttons.BUTTON_GROUP}>
			<Link to="/submit/" className={Buttons.BUTTON}>
				{l.newAnalysis}
			</Link>
			<Link to="/submit/#file" className={Buttons.BUTTON} title={l.file}>
				<Icon kind="file-line" />
			</Link>
			<Link to="/submit/#url" className={Buttons.BUTTON} title={l.url}>
				<Icon kind="link" />
			</Link>
			<Link to="/submit/#text" className={Buttons.BUTTON} title={l.text}>
				<Icon kind="align-left" />
			</Link>
		</span>
	);
}

const locales: Locales<Record<"newAnalysis" | "file" | "url" | "text", string>> = {
	en: {
		newAnalysis: "New analysis",
		file: "Upload file",
		url: "URL",
		text: "Plain text",
	},
	de: {
		newAnalysis: "Neue Analyse",
		file: "Datei hochladen",
		url: "URL",
		text: "Einfacher Text",
	},
};
