import React from "react";
import "./badge.scss";

export type BadgeKind = "Dark" | "Light";

export interface BadgeProps {
	readonly kind: BadgeKind;
}

export function Badge(props: React.PropsWithChildren<BadgeProps>): JSX.Element {
	return <span className={`Badge ${props.kind}`}>{props.children}</span>;
}
