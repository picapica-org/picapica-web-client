import { Link } from "gatsby";
import React from "react";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { Buttons } from "./buttons";
import { Group } from "./group";
import { Icon, IconKind } from "./icon";
import "./step-selector.scss";

export type StepKind = "submit" | "analysis" | "checkout" | "results";

const STEPS = ["submit", "analysis", "checkout", "results"] as const;

export interface StepSelectorProps extends LocalizableProps {
	readonly sessionId: string;
	readonly current: StepKind;
}

const ICONS: Readonly<Record<StepKind, IconKind>> = {
	submit: "upload-cloud-2-line",
	analysis: "search-line",
	checkout: "shopping-cart-2-line",
	results: "list-check",
};

const ENABLE_CHECKOUT = false;

export function StepSelector(props: StepSelectorProps): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<span className={`StepSelector ${Buttons.BUTTON_GROUP}`}>
			{STEPS.filter(step => ENABLE_CHECKOUT || step !== "checkout").map(step => {
				const title = l[step];

				return (
					<Link
						key={step}
						to={`/${step}/?id=${props.sessionId}`}
						className={`${Buttons.BUTTON}${step === props.current ? " " + Buttons.ACTIVE : ""}`}
						title={title}>
						<Icon kind={ICONS[step]} />
						{title}
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
