import { SessionConfig } from "../generated/v1/configs_pb";
import { DeleteItemRequest, Session, UpdateConfigRequest, UpdateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { UseSessionArray } from "../use-session";
import { DeepReadonly } from "../util";
import { AnalysisConfig } from "./analysis-config";
import { cloneSession } from "./util";

export interface ActionResult<Req> {
	mutate: Parameters<UseSessionArray[1]>[1];
	request: Req;
}

export function deleteItemAction(
	session: DeepReadonly<Session.AsObject>,
	itemUrn: string
): ActionResult<DeleteItemRequest> {
	const request = new DeleteItemRequest();
	request.setSessionId(session.id);
	request.setItemId(itemUrn);

	return {
		request,
		mutate(oldSession) {
			const session = cloneSession(oldSession);
			session.itemsList = session.itemsList.filter(item => item.urn !== itemUrn);
			return session;
		},
	};
}

export function updateItemAction(
	session: DeepReadonly<Session.AsObject>,
	itemUrn: string,
	meta: Item.Metadata
): ActionResult<UpdateItemRequest> {
	const metaObject = meta.toObject();

	const request = new UpdateItemRequest();
	request.setSessionId(session.id);
	request.setItemId(itemUrn);
	request.setMeta(meta);

	return {
		request,
		mutate(oldSession) {
			const session = cloneSession(oldSession);
			const item = session.itemsList.find(item => item.urn === itemUrn);
			if (item) {
				item.meta = metaObject;
			}
			return session;
		},
	};
}

export function updateConfigAction(
	session: DeepReadonly<Session.AsObject>,
	analysisConfig: AnalysisConfig
): ActionResult<UpdateConfigRequest> {
	const pairs = analysisConfig.getResourcePairs();
	const pairingsList = pairs.map(p => p.toObject());

	const sessionConfig = new SessionConfig();
	sessionConfig.setPairingsList(pairs);

	const request = new UpdateConfigRequest();
	request.setSessionId(session.id);
	request.setConfig(sessionConfig);

	return {
		request,
		mutate(oldSession) {
			const session = cloneSession(oldSession);
			session.config ??= { pairingsList: [] };
			session.config.pairingsList = pairingsList;
			return session;
		},
	};
}
