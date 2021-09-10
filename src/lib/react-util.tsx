import React from "react";

export function dynamic(supplier: () => JSX.Element): JSX.Element {
	const isSSR = typeof window === "undefined";
	if (isSSR) {
		return <></>;
	} else {
		return supplier();
	}
}
