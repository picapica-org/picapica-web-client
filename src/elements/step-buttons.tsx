import React from "react";
import { Link } from "gatsby";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { Buttons } from "./buttons";
import { PicaIcon } from "./icon";
import "./step-buttons.scss";

export interface StepButtonProps extends LocalizableProps {
	to: string;
}

export function NextButton(props: StepButtonProps): JSX.Element {
	const l = getLocalization(props, locales);
	const title = l.next;

	return (
		<Link to={props.to} className={`NextButton ${Buttons.BUTTON}`} title={title}>
			<span className="text">{title}</span>
			<PicaIcon kind="next" />
		</Link>
	);
}

export function BackButton(props: StepButtonProps): JSX.Element {
	const l = getLocalization(props, locales);
	const title = l.back;

	return (
		<Link to={props.to} className={`BackButton ${Buttons.BUTTON}`} title={title}>
			<PicaIcon kind="back" />
			<span className="text">{title}</span>
		</Link>
	);
}

export function StartButton(props: StepButtonProps): JSX.Element {
	const l = getLocalization(props, locales);
	const title = l.start;

	return (
		<Link to={props.to} className={`StartButton ${Buttons.BUTTON} ${Buttons.GREEN}`} title={title}>
			<span className="text">{title}</span>
			<PicaIcon kind="next" />
		</Link>
	);
}

const locales: Locales<SimpleString<"next" | "back" | "start">> = {
	en: {
		next: "Next",
		back: "Back",
		start: "Start",
	},
	de: {
		next: "Weiter",
		back: "Zurück",
		start: "Start",
	},
};
