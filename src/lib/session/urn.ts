import { parse as parseURI, URIComponents } from "uri-js";

export const NONE_URN = "urn:none:";

export type PicapicaUrn =
	| PicapicaCollectionUrn
	| PicapicaDocumentUrn
	| PicapicaSessionUrn
	| PicapicaItemUrn
	| PicapicaResultUrn;
export interface PicapicaCollectionUrn {
	type: "collection";
	collectionId: string;
}
export interface PicapicaDocumentUrn {
	type: "document";
	collectionId: string;
	documentId: string;
}
export interface PicapicaSessionUrn {
	type: "session";
	sessionId: string;
}
export interface PicapicaItemUrn {
	type: "item";
	sessionId: string;
	itemId: string;
}
export interface PicapicaResultUrn {
	type: "result";
	sessionId: string;
	resultId: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace PicapicaUrn {
	export function parse(urn: string): PicapicaUrn {
		const parsed = parseURI(urn) as URIComponents & { nid?: string; nss?: string };
		if (parsed.scheme !== "urn" || parsed.nid !== "picapica" || !parsed.nss) {
			throw new SyntaxError(`Invalid Picapica URN: ${urn}`);
		}

		const parts = parsed.nss.split(/:/);
		const type = parts[0];
		const args = parts.slice(1);

		switch (type) {
			case "collection":
				if (args.length === 1) {
					return { type, collectionId: args[0] };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			case "document":
				if (args.length === 2) {
					return { type, collectionId: args[0], documentId: args[1] };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			case "session":
				if (args.length === 1) {
					return { type, sessionId: args[0] };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			case "item":
				if (args.length === 2) {
					return { type, sessionId: args[0], itemId: args[1] };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			case "result":
				if (args.length === 2) {
					return { type, sessionId: args[0], resultId: args[1] };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			default:
				throw new SyntaxError(`Invalid Picapica URN: ${urn}`);
		}
	}

	export function stringify(urn: PicapicaUrn): string {
		return `urn:picapica:${urn.type}${stringifyContent(urn)}`;
	}
	function stringifyContent(urn: PicapicaUrn): string {
		switch (urn.type) {
			case "collection":
				return `:${urn.collectionId}`;
			case "document":
				return `:${urn.collectionId}:${urn.documentId}`;
			case "session":
				return `:${urn.sessionId}`;
			case "item":
				return `:${urn.sessionId}:${urn.itemId}`;
			case "result":
				return `:${urn.sessionId}:${urn.resultId}`;
		}
	}
}
