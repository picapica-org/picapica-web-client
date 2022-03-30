import { useEffect, useState } from "react";
import { SimpleCombinedDiff } from "./alignment";
import { LRUCache } from "./lru-cache";
import { useAsyncEffect } from "./react-util";
import { lazy, noop } from "./util";

let pendingResolvesCounter = 0;
const pendingResolves = new Map<number, (diff: SimpleCombinedDiff) => void>();

const getWorker = lazy(() => {
	const worker = new Worker(new URL("./alignment.worker.ts", import.meta.url));
	worker.onmessage = ({ data: { diff, id } }) => {
		const resolve = pendingResolves.get(id);
		pendingResolves.delete(id);
		if (resolve) {
			resolve(diff);
		}
	};
	return worker;
});

const promiseCache = new LRUCache<Promise<SimpleCombinedDiff>>(500);
const resultCache = new LRUCache<SimpleCombinedDiff>(500);

function getCacheKey(left: string, right: string): string {
	return left + "\0" + right;
}
function getSimpleCombinedDiff(left: string, right: string): Promise<SimpleCombinedDiff> {
	const key = getCacheKey(left, right);
	let promise = promiseCache.get(key);
	if (promise === undefined) {
		promise = new Promise<SimpleCombinedDiff>(resolve => {
			const id = pendingResolvesCounter++;
			pendingResolves.set(id, resolve);
			getWorker().postMessage({ left, right, id });
		});
		promiseCache.add(key, promise);
		promise.then(diff => resultCache.add(key, diff));
	}
	return promise;
}
function getCachedSimpleCombinedDiff(left: string, right: string): SimpleCombinedDiff | undefined {
	const key = getCacheKey(left, right);
	return resultCache.get(key);
}

export interface AlignmentRequest {
	left: string;
	right: string;
}
export interface Alignment {
	readonly left: string;
	readonly right: string;
	diff: SimpleCombinedDiff | undefined;
}

/**
 * Returns the alignments for some strings.
 *
 * The purpose of this hooks is to provide a convenient way to use a web worker to compute the alignment.
 *
 * @param key
 * @param requests
 * @returns
 */
export function useAlignment(key: string, requests: readonly AlignmentRequest[]): [readonly Alignment[]] {
	const [requestsKey, setRequestsKey] = useState(key);
	const [state, setState] = useState<readonly Alignment[]>(() => GetInitialAlignments(requests));

	useEffect(() => {
		if (key !== requestsKey) {
			setRequestsKey(key);
			setState(GetInitialAlignments(requests));
		}
	}, [key, requestsKey, requests]);

	useAsyncEffect<readonly Alignment[] | undefined>(
		async token => {
			// all alignments are computed
			if (state.every(a => a.diff !== undefined)) return;

			const newState = [...state];

			// try to fill-in as many cached results as possible
			for (let i = 0; i < state.length; i++) {
				const alignment = state[i];
				if (alignment.diff === undefined) {
					const diff = getCachedSimpleCombinedDiff(alignment.left, alignment.right);
					if (diff !== undefined) {
						newState[i] = { ...alignment, diff };
					}
				}
			}

			// compute at most one diff
			for (let i = 0; i < state.length; i++) {
				const alignment = state[i];
				if (alignment.diff === undefined) {
					newState[i] = { ...alignment, diff: await getSimpleCombinedDiff(alignment.left, alignment.right) };
					break;
				}
			}

			return newState;
		},
		newState => {
			if (newState) {
				setState(newState);
			}
		},
		noop,
		[state]
	);

	return [state];
}

function GetInitialAlignments(requests: readonly AlignmentRequest[]): readonly Alignment[] {
	return requests.map(r => {
		return { left: r.left, right: r.right, diff: getCachedSimpleCombinedDiff(r.left, r.right) };
	});
}
