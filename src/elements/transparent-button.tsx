import React from "react";
import "./transparent-button.scss";

interface Props {
	id?: string;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export function TransparentButton(props: Readonly<Props>): JSX.Element {
	const className = props.className ? " " + props.className : "";

	return (
		<button className={"TransparentButton" + className} id={props.id} onClick={props.onClick}>
			{props.children}
		</button>
	);
}
