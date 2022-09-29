import React from "react";
import favicon from "../../assets/favicon.png";

export function SharedHead(): JSX.Element {
	return <link rel="icon" href={favicon} />;
}
