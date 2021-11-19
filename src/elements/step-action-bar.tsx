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
			<div className="left">
				<div>{props.left}</div>
			</div>
			<div className="instruction">{props.instruction}</div>
			<div className="right">
				<div>{props.right}</div>
			</div>
		</div>
	);
}
