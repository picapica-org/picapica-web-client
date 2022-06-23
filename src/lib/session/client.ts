import { SessionServiceClient } from "../generated/v1/ServicesServiceClientPb";
import * as v1_services_pb from "../generated/v1/services_pb";
import { Item, ResourcePair } from "../generated/v1/types_pb";
import type * as grpcWeb from "grpc-web";
import { v4 as uuidv4 } from "uuid";
import { delay, lazy } from "../util";
import { PicapicaSessionUrn, PicapicaUrn } from "./urn";

// Options for testing the UI

/** Use a mock client that simulates a server locally. */
const mock = false;
/** The probability (number from 0 to 1) of a server call rejecting. */
const clientErrorRate = 0;
/** Added delay (randomly chosen between min and max) to each server call. */
const clientDelay: [min: number, max: number] = [0, 0];

export const getSessionClient = lazy(() => {
	let client = mock ? new MockClient() : new SessionServiceClient("http://localhost:8080");

	if (clientErrorRate > 0) client = fallibleClient(client, clientErrorRate);
	if (clientDelay[1] > 0) client = delayedClient(client, ...clientDelay);

	return client;
});

function delayedClient(client: SessionServiceClient, min: number, max: number): SessionServiceClient {
	return new Proxy(client, {
		get(target, p) {
			const fn = target[p as keyof SessionServiceClient];
			if (typeof fn !== "function") return fn;
			return async (...args: unknown[]) => {
				await delay(min + Math.random() * (max - min));
				return (fn as (...args: unknown[]) => unknown).call(target, ...args);
			};
		},
	});
}

function fallibleClient(client: SessionServiceClient, errorRate: number): SessionServiceClient {
	return new Proxy(client, {
		get(target, p) {
			const fn = target[p as keyof SessionServiceClient];
			if (typeof fn !== "function") return fn;
			return async (...args: unknown[]) => {
				if (Math.random() < errorRate) {
					throw new Error("Simulated network error");
				}
				return (fn as (...args: unknown[]) => unknown).call(target, ...args);
			};
		},
	});
}

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
		const urn = PicapicaUrn.stringify({ type: "session", sessionId: uuidv4() });
		const session = new v1_services_pb.Session();
		session.setUrn(urn);
		this._sessions.set(urn, session);

		return new v1_services_pb.CreateSessionResponse().setSessionUrn(urn);
	});
	getSession = mockUnary<v1_services_pb.GetSessionRequest, v1_services_pb.GetSessionResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		return new v1_services_pb.GetSessionResponse().setSession(sessionRef.clone());
	});
	deleteSession = mockUnary<v1_services_pb.DeleteSessionRequest, v1_services_pb.DeleteSessionResponse>(async req => {
		const success = this._sessions.delete(req.getSessionUrn());
		if (!success) {
			return Promise.reject("Invalid session id");
		}
		return new v1_services_pb.DeleteSessionResponse();
	});

	getCollections = mockUnary<v1_services_pb.GetCollectionsRequest, v1_services_pb.GetCollectionsResponse>(
		async req => {
			return new v1_services_pb.GetCollectionsResponse();
		}
	);

	getConfig = mockUnary<v1_services_pb.GetConfigRequest, v1_services_pb.GetConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		return new v1_services_pb.GetConfigResponse().setConfig(sessionRef.getConfig()?.clone());
	});
	updateConfig = mockUnary<v1_services_pb.UpdateConfigRequest, v1_services_pb.UpdateConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setConfig(req.getConfig()?.clone());
		return new v1_services_pb.UpdateConfigResponse();
	});
	deleteConfig = mockUnary<v1_services_pb.DeleteConfigRequest, v1_services_pb.DeleteConfigResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setConfig(undefined);
		return new v1_services_pb.DeleteConfigResponse();
	});

	getComparisonSet = mockUnary<v1_services_pb.GetComparisonSetRequest, v1_services_pb.GetComparisonSetResponse>(
		async req => {
			const sessionRef = await this._getSessionRef(req.getSessionUrn());
			return new v1_services_pb.GetComparisonSetResponse().setComparisonsList(
				sessionRef.getComparisonsList().map(p => p.clone())
			);
		}
	);
	updateComparisonSet = mockUnary<
		v1_services_pb.UpdateComparisonSetRequest,
		v1_services_pb.UpdateComparisonSetResponse
	>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setComparisonsList(req.getComparisonsList().map(p => p.clone()));
		return new v1_services_pb.UpdateComparisonSetResponse();
	});
	deleteComparisonSet = mockUnary<
		v1_services_pb.DeleteComparisonSetRequest,
		v1_services_pb.DeleteComparisonSetResponse
	>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		sessionRef.setComparisonsList([]);
		return new v1_services_pb.DeleteComparisonSetResponse();
	});

	createItem = mockUnary<v1_services_pb.CreateItemRequest, v1_services_pb.CreateItemResponse>(async req => {
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

		const textProps = new Item.Resource.TextProperties();
		textProps.setLength([...content].length);
		textProps.setChecksum(randomHex(32));

		const resource = new Item.Resource();
		resource.setItemUrn(itemUrn);
		resource.setType(req.getType());
		resource.setRawProperties(rawProps);
		resource.setTextProperties(textProps);

		const item = new Item();
		item.setUrn(itemUrn);
		item.setMeta(req.getMeta()?.clone());
		item.setResource(resource);

		sessionRef.addItems(item);
		this._content.set(resource, content);

		for (const other of req.getComparisonUrnsList()) {
			const p = new ResourcePair();
			p.setUrnA(itemUrn);
			p.setUrnB(other);
			sessionRef.addComparisons(p);
		}

		return new v1_services_pb.CreateItemResponse().setItemUrn(item.getUrn());
	});
	updateItem = mockUnary<v1_services_pb.UpdateItemRequest, v1_services_pb.UpdateItemResponse>(async req => {
		const itemRef = await this._getItemRef(req.getSessionUrn(), req.getItemUrn());
		itemRef.setMeta(req.getMeta()?.clone());
		return new v1_services_pb.UpdateItemResponse();
	});
	getItem = mockUnary<v1_services_pb.GetItemRequest, v1_services_pb.GetItemResponse>(async req => {
		const res = new v1_services_pb.GetItemResponse();
		for (const urn of req.getItemUrnList()) {
			const itemRef = await this._getItemRef(req.getSessionUrn(), urn);
			res.addItems(itemRef.clone());
		}

		return res;
	});
	deleteItem = mockUnary<v1_services_pb.DeleteItemRequest, v1_services_pb.DeleteItemResponse>(async req => {
		const sessionRef = await this._getSessionRef(req.getSessionUrn());
		const itemRef = await this._getItemRef(req.getSessionUrn(), req.getItemUrn());
		sessionRef.setItemsList(sessionRef.getItemsList().filter(i => i !== itemRef));

		return new v1_services_pb.DeleteItemResponse();
	});

	computeResults = mockUnary<v1_services_pb.ComputeResultsRequest, v1_services_pb.ComputeResultsResponse>(
		async req => {
			const sessionRef = await this._getSessionRef(req.getSessionUrn());
			sessionRef.setStatus(v1_services_pb.Session.ComputeStatus.STATUS_RUNNING);

			delay(10_000).then(() => sessionRef.setStatus(v1_services_pb.Session.ComputeStatus.STATUS_COMPLETED));

			return new v1_services_pb.ComputeResultsResponse();
		}
	);
}

function randomHex(length: number): string {
	return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}
