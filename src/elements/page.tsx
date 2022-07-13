import React from "react";
import { DropzoneRootProps, DropzoneState } from "react-dropzone";
import { identity } from "../lib/util";
import { Footer } from "./footer";
import { BigHeader, SmallHeader } from "./header";
import "./page.scss";
import "reactjs-popup/dist/index.css";

type HeaderType = "small" | "big";

const HEADER_MAP: Record<HeaderType, typeof SmallHeader | typeof BigHeader> = {
	big: BigHeader,
	small: SmallHeader,
};

export interface Props {
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

			<Header />
			<div id="content" className={props.className}>
				{props.children}
			</div>
			<div className="footer-wrapper">
				<Footer />
			</div>
		</div>
	);
}

export function createPage(props: Omit<Props, "children">, supplier: () => React.ReactNode): JSX.Element {
	return <Page {...props}>{supplier()}</Page>;
}
