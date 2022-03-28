import { EditPair, filterUnchanged, fromDiff, iteratePairs } from "./edit";
import { debugAssert, groupByCategory } from "./util";

export interface LeftChange {
	equal: WordToken[];
	removed: WordToken[];
}
export interface RightChange {
	equal: WordToken[];
	added: WordToken[];
}
export class CombinedChange {
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

export function getCombinedDiff(
	left: string,
	right: string
): { diff: CombinedChange[]; scores: Map<WordToken, number> } {
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

export class WordToken {
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
