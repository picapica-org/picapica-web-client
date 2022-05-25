import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../../assets/favicon.png";

export function SharedHead(): JSX.Element {
	return (
		<Helmet>
			<link rel="icon" href={favicon} />
		</Helmet>
	);
}
