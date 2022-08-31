import React from "react";
import "./headings.scss";

export interface HeadingProps {
	id: string;
	className?: string;
}

export function H2({ id, className, children }: React.PropsWithChildren<HeadingProps>): JSX.Element {
	return (
		<a href={"#" + id} className="heading-link h2">
			<h2 className={className}>{children}</h2>
		</a>
	);
}

export function H3({ id, className, children }: React.PropsWithChildren<HeadingProps>): JSX.Element {
	return (
		<a href={"#" + id} className="heading-link h3">
			<h3 className={className}>{children}</h3>
		</a>
	);
}
