import { Link } from "gatsby";
import React from "react";
import { Locales, SimpleString } from "../lib/localization";
import { useLocalization } from "../lib/use-localization";
import { Buttons } from "./buttons";
import { PicaIcon } from "./icon";
import "./step-buttons.scss";

export interface StepButtonProps {
	to: string;
}

export function NextButton({ to }: StepButtonProps): JSX.Element {
	const l = useLocalization(locales);
	const title = l.next;

	return (
		<Link to={to} className={`NextButton ${Buttons.BUTTON}`} title={title}>
			<span className="text">{title}</span>
			<PicaIcon kind="next" />
		</Link>
	);
}

export function BackButton({ to }: StepButtonProps): JSX.Element {
	const l = useLocalization(locales);
	const title = l.back;

	return (
		<Link to={to} className={`BackButton ${Buttons.BUTTON}`} title={title}>
			<PicaIcon kind="back" />
			<span className="text">{title}</span>
		</Link>
	);
}

export function StartButton({ to }: StepButtonProps): JSX.Element {
	const l = useLocalization(locales);
	const title = l.start;

	return (
		<Link to={to} className={`StartButton ${Buttons.BUTTON} ${Buttons.GREEN}`} title={title}>
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
