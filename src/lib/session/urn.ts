export type PicapicaUrnType = "item" | "collection" | "none";

export type ItemUrn = string & { readonly __itemUrn?: never };
export type CollectionUrn = string & { readonly __itemUrn?: never };

export const NONE_URN = "urn:none:";

export function getPicapicaUrnType(urn: string): "item" | "collection" | "none" {
	if (/^urn:item:/.test(urn)) {
		return "item";
	} else if (/^urn:collection:/.test(urn)) {
		return "collection";
	} else if (/^urn:none:/.test(urn)) {
		return "none";
	} else {
		throw new Error("Invalid URN format");
	}
}
