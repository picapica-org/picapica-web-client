import React from "react";
import "./group.scss";

export interface GroupProps {
	readonly heading: React.ReactNode;
}

export function Group({ heading, children }: React.PropsWithChildren<GroupProps>): JSX.Element {
	return (
		<div className="Group">
			<div className="group-heading">{heading}</div>
			<div className="group-container">{children}</div>
		</div>
	);
}
