import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as v1_types_pb from '../v1/types_pb';
import * as v1_configs_pb from '../v1/configs_pb';


export class AlignRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): AlignRequest;

  getSourceElementsList(): Array<v1_types_pb.Element>;
  setSourceElementsList(value: Array<v1_types_pb.Element>): AlignRequest;
  clearSourceElementsList(): AlignRequest;
  addSourceElements(value?: v1_types_pb.Element, index?: number): v1_types_pb.Element;

  getTargetElementsList(): Array<v1_types_pb.Element>;
  setTargetElementsList(value: Array<v1_types_pb.Element>): AlignRequest;
  clearTargetElementsList(): AlignRequest;
  addTargetElements(value?: v1_types_pb.Element, index?: number): v1_types_pb.Element;

  getConfig(): v1_configs_pb.AlignmentConfig | undefined;
  setConfig(value?: v1_configs_pb.AlignmentConfig): AlignRequest;
  hasConfig(): boolean;
  clearConfig(): AlignRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AlignRequest): AlignRequest.AsObject;
  static serializeBinaryToWriter(message: AlignRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignRequest;
  static deserializeBinaryFromReader(message: AlignRequest, reader: jspb.BinaryReader): AlignRequest;
}

export namespace AlignRequest {
  export type AsObject = {
    uuid: string,
    sourceElementsList: Array<v1_types_pb.Element.AsObject>,
    targetElementsList: Array<v1_types_pb.Element.AsObject>,
    config?: v1_configs_pb.AlignmentConfig.AsObject,
  }
}

export class AlignResponse extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): AlignResponse;

  getSeedsList(): Array<v1_types_pb.Seed>;
  setSeedsList(value: Array<v1_types_pb.Seed>): AlignResponse;
  clearSeedsList(): AlignResponse;
  addSeeds(value?: v1_types_pb.Seed, index?: number): v1_types_pb.Seed;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AlignResponse): AlignResponse.AsObject;
  static serializeBinaryToWriter(message: AlignResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignResponse;
  static deserializeBinaryFromReader(message: AlignResponse, reader: jspb.BinaryReader): AlignResponse;
}

export namespace AlignResponse {
  export type AsObject = {
    uuid: string,
    seedsList: Array<v1_types_pb.Seed.AsObject>,
  }
}

export class DecomposeRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): DecomposeRequest;

  getText(): string;
  setText(value: string): DecomposeRequest;

  getConfig(): v1_configs_pb.DecompositionConfig | undefined;
  setConfig(value?: v1_configs_pb.DecompositionConfig): DecomposeRequest;
  hasConfig(): boolean;
  clearConfig(): DecomposeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecomposeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecomposeRequest): DecomposeRequest.AsObject;
  static serializeBinaryToWriter(message: DecomposeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecomposeRequest;
  static deserializeBinaryFromReader(message: DecomposeRequest, reader: jspb.BinaryReader): DecomposeRequest;
}

export namespace DecomposeRequest {
  export type AsObject = {
    uuid: string,
    text: string,
    config?: v1_configs_pb.DecompositionConfig.AsObject,
  }
}

export class DecomposeResponse extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): DecomposeResponse;

  getElementsList(): Array<v1_types_pb.Element>;
  setElementsList(value: Array<v1_types_pb.Element>): DecomposeResponse;
  clearElementsList(): DecomposeResponse;
  addElements(value?: v1_types_pb.Element, index?: number): v1_types_pb.Element;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecomposeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecomposeResponse): DecomposeResponse.AsObject;
  static serializeBinaryToWriter(message: DecomposeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecomposeResponse;
  static deserializeBinaryFromReader(message: DecomposeResponse, reader: jspb.BinaryReader): DecomposeResponse;
}

export namespace DecomposeResponse {
  export type AsObject = {
    uuid: string,
    elementsList: Array<v1_types_pb.Element.AsObject>,
  }
}

export class RetrieveRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): RetrieveRequest;

  getUrn(): string;
  setUrn(value: string): RetrieveRequest;

  getText(): string;
  setText(value: string): RetrieveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetrieveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RetrieveRequest): RetrieveRequest.AsObject;
  static serializeBinaryToWriter(message: RetrieveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetrieveRequest;
  static deserializeBinaryFromReader(message: RetrieveRequest, reader: jspb.BinaryReader): RetrieveRequest;
}

