import { ResourcePair } from "../generated/v1/types_pb";
import { EMPTY_MAP, EMPTY_SET } from "../util";
import { NONE_URN, PicapicaUrn } from "./urn";

export type ItemUrn = string & { readonly __itemUrn?: never };
export type CollectionUrn = string & { readonly __itemUrn?: never };

export class AnalysisConfig {
	readonly groupA: ReadonlySet<ItemUrn>;
	readonly groupB: ReadonlySet<ItemUrn>;
	readonly collections: ReadonlyMap<CollectionUrn, ReadonlySet<ItemUrn>>;

	constructor(
		groupA: ReadonlySet<ItemUrn>,
		groupB: ReadonlySet<ItemUrn>,
		collections: ReadonlyMap<CollectionUrn, ReadonlySet<ItemUrn>>
	) {
		this.groupA = groupA;
		this.groupB = groupB;
		this.collections = collections;
	}

	withGroupA(groupA: ReadonlySet<ItemUrn>): AnalysisConfig {
		return new AnalysisConfig(groupA, this.groupB, this.collections);
	}
	withGroupB(groupB: ReadonlySet<ItemUrn>): AnalysisConfig {
		return new AnalysisConfig(this.groupA, groupB, this.collections);
	}
	withCollections(collections: ReadonlyMap<CollectionUrn, ReadonlySet<ItemUrn>>): AnalysisConfig {
		return new AnalysisConfig(this.groupA, this.groupB, collections);
	}
	withCollection(collection: CollectionUrn, items: ReadonlySet<ItemUrn>): AnalysisConfig {
		const copy = new Map(this.collections);
		copy.set(collection, items);
		return this.withCollections(copy);
	}

	/**
	 * Creates a new analysis config from the given collection of resource pairs.
	 *
	 * The approach implemented to compress O(n^2) item combinations into 2 O(n) groups is very
	 * simplistic and works as follows: If a resource pair contains 2 item URNs, then the `a` URN
	 * will be in group A and the `b` URN will be in group B.
	 *
	 * Disappointingly simple, right? Well, it does have a few advantages: It's fast and it doesn't
	 * lose any combination as a byproduct of the lossy conversion. However, it might cause some
	 * combinations to be added.
	 *
	 * This approach also has the very nice property that:
	 * `a == fromResourcePairs(a.getResourcePairs())`.
	 *
	 * @param pairs
	 */
	static fromResourcePairs(
		pairs: Iterable<ResourcePair | ResourcePair.AsObject>,
		allItems: ReadonlyArray<ItemUrn>
	): AnalysisConfig {
		const groupA = new Set<ItemUrn>();
		const groupB = new Set<ItemUrn>();
		const collections = new Map<CollectionUrn, Set<ItemUrn>>();

		function addCollection(collection: CollectionUrn, item: ItemUrn): void {
			let set = collections.get(collection);
			if (set === undefined) {
				set = new Set();
				collections.set(collection, set);
			}
			set.add(item);
		}
		function toItemUrns(urn: string): ReadonlyArray<ItemUrn> {
			const type = getPicapicaUrnType(urn);

			if (type === "item") {
				return [urn];
			} else if (type === "session") {
				return allItems;
			} else {
				return [];
			}
		}

		for (const pair of pairs) {
			const [a, b] = pair instanceof ResourcePair ? [pair.getUrnA(), pair.getUrnB()] : [pair.urnA, pair.urnB];

			const aType = getPicapicaUrnType(a);
			const bType = getPicapicaUrnType(b);

			if (aType === "collection") {
				toItemUrns(b).forEach(item => addCollection(a, item));
				continue;
			}
			if (bType === "collection") {
				toItemUrns(a).forEach(item => addCollection(b, item));
				continue;
			}

			toItemUrns(a).forEach(item => groupA.add(item));
			toItemUrns(b).forEach(item => groupB.add(item));
		}

		return new AnalysisConfig(groupA, groupB, collections);
	}

	/**
	 * Returns a list of resource pairs that represents this config.
	 *
	 * @returns
	 */
	getResourcePairs(): ResourcePair[] {
		const pairs: ResourcePair[] = [];

		const pairsA = new Set<ItemUrn>();
		const pairsB = new Set<ItemUrn>();

		// add group combinations
		for (const a of this.groupA) {
			for (const b of this.groupB) {
				if (a === b) {
					// same item
				} else {
					pairsA.add(a);
					pairsB.add(b);
					pairs.push(new ResourcePair().setUrnA(a).setUrnB(b));
				}
			}
		}

		// add items from groups that aren't in any pair
		for (const a of this.groupA) {
			if (!pairsA.has(a)) {
				pairs.push(new ResourcePair().setUrnA(a).setUrnB(NONE_URN));
			}
		}
		for (const b of this.groupB) {
			if (!pairsB.has(b)) {
				pairs.push(new ResourcePair().setUrnA(NONE_URN).setUrnB(b));
			}
		}

		// add collections
		for (const [collection, items] of this.collections) {
			for (const item of items) {
				pairs.push(new ResourcePair().setUrnA(collection).setUrnB(item));
			}
		}

		return pairs;
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AnalysisConfig {
	export const EMPTY = new AnalysisConfig(EMPTY_SET, EMPTY_SET, EMPTY_MAP);
}

function getPicapicaUrnType(urn: string): PicapicaUrn["type"] | undefined {
	try {
		return PicapicaUrn.parse(urn).type;
	} catch (error) {
		return undefined;
	}
}
