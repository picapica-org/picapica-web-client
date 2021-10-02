import { diffArrays } from "diff";
import { Comparator, endsWith } from "./util";

/**
 * A edit is an operation that transforms parts of the *left* token stream A into the *right* token stream B.
 */
export type Edit<A, B = A> = Unchanged<A, B> | Changed<A, B>;

export interface Unchanged<A, B = A> {
	readonly type: "Unchanged";
	left: A[];
	right: B[];
}
export interface Changed<A, B = A> {
	readonly type: "Changed";
	removed: A[];
	added: B[];
}

export type EditPair<A, B = A> = [Unchanged<A, B>, Changed<A, B>];

function merge<A, B>(edits: Iterable<Edit<A, B>>): Edit<A, B>[] {
	const result: Edit<A, B>[] = [{ type: "Unchanged", left: [], right: [] }];

	for (const edit of edits) {
		const last = result[result.length - 1];

		if (last.type === "Unchanged" && edit.type === "Unchanged") {
			// append to the last change
			last.left.push(...edit.left);
			last.right.push(...edit.right);
		} else if (last.type === "Changed" && edit.type === "Changed") {
			// append to the last change
			last.removed.push(...edit.removed);
			last.added.push(...edit.added);
		} else {
			result.push(edit);
		}
	}

	return result;
}

export function fromDiff<A>(left: readonly A[], right: readonly A[], comparator: Comparator<A>): Iterable<Edit<A>> {
	return minimize(fromRawDiff(left, right, comparator), comparator, comparator);
}

function* fromRawDiff<A, B>(
	left: readonly A[],
	right: readonly B[],
	comparator: Comparator<A, B>
): Iterable<Edit<A, B>> {
	const diff = diffArrays(left as A[], right as B[], { comparator });

	let leftTokenIndex = 0;
	let rightTokenIndex = 0;

	for (const change of diff) {
		if (change.added) {
			rightTokenIndex += change.value.length;

			yield {
				type: "Changed",
				removed: [],
				added: change.value as B[],
			};
		} else if (change.removed) {
			leftTokenIndex += change.value.length;

			yield {
				type: "Changed",
				removed: change.value as A[],
				added: [],
			};
		} else {
			const length = change.value.length;
			const leftValue = left.slice(leftTokenIndex, leftTokenIndex + length);
			const rightValue = right.slice(rightTokenIndex, rightTokenIndex + length);
			leftTokenIndex += length;
			rightTokenIndex += length;

			yield {
				type: "Unchanged",
				left: leftValue,
				right: rightValue,
			};
		}
	}
}

/**
 * The diff algorithm sometimes returns results like this:
 *
 * ```diff
 * - [the] new color of the
 * + [the]
 * ```
 *
 * Where both `[the]` tokens are the unchanged tokens.
 *
 * We can minimize the number of changes by trying to move the list of unchanged tokens to the back. Example
 *
 * ```diff
 * - the new color of [the]
 * + [the]
 * ```
 */
function minimize<A, B>(
	edits: Iterable<Edit<A, B>>,
	comparatorA: Comparator<A>,
	comparatorB: Comparator<B>
): Iterable<Edit<A, B>> {
	const result: Edit<A, B>[] = merge(edits);

	for (let i = 0; i < result.length; i += 2) {
		const unchanged = result[i] as Unchanged<A, B>;
		const changed = result[i + 1] as Changed<A, B> | undefined;
		if (!changed) {
			continue;
		}

		if (changed.added.length === 0) {
			if (endsWith(changed.removed, unchanged.left, comparatorA)) {
				const splitPoint = changed.removed.length - unchanged.left.length;
				const before = changed.removed.slice(0, splitPoint);
				const after = changed.removed.slice(splitPoint);
				result[i] = {
					type: "Changed",
					removed: [...unchanged.left, ...before],
					added: [],
				};
				result[i + 1] = {
					type: "Unchanged",
					left: after,
					right: unchanged.right,
				};
			}
		} else if (changed.removed.length === 0) {
			if (endsWith(changed.added, unchanged.right, comparatorB)) {
				const splitPoint = changed.added.length - unchanged.right.length;
				const before = changed.added.slice(0, splitPoint);
				const after = changed.added.slice(splitPoint);
				result[i] = {
					type: "Changed",
					removed: [],
					added: [...unchanged.right, ...before],
				};
				result[i + 1] = {
					type: "Unchanged",
					left: unchanged.left,
					right: after,
				};
			}
		}
	}

	return result;
}

export function* iteratePairs<A, B>(edits: Iterable<Edit<A, B>>): Iterable<EditPair<A, B>> {
	const merged = merge(edits);

	// We know that the items in changes always start with Unchanged alternate between Unchanged and Changed
	for (let i = 0; i < merged.length; i += 2) {
		const unchanged = merged[i] as Unchanged<A, B>;
		const changed = (merged[i + 1] as Changed<A, B> | undefined) ?? {
			type: "Changed",
			added: [],
			removed: [],
		};

		yield [unchanged, changed];
	}
}

export function* filterUnchanged<A, B>(
	edits: Iterable<Edit<A, B>>,
	condition: (edit: Unchanged<A, B>) => boolean
): Iterable<Edit<A, B>> {
	for (const change of merge(edits)) {
		if (change.type === "Unchanged" && !condition(change)) {
			yield {
				type: "Changed",
				removed: change.left,
				added: change.right,
			};
		} else {
			yield change;
		}
	}
}
