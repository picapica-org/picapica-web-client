import React from "react";
import "./headings.scss";

export interface HeadingProps {
	id: string;
	className?: string;
	children: React.ReactNode;
}

export function H2(props: HeadingProps): JSX.Element {
	return (
		<a href={"#" + props.id} className="heading-link h2">
			<h2 {...props}>{props.children}</h2>
		</a>
	);
}

export function H3(props: HeadingProps): JSX.Element {
	return (
		<a href={"#" + props.id} className="heading-link h3">
			<h3 {...props}>{props.children}</h3>
		</a>
	);
}
