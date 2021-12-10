import { Link } from "gatsby";
import React from "react";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { Buttons } from "./buttons";
import { Group } from "./group";
import { PicaIcon, PicaIconKind } from "./icon";
import "./step-selector.scss";

export type StepKind = "submit" | "analysis" | "checkout" | "results";

export function getLinkToStep(step: StepKind, sessionUrn: string): string {
	return `/${step}/?urn=${encodeURIComponent(sessionUrn)}`;
}

const STEPS = ["submit", "analysis", "checkout", "results"] as const;

export interface StepSelectorProps extends LocalizableProps {
	readonly sessionUrn: string;
	readonly current: StepKind;
	readonly disableOthers?: boolean;
}

const ICONS: Readonly<Record<StepKind, PicaIconKind>> = {
	submit: "upload",
	analysis: "analyse",
	checkout: "checkout",
	results: "results",
};

const ENABLE_CHECKOUT = false;

export function StepSelector(props: StepSelectorProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<span className={`StepSelector ${Buttons.BUTTON_GROUP}`}>
			{STEPS.filter(step => ENABLE_CHECKOUT || step !== "checkout").map(step => {
				const title = l[step];

				const disabled = props.disableOthers && step !== props.current;
				if (disabled) {
					return (
						<span key={step} className={`${Buttons.BUTTON} ${Buttons.DISABLED}`} title={title}>
							<PicaIcon kind={ICONS[step]} />
							<span className="text">{title}</span>
						</span>
					);
				}

				return (
					<Link
						key={step}
						to={getLinkToStep(step, props.sessionUrn)}
						className={`${Buttons.BUTTON}${step === props.current ? " " + Buttons.ACTIVE : ""}`}
						title={title}>
						<PicaIcon kind={ICONS[step]} />
						<span className="text">{title}</span>
					</Link>
				);
			})}
		</span>
	);
}

export function StepSelectorGroup(props: React.PropsWithChildren<StepSelectorProps>): JSX.Element {
	return (
		<div className="StepSelectorGroup">
			<Group
				heading={
					<div className="heading-wrapper">
						<StepSelector {...props} />
					</div>
				}>
				{props.children}
			</Group>
		</div>
	);
}

const locales: Locales<SimpleString<StepKind>> = {
	en: {
		submit: "Upload",
		analysis: "Analysis",
		checkout: "Checkout",
		results: "Results",
	},
	de: {
		submit: "Hochladen",
		analysis: "Analyse",
		checkout: "Kasse",
		results: "Ergebnisse",
	},
};
