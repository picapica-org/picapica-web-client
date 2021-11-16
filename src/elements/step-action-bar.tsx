import React from "react";
import "./step-action-bar.scss";

export interface StepActionBarProps {
	left: React.ReactNode;
	right: React.ReactNode;
	instruction: string;
}

export function StepActionBar(props: StepActionBarProps): JSX.Element {
	return (
		<div className="StepActionBar">
			<span className="left">{props.left}</span>
			<span className="instruction">{props.instruction}</span>
			<span className="right">{props.right}</span>
		</div>
	);
}