export namespace RetrieveRequest {
  export type AsObject = {
    uuid: string,
    urn: string,
    text: string,
  }
}

export class RetrieveResponse extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): RetrieveResponse;

  getUrn(): string;
  setUrn(value: string): RetrieveResponse;

  getText(): string;
  setText(value: string): RetrieveResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetrieveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RetrieveResponse): RetrieveResponse.AsObject;
  static serializeBinaryToWriter(message: RetrieveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetrieveResponse;
  static deserializeBinaryFromReader(message: RetrieveResponse, reader: jspb.BinaryReader): RetrieveResponse;
}

export namespace RetrieveResponse {
  export type AsObject = {
    uuid: string,
    urn: string,
    text: string,
  }
}

export class Session extends jspb.Message {
  getId(): string;
  setId(value: string): Session;

  getConfig(): v1_configs_pb.SessionConfig | undefined;
  setConfig(value?: v1_configs_pb.SessionConfig): Session;
  hasConfig(): boolean;
  clearConfig(): Session;

  getItemsList(): Array<v1_types_pb.Item>;
  setItemsList(value: Array<v1_types_pb.Item>): Session;
  clearItemsList(): Session;
  addItems(value?: v1_types_pb.Item, index?: number): v1_types_pb.Item;

  getResultsList(): Array<v1_types_pb.Result>;
  setResultsList(value: Array<v1_types_pb.Result>): Session;
  clearResultsList(): Session;
  addResults(value?: v1_types_pb.Result, index?: number): v1_types_pb.Result;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Session.AsObject;
  static toObject(includeInstance: boolean, msg: Session): Session.AsObject;
  static serializeBinaryToWriter(message: Session, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Session;
  static deserializeBinaryFromReader(message: Session, reader: jspb.BinaryReader): Session;
}

export namespace Session {
  export type AsObject = {
    id: string,
    config?: v1_configs_pb.SessionConfig.AsObject,
    itemsList: Array<v1_types_pb.Item.AsObject>,
    resultsList: Array<v1_types_pb.Result.AsObject>,
  }
}

export class CreateSessionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSessionRequest): CreateSessionRequest.AsObject;
  static serializeBinaryToWriter(message: CreateSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSessionRequest;
  static deserializeBinaryFromReader(message: CreateSessionRequest, reader: jspb.BinaryReader): CreateSessionRequest;
}

export namespace CreateSessionRequest {
  export type AsObject = {
  }
}

export class CreateSessionResponse extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): CreateSessionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSessionResponse): CreateSessionResponse.AsObject;
  static serializeBinaryToWriter(message: CreateSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSessionResponse;
  static deserializeBinaryFromReader(message: CreateSessionResponse, reader: jspb.BinaryReader): CreateSessionResponse;
}

export namespace CreateSessionResponse {
  export type AsObject = {
    sessionId: string,
  }
}

export class GetSessionRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetSessionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSessionRequest): GetSessionRequest.AsObject;
  static serializeBinaryToWriter(message: GetSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSessionRequest;
  static deserializeBinaryFromReader(message: GetSessionRequest, reader: jspb.BinaryReader): GetSessionRequest;
}

export namespace GetSessionRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class GetSessionResponse extends jspb.Message {
  getSession(): Session | undefined;
  setSession(value?: Session): GetSessionResponse;
  hasSession(): boolean;
  clearSession(): GetSessionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSessionResponse): GetSessionResponse.AsObject;
  static serializeBinaryToWriter(message: GetSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSessionResponse;
  static deserializeBinaryFromReader(message: GetSessionResponse, reader: jspb.BinaryReader): GetSessionResponse;
}

export namespace GetSessionResponse {
  export type AsObject = {
    session?: Session.AsObject,
  }
}

export class DeleteSessionRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): DeleteSessionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteSessionRequest): DeleteSessionRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteSessionRequest;
  static deserializeBinaryFromReader(message: DeleteSessionRequest, reader: jspb.BinaryReader): DeleteSessionRequest;
}

export namespace DeleteSessionRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class DeleteSessionResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteSessionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteSessionResponse): DeleteSessionResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteSessionResponse;
  static deserializeBinaryFromReader(message: DeleteSessionResponse, reader: jspb.BinaryReader): DeleteSessionResponse;
}

