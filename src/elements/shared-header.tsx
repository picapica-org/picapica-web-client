import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../../assets/favicon.png";

const gaScript = `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-49029057-1', 'picapica.org');
	ga('send', 'pageview');
`;

export function SharedHead(): JSX.Element {
	return (
		<Helmet>
			<link rel="icon" href={favicon} />
			<script>{gaScript}</script>
		</Helmet>
	);
}
