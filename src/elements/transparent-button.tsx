import React from "react";
import "./transparent-button.scss";

interface Props {
	id?: string;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export function TransparentButton({ id, className = "", onClick, children }: Readonly<Props>): JSX.Element {
	return (
		<button className={`TransparentButton ${className}`.trim()} id={id} onClick={onClick}>
			{children}
		</button>
	);
}