export namespace DeleteSessionResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class GetCollectionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCollectionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCollectionsRequest): GetCollectionsRequest.AsObject;
  static serializeBinaryToWriter(message: GetCollectionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCollectionsRequest;
  static deserializeBinaryFromReader(message: GetCollectionsRequest, reader: jspb.BinaryReader): GetCollectionsRequest;
}

export namespace GetCollectionsRequest {
  export type AsObject = {
  }
}

export class GetCollectionsResponse extends jspb.Message {
  getCollectionsList(): Array<v1_types_pb.Collection>;
  setCollectionsList(value: Array<v1_types_pb.Collection>): GetCollectionsResponse;
  clearCollectionsList(): GetCollectionsResponse;
  addCollections(value?: v1_types_pb.Collection, index?: number): v1_types_pb.Collection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCollectionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCollectionsResponse): GetCollectionsResponse.AsObject;
  static serializeBinaryToWriter(message: GetCollectionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCollectionsResponse;
  static deserializeBinaryFromReader(message: GetCollectionsResponse, reader: jspb.BinaryReader): GetCollectionsResponse;
}

export namespace GetCollectionsResponse {
  export type AsObject = {
    collectionsList: Array<v1_types_pb.Collection.AsObject>,
  }
}

export class GetConfigRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetConfigRequest): GetConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConfigRequest;
  static deserializeBinaryFromReader(message: GetConfigRequest, reader: jspb.BinaryReader): GetConfigRequest;
}

export namespace GetConfigRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class GetConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.SessionConfig | undefined;
  setConfig(value?: v1_configs_pb.SessionConfig): GetConfigResponse;
  hasConfig(): boolean;
  clearConfig(): GetConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetConfigResponse): GetConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConfigResponse;
  static deserializeBinaryFromReader(message: GetConfigResponse, reader: jspb.BinaryReader): GetConfigResponse;
}

export namespace GetConfigResponse {
  export type AsObject = {
    config?: v1_configs_pb.SessionConfig.AsObject,
  }
}

export class UpdateConfigRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): UpdateConfigRequest;

  getConfig(): v1_configs_pb.SessionConfig | undefined;
  setConfig(value?: v1_configs_pb.SessionConfig): UpdateConfigRequest;
  hasConfig(): boolean;
  clearConfig(): UpdateConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateConfigRequest): UpdateConfigRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateConfigRequest;
  static deserializeBinaryFromReader(message: UpdateConfigRequest, reader: jspb.BinaryReader): UpdateConfigRequest;
}

export namespace UpdateConfigRequest {
  export type AsObject = {
    sessionId: string,
    config?: v1_configs_pb.SessionConfig.AsObject,
  }
}

export class UpdateConfigResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): UpdateConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateConfigResponse): UpdateConfigResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateConfigResponse;
  static deserializeBinaryFromReader(message: UpdateConfigResponse, reader: jspb.BinaryReader): UpdateConfigResponse;
}

export namespace UpdateConfigResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class DeleteConfigRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): DeleteConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConfigRequest): DeleteConfigRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConfigRequest;
  static deserializeBinaryFromReader(message: DeleteConfigRequest, reader: jspb.BinaryReader): DeleteConfigRequest;
}

export namespace DeleteConfigRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class DeleteConfigResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConfigResponse): DeleteConfigResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConfigResponse;
  static deserializeBinaryFromReader(message: DeleteConfigResponse, reader: jspb.BinaryReader): DeleteConfigResponse;
}

export namespace DeleteConfigResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class CreateItemRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): CreateItemRequest;

  getMeta(): v1_types_pb.Item.Metadata | undefined;
  setMeta(value?: v1_types_pb.Item.Metadata): CreateItemRequest;
  hasMeta(): boolean;
  clearMeta(): CreateItemRequest;

  getType(): v1_types_pb.Item.Resource.Type;
  setType(value: v1_types_pb.Item.Resource.Type): CreateItemRequest;

  getRaw(): Uint8Array | string;
  getRaw_asU8(): Uint8Array;
  getRaw_asB64(): string;
  setRaw(value: Uint8Array | string): CreateItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateItemRequest): CreateItemRequest.AsObject;
  static serializeBinaryToWriter(message: CreateItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateItemRequest;
  static deserializeBinaryFromReader(message: CreateItemRequest, reader: jspb.BinaryReader): CreateItemRequest;
}

