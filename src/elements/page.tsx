import React from "react";
import { LocalizableProps } from "../lib/localization";
import { Footer } from "./footer";
import { BigHeader, SmallHeader } from "./header";
import "./page.scss";
import "reactjs-popup/dist/index.css";

type HeaderType = "small" | "big";

const HEADER_MAP: Record<HeaderType, typeof SmallHeader | typeof BigHeader> = {
	big: BigHeader,
	small: SmallHeader,
};

export interface Props extends LocalizableProps {
	header: HeaderType;
	className: string;
	children: React.ReactNode;
}

export function Page(props: Props): JSX.Element {
	const Header = HEADER_MAP[props.header];

	return (
		<div id="Page" className={props.header + "-header"}>
			<Header lang={props.lang} />
			<div id="content" className={props.className}>
				{props.children}
			</div>
			<div className="footer-wrapper">
				<Footer lang={props.lang} />
			</div>
		</div>
	);
}

export function createPage(props: Omit<Props, "children">, supplier: () => React.ReactNode): JSX.Element {
	return <Page {...props}>{supplier()}</Page>;
}
