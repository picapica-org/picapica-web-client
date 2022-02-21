import { CreateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { assertNever, shorten, shortenWords } from "../util";

export type ItemData =
	| { readonly type: "file"; file: File }
	| { readonly type: "url"; url: string }
	| { readonly type: "text"; text: string };

export type ItemType = ItemData["type"];

/**
 * An item prototype.
 *
 * This simply contains the name of an item and from where to get its data.
 */
export class ItemProto {
	readonly name: string;
	readonly data: ItemData;

	constructor(name: string, data: ItemData) {
		this.name = name;
		this.data = data;
	}

	static fromFile(file: File): ItemProto {
		return new ItemProto(file.name, { type: "file", file });
	}
	static fromUrl(url: string): ItemProto {
		return new ItemProto(shorten(url, 100), { type: "url", url });
	}
	static fromText(text: string): ItemProto {
		return new ItemProto(extractNameFromText(text), { type: "text", text });
	}

	getMeta(): ItemMeta {
		return {
			name: this.name,
			type: this.data.type,
			size: getByteSize(this.data),
		};
	}

	async read(): Promise<ItemRawProto> {
		const raw = await readData(this.data);
		return new ItemRawProto(this.name, this.data.type, raw);
	}
}

/**
 * An item prototype with its raw data read into memory.
 */
export class ItemRawProto {
	readonly name: string;
	readonly type: ItemType;
	readonly raw: Uint8Array;

	constructor(name: string, type: ItemType, raw: Uint8Array) {
		this.name = name;
		this.type = type;
		this.raw = raw;
	}

	getMeta(): ItemMeta {
		return {
			name: this.name,
			type: this.type,
			size: this.raw.byteLength,
		};
	}

	getRequest(sessionUrn: string): CreateItemRequest {
		const req = new CreateItemRequest();

		req.setSessionUrn(sessionUrn);
		req.setMeta(new Item.Metadata().setName(this.name));
		req.setType(toItemResourceType(this.type));
		req.setRaw(this.raw);

		return req;
	}
}

export interface ItemMeta {
	readonly name: string;
	readonly type: ItemType;
	readonly size: number;
}

const encoder = new TextEncoder();
async function readData(data: ItemData): Promise<Uint8Array> {
	switch (data.type) {
		case "file":
			return new Uint8Array(await new Response(data.file).arrayBuffer());
		case "url":
			return encoder.encode(data.url);
		case "text":
			return encoder.encode(data.text);
		default:
			assertNever(data);
	}
}

function getByteSize(data: ItemData): number {
	switch (data.type) {
		case "file":
			return data.file.size;
		case "url":
			return encoder.encode(data.url).byteLength;
		case "text":
			return encoder.encode(data.text).byteLength;
		default:
			assertNever(data);
	}
}

export function toItemResourceType(type: ItemType): Item.Resource.Type {
	switch (type) {
		case "file":
			return Item.Resource.Type.TYPE_FILE;
		case "url":
			return Item.Resource.Type.TYPE_URL;
		case "text":
			return Item.Resource.Type.TYPE_TEXT;
		default:
			assertNever(type);
	}
}
export function toItemType(type: Item.Resource.Type): ItemType | undefined {
	switch (type) {
		case Item.Resource.Type.TYPE_UNSPECIFIED:
			return undefined;
		case Item.Resource.Type.TYPE_FILE:
			return "file";
		case Item.Resource.Type.TYPE_URL:
			return "url";
		case Item.Resource.Type.TYPE_TEXT:
			return "text";
		default:
			assertNever(type);
	}
}

function extractNameFromText(text: string): string {
	return shortenWords(text.replace(/\s+/g, " ").trim(), 30, 50);
}
