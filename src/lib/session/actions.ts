import { DeleteItemRequest, Session, UpdateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { DeepReadonly } from "../util";

export interface ActionResult<Req> {
	updatedSession: Session.AsObject;
	request: Req;
}

export function cloneSession(session: DeepReadonly<Session.AsObject>): Session.AsObject {
	return JSON.parse(JSON.stringify(session));
}

export function deleteItemAction(
	session: DeepReadonly<Session.AsObject>,
	itemUrn: string
): ActionResult<DeleteItemRequest> {
	const updatedSession = cloneSession(session);
	updatedSession.itemsList = updatedSession.itemsList.filter(item => item.urn !== itemUrn);

	const request = new DeleteItemRequest();
	request.setSessionId(session.id);
	request.setItemId(itemUrn);

	return { updatedSession, request };
}

export function updateItemAction(
	session: DeepReadonly<Session.AsObject>,
	itemUrn: string,
	meta: Item.Metadata
): ActionResult<UpdateItemRequest> {
	const updatedSession = cloneSession(session);
	const item = updatedSession.itemsList.find(item => item.urn === itemUrn);
	if (item) {
		item.meta = meta.toObject();
	}

	const request = new UpdateItemRequest();
	request.setSessionId(session.id);
	request.setItemId(itemUrn);
	request.setMeta(meta);

	return { updatedSession, request };
}
