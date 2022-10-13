import React, { useEffect } from "react";
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
	title?: string;
	header: HeaderType;
	className: string;
	dropState?: DropzoneState;
}

export function Page({
	title = "Picapica",
	header,
	className,
	dropState,
	children,
}: React.PropsWithChildren<Props>): JSX.Element {
	const Header = HEADER_MAP[header];

	const getRootProps: (x: DropzoneRootProps) => DropzoneRootProps = dropState?.getRootProps ?? identity;

	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<div {...getRootProps({ id: "Page", className: header + "-header", tabIndex: -1 })}>
			{dropState && <input {...dropState.getInputProps()} />}

			<Header />
			<div id="content" className={className}>
				{children}
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
