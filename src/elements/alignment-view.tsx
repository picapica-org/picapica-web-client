import React from "react";
import { fromDiff, filterUnchanged, iteratePairs, EditPair } from "../lib/edit";
import { CategoryGroup, debugAssert, groupByCategory } from "../lib/util";
import "./alignment-view.scss";

export interface Props {
	readonly left: string;
	readonly right: string;
}

export function AlignmentView(props: Props): JSX.Element {
	const { diff, scores } = getCombinedDiff(props.left, props.right);

	return (
		<div className="AlignmentView">
			{diff.map(({ left }, i) => {
				return <Change key={"l" + i} left={left} index={i} scores={scores} />;
			})}
			{diff.map(({ right }, i) => {
				return <Change key={"r" + i} right={right} index={i} scores={scores} />;
			})}
		</div>
	);
}

function Change(
	props: ({ left: LeftChange } | { right: RightChange }) & { index: number; scores: Map<WordToken, number> }
): JSX.Element {
	let equalTokens: readonly WordToken[];
	let type: "left" | "right";
	let changedTokens;
	if ("left" in props) {
		equalTokens = props.left.equal;
		type = "left";
		changedTokens = props.left.removed;
	} else {
		equalTokens = props.right.equal;
		type = "right";
		changedTokens = props.right.added;
	}

	const changedClass = type === "left" ? "removed" : "added";

	const groups = groupByCategory([...equalTokens, ...changedTokens], (t, i) => {
		if (i < equalTokens.length) {
			return "unchanged";
		}
		const score = quantizeScore(props.scores.get(t) ?? 0);
		if (score !== "ignore") {
			return `partial-${score}`;
		}
		return changedClass;
	});

	return (
		<div className={type} style={{ gridRow: props.index + 1 }}>
			{renderGroups(groups)}
		</div>
	);
}

function renderGroups(groups: readonly CategoryGroup<WordToken, string>[]): JSX.Element {
	const combined = groups.map(g => ({ name: g.category, value: g.items.join("") }));
	const length = combined.length;

	return (
		<>
			{combined.map((g, i) => {
				const space =
					(i < length - 1 && /\s$/.test(g.value)) || (i + 1 < length && /^\s/.test(combined[i + 1].value));

				return (
					<React.Fragment key={i}>
						<span className={g.name}>{g.value.trim()}</span>
						{space ? " " : ""}
					</React.Fragment>
				);
			})}
		</>
	);
}

interface LeftChange {
	equal: WordToken[];
	removed: WordToken[];
}
interface RightChange {
	equal: WordToken[];
	added: WordToken[];
}
class CombinedChange {
	readonly left: LeftChange;
	readonly right: RightChange;

	constructor(left: LeftChange, right: RightChange) {
		this.left = left;
		this.right = right;
	}

	static fromEditPair([unchanged, changed]: EditPair<WordToken>): CombinedChange {
		return new CombinedChange(
			{ equal: unchanged.left, removed: changed.removed },
			{ equal: unchanged.right, added: changed.added }
		);
	}
}

function getCombinedDiff(left: string, right: string): { diff: CombinedChange[]; scores: Map<WordToken, number> } {
	let edits = fromDiff(tokenizeWords(left), tokenizeWords(right), WordToken.equals);

	const filteredOut = new Map<WordToken, WordToken>();

	// filter
	edits = filterUnchanged(edits, e => {
		const ignore = ignoreUnchanged(e.left.join("")) || ignoreUnchanged(e.right.join(""));
		if (ignore) {
			debugAssert(e.left.length === e.right.length);

			// both left and right contain the same number of tokens
			for (let i = 0; i < e.left.length; i++) {
				const l = e.left[i];
				const r = e.right[i];

				debugAssert(!filteredOut.has(l));
				filteredOut.set(l, r);
				debugAssert(!filteredOut.has(r));
				filteredOut.set(r, l);
			}
		}
		return !ignore;
	});

	// diff
	const diff = [...iteratePairs(edits)].map(CombinedChange.fromEditPair);

	// score the filtered-out tokens
	const scores = new Map<WordToken, number>();
	const increaseScore = (token: WordToken, amount: number): void => {
		const other = filteredOut.get(token);
		debugAssert(other !== undefined);

		scores.set(token, Math.max(scores.get(token) ?? 0, amount));
		scores.set(other, Math.max(scores.get(other) ?? 0, amount));
	};
	diff.flatMap(c => [c.left.removed, c.right.added])
		.flatMap(seq => groupByCategory(seq, t => filteredOut.has(t)))
		.filter(g => g.category)
		.forEach(g => {
			const groupScore = g.items.join("").length;
			g.items.forEach(t => increaseScore(t, groupScore));
		});

	return { diff, scores };
}

/**
 * Some unchanged section are too small to be useful. This includes spaces, punctuation, and stop words.
 *
 * This function decides whether an unchanged section will be ignore and combined with whatever change surrounds it.
 */
function ignoreUnchanged(value: string): boolean {
	//return false;
	return (
		// only spaces and/or punctuation
		/^[\s\p{P}]*$/u.test(value) ||
		// too short
		value.length <= 12
	);
}

function quantizeScore(score: number): "ignore" | "low" | "medium" | "high" {
	if (score <= 5) {
		return "ignore";
	}
	if (score <= 10) {
		return "low";
	}
	if (score <= 20) {
		return "medium";
	}
	return "high";
}

class WordToken {
	readonly raw: string;
	readonly compareValue: string;

	constructor(raw: string, compareValue: string) {
		this.raw = raw;
		this.compareValue = compareValue;
	}

	toString(): string {
		return this.raw;
	}

	static equals(a: WordToken, b: WordToken): boolean {
		return a.compareValue === b.compareValue;
	}
}

const NON_WORD_CHAR = /[\s()[\]{},;:]/.source;
const WORD_CHAR = NON_WORD_CHAR.replace(/^\[/, "[^");
const WORD_TOKEN_REGEX = `${NON_WORD_CHAR}*(${WORD_CHAR}+)${NON_WORD_CHAR}*`;

function tokenizeWords(text: string): WordToken[] {
	const tokens: WordToken[] = [];

	let last = 0;
	const word = RegExp(WORD_TOKEN_REGEX, "uy");
	for (let m; (m = word.exec(text)); ) {
		const raw = m[0];
		const compareValue = m[1].replace(/[^\p{Alpha}\p{digit}]+/gu, "").toUpperCase() || m[1];

		tokens.push(new WordToken(raw, compareValue));
		last = m.index + raw.length;
	}

	if (last < text.length) {
		const raw = text.slice(last);
		tokens.push(new WordToken(raw, raw));
	}

	return tokens;
}
