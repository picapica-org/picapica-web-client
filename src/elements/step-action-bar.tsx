import React from "react";
import "./step-action-bar.scss";

export interface StepActionBarProps {
	left: React.ReactNode;
	right: React.ReactNode;
	instruction: string;
}

export function StepActionBar({ left, right, instruction }: StepActionBarProps): JSX.Element {
	return (
		<div className="StepActionBar">
			<div className="left">
				<div>{left}</div>
			</div>
			<div className="instruction">{instruction}</div>
			<div className="right">
				<div>{right}</div>
			</div>
		</div>
	);
}
