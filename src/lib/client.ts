import { SessionServiceClient } from "./generated/v1/ServicesServiceClientPb";
import * as v1_services_pb from "./generated/v1/services_pb";
import { Item } from "./generated/v1/types_pb";
import type * as grpcWeb from "grpc-web";
import { v4 as uuidv4 } from "uuid";
import { lazy } from "./util";

const CLIENT: SessionServiceClient = new SessionServiceClient("api.picapica.org");
const mock = true;

export const getSessionClient = lazy(() => {
	if (mock) {
		return new MockClient();
	}
	return CLIENT;
});

// Mock client

interface MockUnaryCall<Req, Res> {
	(request: Req, metadata: grpcWeb.Metadata | null): Promise<Res>;
	(
		request: Req,
		metadata: grpcWeb.Metadata | null,
		callback: (err: grpcWeb.Error, response: Res) => void
	): grpcWeb.ClientReadableStream<Res>;
}
function mockUnary<Req, Res>(
	call: (request: Req, metadata: grpcWeb.Metadata | null) => Promise<Res>
): MockUnaryCall<Req, Res> {
	return function getSession(
		request: Req,
		metadata: grpcWeb.Metadata | null,
		callback?: (err: grpcWeb.Error, response: Res) => void
	): any {
		if (callback !== undefined) {
			throw new Error("Streaming calls are not supported.");
		}
		return call(request, metadata);
	};
}

class MockClient extends SessionServiceClient {
	private _sessions = new Map<string, v1_services_pb.Session>();
	private _content = new WeakMap<Item.Resource, string>();

	constructor() {
		super("foo.test");
	}

	private _getSessionRef(id: string): Promise<v1_services_pb.Session> {
		const session = this._sessions.get(id);
		if (session === undefined) {
			return Promise.reject("Invalid session id");
		}
		return Promise.resolve(session);
	}
	private async _getItemRef(sessionId: string, itemId: string): Promise<Item> {
		const sessionRef = await this._getSessionRef(sessionId);

		const item = sessionRef.getItemsList().find(i => i.getUrn() === itemId);
		if (item === undefined) {
			return Promise.reject("Invalid item id");
		}
		return item;
	}

	createSession = mockUnary<v1_services_pb.CreateSessionRequest, v1_services_pb.CreateSessionResponse>(async req => {
		const id = uuidv4();
		const session = new v1_services_pb.Session();
		session.setId(id);
		this._sessions.set(id, session);

		return new v1_services_pb.CreateSessionResponse().setSessionId(id);
	});
	getSession = mockUnary<v1_services_pb.GetSessionRequest, v1_services_pb.GetSessionResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());
		return new v1_services_pb.GetSessionResponse().setSession(sessionRef.clone());
	});
	deleteSession = mockUnary<v1_services_pb.DeleteSessionRequest, v1_services_pb.DeleteSessionResponse>(async req => {
		const success = this._sessions.delete(req.getSessionId());
		return new v1_services_pb.DeleteSessionResponse().setSuccess(success);
	});

	getCollections = mockUnary<v1_services_pb.GetCollectionsRequest, v1_services_pb.GetCollectionsResponse>(
		async req => {
			return new v1_services_pb.GetCollectionsResponse();
		}
	);

	getConfig = mockUnary<v1_services_pb.GetConfigRequest, v1_services_pb.GetConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());
		return new v1_services_pb.GetConfigResponse().setConfig(sessionRef.getConfig()?.clone());
	});
	updateConfig = mockUnary<v1_services_pb.UpdateConfigRequest, v1_services_pb.UpdateConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());
		sessionRef.setConfig(req.getConfig()?.clone());
		return new v1_services_pb.UpdateConfigResponse().setSuccess(true);
	});
	deleteConfig = mockUnary<v1_services_pb.DeleteConfigRequest, v1_services_pb.DeleteConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());
		sessionRef.setConfig(undefined);
		return new v1_services_pb.DeleteConfigResponse().setSuccess(true);
	});

	createItem = mockUnary<v1_services_pb.CreateItemRequest, v1_services_pb.CreateItemResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());

		const raw = req.getRaw_asU8();
		let content: string;
		switch (req.getType()) {
			case Item.Resource.Type.TYPE_UNSPECIFIED:
				throw new Error("Unspecified resource type");
			case Item.Resource.Type.TYPE_TEXT:
				content = new TextDecoder("utf-8").decode(raw);
				break;
			case Item.Resource.Type.TYPE_URL:
				content = "Text from website: " + new TextDecoder("utf-8").decode(raw);
				break;
			case Item.Resource.Type.TYPE_FILE:
				content = "Some file";
				break;
			default:
				throw new Error("Invalid resource type");
		}

		const props = new Item.Resource.Properties();
		props.setSize(raw.length);
		props.setLength([...content].length);
		props.setRawMd5("fake");
		props.setContentMd5("fake");

		const resource = new Item.Resource();
		resource.setId(uuidv4());
		resource.setType(req.getType());
		resource.setProperties(props);

		const item = new Item();
		item.setUrn("urn:item:" + uuidv4());
		item.setMeta(req.getMeta()?.clone());
		item.setResource(resource);

		sessionRef.addItems(item);
		this._content.set(resource, content);

		return new v1_services_pb.CreateItemResponse().setId(item.getUrn());
	});
	updateItem = mockUnary<v1_services_pb.UpdateItemRequest, v1_services_pb.UpdateItemResponse>(async req => {
		const itemRef = await this._getItemRef(req.getSessionId(), req.getItemId());
		itemRef.setMeta(req.getMeta()?.clone());
		return new v1_services_pb.UpdateItemResponse().setSuccess(true);
	});
	getItem = mockUnary<v1_services_pb.GetItemRequest, v1_services_pb.GetItemResponse>(async req => {
		const res = new v1_services_pb.GetItemResponse();
		for (const urn of req.getItemIdsList()) {
			const itemRef = await this._getItemRef(req.getSessionId(), urn);
			res.addItems(itemRef.clone());
		}

		return res;
	});
	deleteItem = mockUnary<v1_services_pb.DeleteItemRequest, v1_services_pb.DeleteItemResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionId());
		const itemRef = await this._getItemRef(req.getSessionId(), req.getItemId());
		sessionRef.setItemsList(sessionRef.getItemsList().filter(i => i !== itemRef));

		return new v1_services_pb.DeleteItemResponse().setSuccess(true);
	});
}