export namespace CreateItemRequest {
  export type AsObject = {
    sessionId: string,
    meta?: v1_types_pb.Item.Metadata.AsObject,
    type: v1_types_pb.Item.Resource.Type,
    raw: Uint8Array | string,
  }
}

export class CreateItemResponse extends jspb.Message {
  getId(): string;
  setId(value: string): CreateItemResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateItemResponse): CreateItemResponse.AsObject;
  static serializeBinaryToWriter(message: CreateItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateItemResponse;
  static deserializeBinaryFromReader(message: CreateItemResponse, reader: jspb.BinaryReader): CreateItemResponse;
}

export namespace CreateItemResponse {
  export type AsObject = {
    id: string,
  }
}

export class UpdateItemRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): UpdateItemRequest;

  getItemId(): string;
  setItemId(value: string): UpdateItemRequest;

  getMeta(): v1_types_pb.Item.Metadata | undefined;
  setMeta(value?: v1_types_pb.Item.Metadata): UpdateItemRequest;
  hasMeta(): boolean;
  clearMeta(): UpdateItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateItemRequest): UpdateItemRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateItemRequest;
  static deserializeBinaryFromReader(message: UpdateItemRequest, reader: jspb.BinaryReader): UpdateItemRequest;
}

export namespace UpdateItemRequest {
  export type AsObject = {
    sessionId: string,
    itemId: string,
    meta?: v1_types_pb.Item.Metadata.AsObject,
  }
}

export class UpdateItemResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): UpdateItemResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateItemResponse): UpdateItemResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateItemResponse;
  static deserializeBinaryFromReader(message: UpdateItemResponse, reader: jspb.BinaryReader): UpdateItemResponse;
}

export namespace UpdateItemResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class GetItemRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetItemRequest;

  getItemIdsList(): Array<string>;
  setItemIdsList(value: Array<string>): GetItemRequest;
  clearItemIdsList(): GetItemRequest;
  addItemIds(value: string, index?: number): GetItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemRequest): GetItemRequest.AsObject;
  static serializeBinaryToWriter(message: GetItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemRequest;
  static deserializeBinaryFromReader(message: GetItemRequest, reader: jspb.BinaryReader): GetItemRequest;
}

export namespace GetItemRequest {
  export type AsObject = {
    sessionId: string,
    itemIdsList: Array<string>,
  }
}

export class GetItemResponse extends jspb.Message {
  getItemsList(): Array<v1_types_pb.Item>;
  setItemsList(value: Array<v1_types_pb.Item>): GetItemResponse;
  clearItemsList(): GetItemResponse;
  addItems(value?: v1_types_pb.Item, index?: number): v1_types_pb.Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemResponse): GetItemResponse.AsObject;
  static serializeBinaryToWriter(message: GetItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemResponse;
  static deserializeBinaryFromReader(message: GetItemResponse, reader: jspb.BinaryReader): GetItemResponse;
}

export namespace GetItemResponse {
  export type AsObject = {
    itemsList: Array<v1_types_pb.Item.AsObject>,
  }
}

export class DeleteItemRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): DeleteItemRequest;

  getItemId(): string;
  setItemId(value: string): DeleteItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteItemRequest): DeleteItemRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteItemRequest;
  static deserializeBinaryFromReader(message: DeleteItemRequest, reader: jspb.BinaryReader): DeleteItemRequest;
}

export namespace DeleteItemRequest {
  export type AsObject = {
    sessionId: string,
    itemId: string,
  }
}

export class DeleteItemResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteItemResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteItemResponse): DeleteItemResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteItemResponse;
  static deserializeBinaryFromReader(message: DeleteItemResponse, reader: jspb.BinaryReader): DeleteItemResponse;
}

export namespace DeleteItemResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class ComputeResultsRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): ComputeResultsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeResultsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeResultsRequest): ComputeResultsRequest.AsObject;
  static serializeBinaryToWriter(message: ComputeResultsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeResultsRequest;
  static deserializeBinaryFromReader(message: ComputeResultsRequest, reader: jspb.BinaryReader): ComputeResultsRequest;
}

