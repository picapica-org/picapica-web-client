import { CreateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { shorten } from "../util";

const encoder = new TextEncoder();

export function newCreateTextItemRequest(text: string): CreateItemRequest {
	const req = new CreateItemRequest();

	req.setType(Item.Resource.Type.TYPE_TEXT);
	req.setRaw(encoder.encode(text));

	// Set the name to the first line
	const name = /^.*/.exec(text.trim())![0];
	req.setMeta(new Item.Metadata().setName(shorten(name, 100)));

	return req;
}
export function newCreateUrlItemRequest(url: string): CreateItemRequest {
	const req = new CreateItemRequest();

	req.setType(Item.Resource.Type.TYPE_URL);
	req.setRaw(encoder.encode(url));
	req.setMeta(new Item.Metadata().setName(shorten(url, 100)));

	return req;
}
