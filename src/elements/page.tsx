import React from "react";
import { LocalizableProps } from "../lib/localization";
import { Footer } from "./footer";
import { BigHeader, SmallHeader } from "./header";
import { DropzoneRootProps, DropzoneState } from "react-dropzone";
import { identity } from "../lib/util";
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
	dropState?: DropzoneState;
	children: React.ReactNode;
}

export function Page(props: Props): JSX.Element {
	const Header = HEADER_MAP[props.header];

	const getRootProps: (x: DropzoneRootProps) => DropzoneRootProps = props.dropState?.getRootProps ?? identity;

	return (
		<div {...getRootProps({ id: "Page", className: props.header + "-header", tabIndex: -1 })}>
			{props.dropState && <input {...props.dropState.getInputProps()} />}

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
