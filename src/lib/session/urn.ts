import { parse as parseURI, URIComponents } from "uri-js";

export const NONE_URN = "urn:picapica:none";

type UrnTypes = "collection" | "document" | "session" | "item" | "result" | "none";
export type Urn<Type extends UrnTypes = UrnTypes> = Type extends "none"
	? typeof NONE_URN
	: `urn:picapica:${Type}:${string}`;

type WithType<O, T extends string> = O extends { readonly type: T } ? O : never;
export type Parsed<T extends UrnTypes> = WithType<PicapicaUrn, T>;

export type PicapicaUrn =
	| PicapicaCollectionUrn
	| PicapicaDocumentUrn
	| PicapicaSessionUrn
	| PicapicaItemUrn
	| PicapicaResultUrn
	| PicapicaNoneUrn;

interface PicapicaUrnBase {
	readonly type: UrnTypes;
}
export interface PicapicaCollectionUrn extends PicapicaUrnBase {
	type: "collection";
	collectionId: string;
}
export interface PicapicaDocumentUrn extends PicapicaUrnBase {
	type: "document";
	collectionId: string;
	documentId: string;
}
export interface PicapicaSessionUrn extends PicapicaUrnBase {
	type: "session";
	sessionId: string;
}
export interface PicapicaItemUrn extends PicapicaUrnBase {
	type: "item";
	sessionId: string;
	itemId: string;
}
export interface PicapicaResultUrn extends PicapicaUrnBase {
	type: "result";
	sessionId: string;
	resultId: string;
}
export interface PicapicaNoneUrn extends PicapicaUrnBase {
	type: "none";
}

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace PicapicaUrn {
	export function parse<T extends UrnTypes>(urn: Urn<T>): Parsed<T>;
	export function parse(urn: string): PicapicaUrn;
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

			case "none":
				if (args.length === 0) {
					return { type };
				}
				throw new SyntaxError(`Invalid Picapica ${type} URN: ${urn}`);

			default:
				throw new SyntaxError(`Invalid Picapica URN: ${urn}`);
		}
	}
	export function tryParse(urn: string): PicapicaUrn | undefined {
		try {
			return parse(urn);
		} catch (error) {
			return undefined;
		}
	}

	export function stringify<T extends PicapicaUrn>(urn: T): Urn<T["type"]> {
		return `urn:picapica:${urn.type}${stringifyContent(urn)}` as Urn<T["type"]>;
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
			case "none":
				return "";
		}
	}

	export function toSessionUrn(urn: PicapicaUrn): PicapicaSessionUrn | undefined {
		switch (urn.type) {
			case "item":
			case "result":
			case "session":
				return { type: "session", sessionId: urn.sessionId };
			default:
				return undefined;
		}
	}
}
