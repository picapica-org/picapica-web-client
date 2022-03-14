import { DeleteItemRequest, Session, UpdateComparisonSetRequest, UpdateItemRequest } from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import { DeepReadonly } from "../util";
import { AnalysisConfig } from "./analysis-config";
import { SessionMutator } from "./mutator";
import { cloneSession } from "./util";

export interface ActionResult<Req> {
	mutate: SessionMutator;
	request: Req;
}

export function deleteItemAction(
	session: DeepReadonly<Session.AsObject>,
	itemUrn: string
): ActionResult<DeleteItemRequest> {
	const request = new DeleteItemRequest();
	request.setSessionUrn(session.urn);
	request.setItemUrn(itemUrn);

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
	request.setSessionUrn(session.urn);
	request.setItemUrn(itemUrn);
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

export function updateComparisonSetAction(
	session: DeepReadonly<Session.AsObject>,
	analysisConfig: AnalysisConfig
): ActionResult<UpdateComparisonSetRequest> {
	const pairs = analysisConfig.getResourcePairs();
	const pairingsList = pairs.map(p => p.toObject());

	const request = new UpdateComparisonSetRequest();
	request.setSessionUrn(session.urn);
	request.setComparisonsList(pairs);

	return {
		request,
		mutate(oldSession) {
			const session = cloneSession(oldSession);
			session.comparisonsList = pairingsList;
			return session;
		},
	};
}