export namespace ComputeResultsRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class ComputeResultsResponse extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): ComputeResultsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeResultsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeResultsResponse): ComputeResultsResponse.AsObject;
  static serializeBinaryToWriter(message: ComputeResultsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeResultsResponse;
  static deserializeBinaryFromReader(message: ComputeResultsResponse, reader: jspb.BinaryReader): ComputeResultsResponse;
}

export namespace ComputeResultsResponse {
  export type AsObject = {
    status: boolean,
  }
}

export class GetResultsRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetResultsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultsRequest): GetResultsRequest.AsObject;
  static serializeBinaryToWriter(message: GetResultsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultsRequest;
  static deserializeBinaryFromReader(message: GetResultsRequest, reader: jspb.BinaryReader): GetResultsRequest;
}

export namespace GetResultsRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class GetResultsResponse extends jspb.Message {
  getResultsList(): Array<v1_types_pb.Result>;
  setResultsList(value: Array<v1_types_pb.Result>): GetResultsResponse;
  clearResultsList(): GetResultsResponse;
  addResults(value?: v1_types_pb.Result, index?: number): v1_types_pb.Result;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultsResponse): GetResultsResponse.AsObject;
  static serializeBinaryToWriter(message: GetResultsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultsResponse;
  static deserializeBinaryFromReader(message: GetResultsResponse, reader: jspb.BinaryReader): GetResultsResponse;
}

export namespace GetResultsResponse {
  export type AsObject = {
    resultsList: Array<v1_types_pb.Result.AsObject>,
  }
}

export class GetResultRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetResultRequest;

  getResultId(): string;
  setResultId(value: string): GetResultRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultRequest): GetResultRequest.AsObject;
  static serializeBinaryToWriter(message: GetResultRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultRequest;
  static deserializeBinaryFromReader(message: GetResultRequest, reader: jspb.BinaryReader): GetResultRequest;
}

export namespace GetResultRequest {
  export type AsObject = {
    sessionId: string,
    resultId: string,
  }
}

export class GetResultResponse extends jspb.Message {
  getResult(): v1_types_pb.Result | undefined;
  setResult(value?: v1_types_pb.Result): GetResultResponse;
  hasResult(): boolean;
  clearResult(): GetResultResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultResponse): GetResultResponse.AsObject;
  static serializeBinaryToWriter(message: GetResultResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultResponse;
  static deserializeBinaryFromReader(message: GetResultResponse, reader: jspb.BinaryReader): GetResultResponse;
}

export namespace GetResultResponse {
  export type AsObject = {
    result?: v1_types_pb.Result.AsObject,
  }
}

export class GetTextRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): GetTextRequest;

  getItemId(): string;
  setItemId(value: string): GetTextRequest;

  getSpan(): v1_types_pb.Span | undefined;
  setSpan(value?: v1_types_pb.Span): GetTextRequest;
  hasSpan(): boolean;
  clearSpan(): GetTextRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTextRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTextRequest): GetTextRequest.AsObject;
  static serializeBinaryToWriter(message: GetTextRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTextRequest;
  static deserializeBinaryFromReader(message: GetTextRequest, reader: jspb.BinaryReader): GetTextRequest;
}

export namespace GetTextRequest {
  export type AsObject = {
    sessionId: string,
    itemId: string,
    span?: v1_types_pb.Span.AsObject,
  }
}

export class GetTextResponse extends jspb.Message {
  getTextSpansList(): Array<GetTextResponse.TextSpan>;
  setTextSpansList(value: Array<GetTextResponse.TextSpan>): GetTextResponse;
  clearTextSpansList(): GetTextResponse;
  addTextSpans(value?: GetTextResponse.TextSpan, index?: number): GetTextResponse.TextSpan;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTextResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTextResponse): GetTextResponse.AsObject;
  static serializeBinaryToWriter(message: GetTextResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTextResponse;
  static deserializeBinaryFromReader(message: GetTextResponse, reader: jspb.BinaryReader): GetTextResponse;
}

export namespace GetTextResponse {
  export type AsObject = {
    textSpansList: Array<GetTextResponse.TextSpan.AsObject>,
  }

