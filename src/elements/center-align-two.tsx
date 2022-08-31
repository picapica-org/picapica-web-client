import React from "react";
import "./center-align-two.scss";

export interface CenterAlignTwoProps {
	readonly className?: string;
	readonly grow: "left" | "right";
	readonly left: React.ReactNode;
	readonly right: React.ReactNode;
}

export function CenterAlignTwo({ className, grow, left, right }: CenterAlignTwoProps): JSX.Element {
	return (
		<div className={"CenterAlignTwo" + (className ? " " + className : "")}>
			<div className={`left${grow === "left" ? " grow" : ""}`}>{left}</div>
			<div className={`right${grow === "right" ? " grow" : ""}`}>{right}</div>
		</div>
	);
}
