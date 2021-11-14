import React from "react";
import "./group.scss";

export interface GroupProps {
	readonly heading: React.ReactNode;
}

export function Group(props: React.PropsWithChildren<GroupProps>): JSX.Element {
	return (
		<div className="Group">
			<div className="group-heading">{props.heading}</div>
			<div className="group-container">{props.children}</div>
		</div>
	);
}
