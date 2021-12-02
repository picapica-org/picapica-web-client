import React from "react";
import { H2, H3 } from "./headings";

type TocHeading = (id: string, text: string) => JSX.Element;

interface TocContext {
	h2: TocHeading;
	h3: TocHeading;
}

export function createToc(supplier: (context: TocContext) => JSX.Element): JSX.Element {
	const links: { level: number; id: string; text: string }[] = [];

	const context: TocContext = {
		h2(id, text) {
			links.push({ level: 2, id, text });
			return <H2 id={id}>{text}</H2>;
		},
		h3(id, text) {
			links.push({ level: 3, id, text });
			return <H3 id={id}>{text}</H3>;
		},
	};

	const content = supplier(context);

	return (
		<>
			<div className="Toc">
				<ul>
					{links.map(({ level, id, text }) => {
						return (
							<li key={id} className={"h" + level}>
								<span className="icon"></span>
								<a href={"#" + id}>{text}</a>
							</li>
						);
					})}
				</ul>
			</div>
			{content}
		</>
	);
}
