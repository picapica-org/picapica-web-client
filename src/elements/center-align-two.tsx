import React from "react";
import "./center-align-two.scss";

export interface CenterAlignTwoProps {
	readonly className?: string;
	readonly grow: "left" | "right";
	readonly left: React.ReactNode;
	readonly right: React.ReactNode;
}

export function CenterAlignTwo(props: CenterAlignTwoProps): JSX.Element {
	return (
		<div className={"CenterAlignTwo" + (props.className ? " " + props.className : "")}>
			<div className={`left${props.grow === "left" ? " grow" : ""}`}>{props.left}</div>
			<div className={`right${props.grow === "right" ? " grow" : ""}`}>{props.right}</div>
		</div>
	);
}
