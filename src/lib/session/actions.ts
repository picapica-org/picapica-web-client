import { SessionConfig } from "../generated/v1/configs_pb";
import { DeleteItemRequest, Session, UpdateConfigRequest, UpdateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { DeepReadonly } from "../util";
import { AnalysisConfig } from "./analysis-config";

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

export function updateConfigAction(
	session: DeepReadonly<Session.AsObject>,
	analysisConfig: AnalysisConfig
): ActionResult<UpdateConfigRequest> {
	const pairs = analysisConfig.getResourcePairs();

	const updatedSession = cloneSession(session);
	updatedSession.config ??= { pairingsList: [] };
	updatedSession.config.pairingsList = pairs.map(p => p.toObject());

	const sessionConfig = new SessionConfig();
	sessionConfig.setPairingsList(pairs);

	const request = new UpdateConfigRequest();
	request.setSessionId(session.id);
	request.setConfig(sessionConfig);

	return { updatedSession, request };
}
