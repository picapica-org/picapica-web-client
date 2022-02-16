import { SessionServiceClient } from "../generated/v1/ServicesServiceClientPb";
import * as v1_services_pb from "../generated/v1/services_pb";
import { Item } from "../generated/v1/types_pb";
import type * as grpcWeb from "grpc-web";
import { v4 as uuidv4 } from "uuid";
import { delay, lazy } from "../util";
import { PicapicaSessionUrn, PicapicaUrn } from "./urn";

const CLIENT: SessionServiceClient = new SessionServiceClient("http://localhost:8080");
const mock = false;

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

	private async simulateNetwork(): Promise<void> {
		const DELAY_MIN = 500;
		const DELAY_MAX = 1000;

		await delay(DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN));

		const FAILURE_RATE = 0;

		if (Math.random() < FAILURE_RATE) {
			throw new Error("Network error");
		}
	}

	private async _getSessionRef(urn: string): Promise<v1_services_pb.Session> {
		const session = this._sessions.get(urn);
		if (session === undefined) {
			return Promise.reject("Invalid session id");
		}
		return Promise.resolve(session);
	}
	private async _getItemRef(sessionUrn: string, itemId: string): Promise<Item> {
		const sessionRef = await this._getSessionRef(sessionUrn);

		const item = sessionRef.getItemsList().find(i => i.getUrn() === itemId);
		if (item === undefined) {
			return Promise.reject("Invalid item id");
		}
		return item;
	}

	createSession = mockUnary<v1_services_pb.CreateSessionRequest, v1_services_pb.CreateSessionResponse>(async req => {
		await this.simulateNetwork();

		const urn = PicapicaUrn.stringify({ type: "session", sessionId: uuidv4() });
		const session = new v1_services_pb.Session();
		session.setUrn(urn);
		this._sessions.set(urn, session);

		return new v1_services_pb.CreateSessionResponse().setSessionUrn(urn);
	});
	getSession = mockUnary<v1_services_pb.GetSessionRequest, v1_services_pb.GetSessionResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		return new v1_services_pb.GetSessionResponse().setSession(sessionRef.clone());
	});
	deleteSession = mockUnary<v1_services_pb.DeleteSessionRequest, v1_services_pb.DeleteSessionResponse>(async req => {
		await this.simulateNetwork();

		const success = this._sessions.delete(req.getSessionUrn());
		if (!success) {
			return Promise.reject("Invalid session id");
		}
		return new v1_services_pb.DeleteSessionResponse();
	});

	getCollections = mockUnary<v1_services_pb.GetCollectionsRequest, v1_services_pb.GetCollectionsResponse>(
		async req => {
			await this.simulateNetwork();

			return new v1_services_pb.GetCollectionsResponse();
		}
	);

	getConfig = mockUnary<v1_services_pb.GetConfigRequest, v1_services_pb.GetConfigResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		return new v1_services_pb.GetConfigResponse().setConfig(sessionRef.getConfig()?.clone());
	});
	updateConfig = mockUnary<v1_services_pb.UpdateConfigRequest, v1_services_pb.UpdateConfigResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setConfig(req.getConfig()?.clone());
		return new v1_services_pb.UpdateConfigResponse();
	});
	deleteConfig = mockUnary<v1_services_pb.DeleteConfigRequest, v1_services_pb.DeleteConfigResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setConfig(undefined);
		return new v1_services_pb.DeleteConfigResponse();
	});

	createItem = mockUnary<v1_services_pb.CreateItemRequest, v1_services_pb.CreateItemResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());

		const raw = req.getRaw_asU8();

		// delay to simulate the upload (100 kB/s)
		await delay(raw.byteLength / 100);

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

		const itemUrn = PicapicaUrn.stringify({
			type: "item",
			sessionId: (PicapicaUrn.parse(sessionRef.getUrn()) as PicapicaSessionUrn).sessionId,
			itemId: randomHex(64),
		});

		const rawProps = new Item.Resource.RawProperties();
		rawProps.setSize(raw.length);
		rawProps.setChecksum(randomHex(32));

		const processedProps = new Item.Resource.ProcessedProperties();
		processedProps.setLength([...content].length);
		processedProps.setChecksum(randomHex(32));

		const resource = new Item.Resource();
		resource.setItemUrn(itemUrn);
		resource.setType(req.getType());
		resource.setRawProperties(rawProps);
		resource.setProcessedProperties(processedProps);

		const item = new Item();
		item.setUrn(itemUrn);
		item.setMeta(req.getMeta()?.clone());
		item.setResource(resource);

		sessionRef.addItems(item);
		this._content.set(resource, content);

		return new v1_services_pb.CreateItemResponse().setItemUrn(item.getUrn());
	});
	updateItem = mockUnary<v1_services_pb.UpdateItemRequest, v1_services_pb.UpdateItemResponse>(async req => {
		await this.simulateNetwork();

		const itemRef = await this._getItemRef(req.getSessionUrn(), req.getItemUrn());
		itemRef.setMeta(req.getMeta()?.clone());
		return new v1_services_pb.UpdateItemResponse();
	});
	getItem = mockUnary<v1_services_pb.GetItemRequest, v1_services_pb.GetItemResponse>(async req => {
		await this.simulateNetwork();

		const res = new v1_services_pb.GetItemResponse();
		for (const urn of req.getItemUrnList()) {
			const itemRef = await this._getItemRef(req.getSessionUrn(), urn);
			res.addItems(itemRef.clone());
		}

		return res;
	});
	deleteItem = mockUnary<v1_services_pb.DeleteItemRequest, v1_services_pb.DeleteItemResponse>(async req => {
		await this.simulateNetwork();

		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		const itemRef = await this._getItemRef(req.getSessionUrn(), req.getItemUrn());
		sessionRef.setItemsList(sessionRef.getItemsList().filter(i => i !== itemRef));

		return new v1_services_pb.DeleteItemResponse();
	});
}

function randomHex(length: number): string {
	return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}
