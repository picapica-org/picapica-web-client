import React from "react";
import { LocalizableProps, Locales, getLocalization } from "../lib/localization";
import { Icon } from "./icon";
import "./new-analysis.scss";

export function NewAnalysis(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<span className="NewAnalysis">
			<a href="#new">{l.newAnalysis}</a>
			<a href="#new" title={l.file}>
				<Icon kind="file" />
			</a>
			<a href="#new" title={l.url}>
				<Icon kind="link" />
			</a>
			<a href="#new" title={l.text}>
				<Icon kind="align-left" />
			</a>
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
