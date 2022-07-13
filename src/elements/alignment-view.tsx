import React from "react";
import { LeftChange, RightChange } from "../lib/alignment";
import { Locales } from "../lib/localization";
import { useAlignment } from "../lib/use-alignment";
import { useLocalization } from "../lib/use-localization";
import "./alignment-view.scss";

export interface Props {
	readonly left: string;
	readonly right: string;
	readonly alignmentKey: string;
}

export function AlignmentView(props: Props): JSX.Element {
	const [alignments] = useAlignment(props.alignmentKey, [props]);

	const diff = alignments[0]?.diff?.diff;

	return (
		<div className="AlignmentView">
			{diff ? (
				<>
					{diff.map(({ left }, i) => {
						return <DiffView key={"l" + i} left={left} index={i} total={diff.length} />;
					})}
					{diff.map(({ right }, i) => {
						return <DiffView key={"r" + i} right={right} index={i} total={diff.length} />;
					})}
				</>
			) : (
				<>
					<div className="left" style={{ gridRow: 1 }}>
						<span>{props.left}</span>
					</div>
					<div className="right" style={{ gridRow: 1 }}>
						<span>{props.right}</span>
					</div>
				</>
			)}
		</div>
	);
}

interface DiffLineProps {
	index: number;
	total: number;
}
function DiffView(props: ({ left: LeftChange<string> } | { right: RightChange<string> }) & DiffLineProps): JSX.Element {
	let equal: string;
	let changed: string;
	let type: "left" | "right";
	if ("left" in props) {
		equal = props.left.equal;
		changed = props.left.removed;
		type = "left";
	} else {
		equal = props.right.equal;
		changed = props.right.added;
		type = "right";
	}

	const changedClass = type === "left" ? "removed" : "added";

	return (
		<div className={type} style={{ gridRow: props.index + 1 }}>
			{equal !== "" ? (
				<>
					<span className="unchanged">{equal.trim()}</span>
					{/\s$/.test(equal) ? " " : ""}
					<Change {...props} type={changedClass} text={changed} isFirst={false} />
				</>
			) : (
				<Change {...props} type={changedClass} text={changed} isFirst={true} />
			)}
		</div>
	);
}

interface ChangeProps {
	text: string;
	type: "added" | "removed";
	index: number;
	total: number;
	isFirst: boolean;
}
function Change(props: ChangeProps): JSX.Element {
	const text = props.text;

	const context = 500;
	const minOmitted = 20;

	const isLast = props.index === props.total - 1;
	if (isLast && text.length > context) {
		const tokens = tokenizeWords(text);
		const rest = splitRest(tokens, context);
		if (rest.length > minOmitted) {
			return (
				<>
					<span className={props.type}>
						<FadeText text={tokens.join(" ").trim()} position="end" />
					</span>
					<Omitted words={rest.length} />
				</>
			);
		}
	} else if (props.isFirst && text.length > context) {
		const tokens = tokenizeWords(text).reverse();
		const rest = splitRest(tokens, context);
		if (rest.length > minOmitted) {
			return (
				<>
					<Omitted words={rest.length} />
					<span className={props.type}>
						<FadeText text={tokens.reverse().join(" ").trim()} position="start" />
					</span>
				</>
			);
		}
	} else if (text.length > context * 2) {
		const start = tokenizeWords(text);
		const end = splitRest(start, context).reverse();
		const rest = splitRest(end, context);

		if (rest.length > minOmitted) {
			return (
				<>
					<span className={props.type}>
						<FadeText text={start.join(" ").trim()} position="end" />
					</span>
					<Omitted words={rest.length} />
					<span className={props.type}>
						<FadeText text={end.reverse().join(" ").trim()} position="start" />
					</span>
				</>
			);
		}
	}

	return <span className={props.type}>{props.text}</span>;
}
function tokenizeWords(text: string): string[] {
	return text.split(/ /g);
}
function splitRest(tokens: string[], stringLength: number): string[] {
	let length = 0;
	for (let i = 0; i < tokens.length; i++) {
		length += tokens[i].length;
		if (length >= stringLength) {
			return tokens.splice(i + 1, tokens.length - i - 1);
		}
	}

	return [];
}

interface FadeTextProps {
	text: string;
	position: "start" | "end";
}
function FadeText(props: FadeTextProps): JSX.Element {
	const fadeLength = 10;

	const chars = [...props.text];
	if (chars.length < fadeLength) {
		// fail safe
		return <>{props.text}</>;
	}

	const fade =
		props.position === "start" ? chars.splice(0, fadeLength) : chars.splice(chars.length - fadeLength, fadeLength);
	const text = chars.join("");

	if (props.position === "start") {
		return (
			<>
				{fade.map((c, i) => (
					<span key={i} className="fade" style={{ opacity: i / fadeLength }}>
						{c}
					</span>
				))}
				{text}
			</>
		);
	} else {
		return (
			<>
				{text}
				{fade.map((c, i) => (
					<span key={i} className="fade" style={{ opacity: (fadeLength - i) / fadeLength }}>
						{c}
					</span>
				))}
			</>
		);
	}
}

interface OmittedProps {
	words: number;
}
function Omitted(props: OmittedProps): JSX.Element {
	const l = useLocalization(locales);
	return <span className="Omitted"> [{l.omitted(props.words)}] </span>;
}

const locales: Locales<{
	omitted: (words: number) => JSX.Element;
}> = {
	en: {
		omitted(words) {
			return <>… {words} words omitted</>;
		},
	},
	de: {
		omitted(words) {
			return <>… {words} Wörter weggelassen</>;
		},
	},
};
