import { Result } from "../generated/v1/types_pb";
import { DeepReadonly } from "../util";
import { PicapicaDocumentUrn, PicapicaItemUrn, PicapicaUrn } from "./urn";

export interface ItemResult {
	readonly a: PicapicaItemUrn;
	readonly b: PicapicaItemUrn;
	readonly result: DeepReadonly<Result.AsObject>;
}
export interface CollectionResult {
	readonly item: PicapicaItemUrn;
	readonly document: PicapicaDocumentUrn;
	readonly result: DeepReadonly<Result.AsObject>;
}

export interface ResultCategories {
	/**
	 * A list of all results between items.
	 */
	items: ItemResult[];
	/**
	 * A map from a collections URN to a non-empty list of results between an item and a document from key collection.
	 */
	collections: Map<string, CollectionResult[]>;
	/**
	 * A list of results that are invalid by not having valid URNs.
	 */
	invalid: DeepReadonly<Result.AsObject>[];
}

export function categorizeResults(results: Iterable<DeepReadonly<Result.AsObject>>): ResultCategories {
	const categories: ResultCategories = { items: [], collections: new Map(), invalid: [] };

	function addDocument(
		item: PicapicaItemUrn,
		document: PicapicaDocumentUrn,
		result: DeepReadonly<Result.AsObject>
	): void {
		const collectionUrn = PicapicaUrn.stringify({ type: "collection", collectionId: document.collectionId });

		let list = categories.collections.get(collectionUrn);
		if (list === undefined) {
			list = [];
			categories.collections.set(collectionUrn, list);
		}
		list.push({ item, document, result });
	}

	for (const result of results) {
		const a = PicapicaUrn.tryParse(result.resources?.urnA ?? "");
		const b = PicapicaUrn.tryParse(result.resources?.urnB ?? "");

		if (!a || !b) {
			categories.invalid.push(result);
			continue;
		}

		if (a.type === "item" && b.type === "item") {
			categories.items.push({ a, b, result });
		} else if (a.type === "item" && b.type === "document") {
			addDocument(a, b, result);
		} else if (a.type === "document" && b.type === "item") {
			addDocument(b, a, result);
		} else {
			categories.invalid.push(result);
		}
	}

	return categories;
}