  export class TextSpan extends jspb.Message {
    getSpan(): v1_types_pb.Span | undefined;
    setSpan(value?: v1_types_pb.Span): TextSpan;
    hasSpan(): boolean;
    clearSpan(): TextSpan;

    getText(): string;
    setText(value: string): TextSpan;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextSpan.AsObject;
    static toObject(includeInstance: boolean, msg: TextSpan): TextSpan.AsObject;
    static serializeBinaryToWriter(message: TextSpan, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextSpan;
    static deserializeBinaryFromReader(message: TextSpan, reader: jspb.BinaryReader): TextSpan;
  }

  export namespace TextSpan {
    export type AsObject = {
      span?: v1_types_pb.Span.AsObject,
      text: string,
    }
  }

}

export class AlignPairRequest extends jspb.Message {
  getSource(): string;
  setSource(value: string): AlignPairRequest;

  getTarget(): string;
  setTarget(value: string): AlignPairRequest;

  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): AlignPairRequest;
  hasConfig(): boolean;
  clearConfig(): AlignPairRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignPairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AlignPairRequest): AlignPairRequest.AsObject;
  static serializeBinaryToWriter(message: AlignPairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignPairRequest;
  static deserializeBinaryFromReader(message: AlignPairRequest, reader: jspb.BinaryReader): AlignPairRequest;
}

export namespace AlignPairRequest {
  export type AsObject = {
    source: string,
    target: string,
    config?: v1_configs_pb.ApiConfig.AsObject,
  }
}

export class AlignPairResponse extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): AlignPairResponse;

  getSeedsList(): Array<v1_types_pb.Seed>;
  setSeedsList(value: Array<v1_types_pb.Seed>): AlignPairResponse;
  clearSeedsList(): AlignPairResponse;
  addSeeds(value?: v1_types_pb.Seed, index?: number): v1_types_pb.Seed;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignPairResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AlignPairResponse): AlignPairResponse.AsObject;
  static serializeBinaryToWriter(message: AlignPairResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignPairResponse;
  static deserializeBinaryFromReader(message: AlignPairResponse, reader: jspb.BinaryReader): AlignPairResponse;
}

export namespace AlignPairResponse {
  export type AsObject = {
    uuid: string,
    seedsList: Array<v1_types_pb.Seed.AsObject>,
  }
}

export class InfoResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): InfoResponse;

  getVersion(): string;
  setVersion(value: string): InfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InfoResponse): InfoResponse.AsObject;
  static serializeBinaryToWriter(message: InfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InfoResponse;
  static deserializeBinaryFromReader(message: InfoResponse, reader: jspb.BinaryReader): InfoResponse;
}

export namespace InfoResponse {
  export type AsObject = {
    message: string,
    version: string,
  }
}

export class ExtractRequest extends jspb.Message {
  getType(): v1_types_pb.Item.Resource.Type;
  setType(value: v1_types_pb.Item.Resource.Type): ExtractRequest;

  getRaw(): Uint8Array | string;
  getRaw_asU8(): Uint8Array;
  getRaw_asB64(): string;
  setRaw(value: Uint8Array | string): ExtractRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractRequest): ExtractRequest.AsObject;
  static serializeBinaryToWriter(message: ExtractRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractRequest;
  static deserializeBinaryFromReader(message: ExtractRequest, reader: jspb.BinaryReader): ExtractRequest;
}

export namespace ExtractRequest {
  export type AsObject = {
    type: v1_types_pb.Item.Resource.Type,
    raw: Uint8Array | string,
  }
}

export class ExtractResponse extends jspb.Message {
  getProperties(): v1_types_pb.Item.Resource.Properties | undefined;
  setProperties(value?: v1_types_pb.Item.Resource.Properties): ExtractResponse;
  hasProperties(): boolean;
  clearProperties(): ExtractResponse;

  getText(): string;
  setText(value: string): ExtractResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractResponse): ExtractResponse.AsObject;
  static serializeBinaryToWriter(message: ExtractResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractResponse;
  static deserializeBinaryFromReader(message: ExtractResponse, reader: jspb.BinaryReader): ExtractResponse;
}

export namespace ExtractResponse {
  export type AsObject = {
    properties?: v1_types_pb.Item.Resource.Properties.AsObject,
    text: string,
  }
}

