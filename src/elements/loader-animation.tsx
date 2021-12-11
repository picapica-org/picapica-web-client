import React from "react";
import { Icon } from "./icon";
import "./loader-animation.scss";

export interface LoaderAnimationProps {
	readonly id?: string;
}

export function LoaderAnimation(props: LoaderAnimationProps): JSX.Element {
	return (
		<span className="LoaderAnimation" id={props.id}>
			{" "}
			<Icon kind="loader-5-line" />
			<Icon kind="loader-5-line" />
		</span>
	);
}
