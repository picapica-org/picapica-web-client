import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as v1_types_pb from '../v1/types_pb';
import * as v1_configs_pb from '../v1/configs_pb';


export class AlignRequest extends jspb.Message {
  getSourceText(): string;
  setSourceText(value: string): AlignRequest;

  getTargetText(): string;
  setTargetText(value: string): AlignRequest;

  getAlignmentConfig(): v1_configs_pb.AlignmentConfig | undefined;
  setAlignmentConfig(value?: v1_configs_pb.AlignmentConfig): AlignRequest;
  hasAlignmentConfig(): boolean;
  clearAlignmentConfig(): AlignRequest;

  getDecompositionConfig(): v1_configs_pb.DecompositionConfig | undefined;
  setDecompositionConfig(value?: v1_configs_pb.DecompositionConfig): AlignRequest;
  hasDecompositionConfig(): boolean;
  clearDecompositionConfig(): AlignRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AlignRequest): AlignRequest.AsObject;
  static serializeBinaryToWriter(message: AlignRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignRequest;
  static deserializeBinaryFromReader(message: AlignRequest, reader: jspb.BinaryReader): AlignRequest;
}

export namespace AlignRequest {
  export type AsObject = {
    sourceText: string,
    targetText: string,
    alignmentConfig?: v1_configs_pb.AlignmentConfig.AsObject,
    decompositionConfig?: v1_configs_pb.DecompositionConfig.AsObject,
  }
}

export class AlignResponse extends jspb.Message {
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
    seedsList: Array<v1_types_pb.Seed.AsObject>,
  }
}

export class GetDefaultAlignmentConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultAlignmentConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultAlignmentConfigRequest): GetDefaultAlignmentConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetDefaultAlignmentConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultAlignmentConfigRequest;
  static deserializeBinaryFromReader(message: GetDefaultAlignmentConfigRequest, reader: jspb.BinaryReader): GetDefaultAlignmentConfigRequest;
}

export namespace GetDefaultAlignmentConfigRequest {
  export type AsObject = {
  }
}

export class GetDefaultAlignmentConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.AlignmentConfig | undefined;
  setConfig(value?: v1_configs_pb.AlignmentConfig): GetDefaultAlignmentConfigResponse;
  hasConfig(): boolean;
  clearConfig(): GetDefaultAlignmentConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultAlignmentConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultAlignmentConfigResponse): GetDefaultAlignmentConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetDefaultAlignmentConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultAlignmentConfigResponse;
  static deserializeBinaryFromReader(message: GetDefaultAlignmentConfigResponse, reader: jspb.BinaryReader): GetDefaultAlignmentConfigResponse;
}

export namespace GetDefaultAlignmentConfigResponse {
  export type AsObject = {
    config?: v1_configs_pb.AlignmentConfig.AsObject,
  }
}

export class DecomposeRequest extends jspb.Message {
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
    text: string,
    config?: v1_configs_pb.DecompositionConfig.AsObject,
  }
}

export class DecomposeResponse extends jspb.Message {
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
    elementsList: Array<v1_types_pb.Element.AsObject>,
  }
}

export class GetDefaultDecompositionConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultDecompositionConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultDecompositionConfigRequest): GetDefaultDecompositionConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetDefaultDecompositionConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultDecompositionConfigRequest;
  static deserializeBinaryFromReader(message: GetDefaultDecompositionConfigRequest, reader: jspb.BinaryReader): GetDefaultDecompositionConfigRequest;
}

export namespace GetDefaultDecompositionConfigRequest {
  export type AsObject = {
  }
}

export class GetDefaultDecompositionConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.DecompositionConfig | undefined;
  setConfig(value?: v1_configs_pb.DecompositionConfig): GetDefaultDecompositionConfigResponse;
  hasConfig(): boolean;
  clearConfig(): GetDefaultDecompositionConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultDecompositionConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultDecompositionConfigResponse): GetDefaultDecompositionConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetDefaultDecompositionConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultDecompositionConfigResponse;
  static deserializeBinaryFromReader(message: GetDefaultDecompositionConfigResponse, reader: jspb.BinaryReader): GetDefaultDecompositionConfigResponse;
}

export namespace GetDefaultDecompositionConfigResponse {
  export type AsObject = {
    config?: v1_configs_pb.DecompositionConfig.AsObject,
  }
}

export class RetrieveRequest extends jspb.Message {
  getCollectionUrn(): string;
  setCollectionUrn(value: string): RetrieveRequest;

  getText(): string;
  setText(value: string): RetrieveRequest;

  getConfig(): v1_configs_pb.RetrievalConfig | undefined;
  setConfig(value?: v1_configs_pb.RetrievalConfig): RetrieveRequest;
  hasConfig(): boolean;
  clearConfig(): RetrieveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetrieveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RetrieveRequest): RetrieveRequest.AsObject;
  static serializeBinaryToWriter(message: RetrieveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetrieveRequest;
  static deserializeBinaryFromReader(message: RetrieveRequest, reader: jspb.BinaryReader): RetrieveRequest;
}

export namespace RetrieveRequest {
  export type AsObject = {
    collectionUrn: string,
    text: string,
    config?: v1_configs_pb.RetrievalConfig.AsObject,
  }
}

export class RetrieveResponse extends jspb.Message {
  getHitsList(): Array<RetrieveResponse.Document>;
  setHitsList(value: Array<RetrieveResponse.Document>): RetrieveResponse;
  clearHitsList(): RetrieveResponse;
  addHits(value?: RetrieveResponse.Document, index?: number): RetrieveResponse.Document;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetrieveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RetrieveResponse): RetrieveResponse.AsObject;
  static serializeBinaryToWriter(message: RetrieveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetrieveResponse;
  static deserializeBinaryFromReader(message: RetrieveResponse, reader: jspb.BinaryReader): RetrieveResponse;
}

export namespace RetrieveResponse {
  export type AsObject = {
    hitsList: Array<RetrieveResponse.Document.AsObject>,
  }

  export class Document extends jspb.Message {
    getDocumentUrn(): string;
    setDocumentUrn(value: string): Document;

    getText(): string;
    setText(value: string): Document;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Document.AsObject;
    static toObject(includeInstance: boolean, msg: Document): Document.AsObject;
    static serializeBinaryToWriter(message: Document, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Document;
    static deserializeBinaryFromReader(message: Document, reader: jspb.BinaryReader): Document;
  }

  export namespace Document {
    export type AsObject = {
      documentUrn: string,
      text: string,
    }
  }

}

export class GetDefaultRetrievalConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultRetrievalConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultRetrievalConfigRequest): GetDefaultRetrievalConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetDefaultRetrievalConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultRetrievalConfigRequest;
  static deserializeBinaryFromReader(message: GetDefaultRetrievalConfigRequest, reader: jspb.BinaryReader): GetDefaultRetrievalConfigRequest;
}

export namespace GetDefaultRetrievalConfigRequest {
  export type AsObject = {
  }
}

export class GetDefaultRetrievalConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.RetrievalConfig | undefined;
  setConfig(value?: v1_configs_pb.RetrievalConfig): GetDefaultRetrievalConfigResponse;
  hasConfig(): boolean;
  clearConfig(): GetDefaultRetrievalConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultRetrievalConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultRetrievalConfigResponse): GetDefaultRetrievalConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetDefaultRetrievalConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultRetrievalConfigResponse;
  static deserializeBinaryFromReader(message: GetDefaultRetrievalConfigResponse, reader: jspb.BinaryReader): GetDefaultRetrievalConfigResponse;
}

export namespace GetDefaultRetrievalConfigResponse {
  export type AsObject = {
    config?: v1_configs_pb.RetrievalConfig.AsObject,
  }
}

export class Session extends jspb.Message {
  getUrn(): string;
  setUrn(value: string): Session;

  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): Session;
  hasConfig(): boolean;
  clearConfig(): Session;

  getItemsList(): Array<v1_types_pb.Item>;
  setItemsList(value: Array<v1_types_pb.Item>): Session;
  clearItemsList(): Session;
  addItems(value?: v1_types_pb.Item, index?: number): v1_types_pb.Item;

  getComparisonsList(): Array<v1_types_pb.ResourcePair>;
  setComparisonsList(value: Array<v1_types_pb.ResourcePair>): Session;
  clearComparisonsList(): Session;
  addComparisons(value?: v1_types_pb.ResourcePair, index?: number): v1_types_pb.ResourcePair;

  getResultsList(): Array<v1_types_pb.Result>;
  setResultsList(value: Array<v1_types_pb.Result>): Session;
  clearResultsList(): Session;
  addResults(value?: v1_types_pb.Result, index?: number): v1_types_pb.Result;

  getStatus(): Session.ComputeStatus;
  setStatus(value: Session.ComputeStatus): Session;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Session.AsObject;
  static toObject(includeInstance: boolean, msg: Session): Session.AsObject;
  static serializeBinaryToWriter(message: Session, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Session;
  static deserializeBinaryFromReader(message: Session, reader: jspb.BinaryReader): Session;
}

export namespace Session {
  export type AsObject = {
    urn: string,
    config?: v1_configs_pb.ApiConfig.AsObject,
    itemsList: Array<v1_types_pb.Item.AsObject>,
    comparisonsList: Array<v1_types_pb.ResourcePair.AsObject>,
    resultsList: Array<v1_types_pb.Result.AsObject>,
    status: Session.ComputeStatus,
  }

  export enum ComputeStatus { 
    STATUS_UNDEFINED = 0,
    STATUS_RUNNING = 1,
    STATUS_COMPLETED = 2,
    STATUS_FAILED = 3,
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
  getSessionUrn(): string;
  setSessionUrn(value: string): CreateSessionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSessionResponse): CreateSessionResponse.AsObject;
  static serializeBinaryToWriter(message: CreateSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSessionResponse;
  static deserializeBinaryFromReader(message: CreateSessionResponse, reader: jspb.BinaryReader): CreateSessionResponse;
}

export namespace CreateSessionResponse {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class GetSessionRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetSessionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSessionRequest): GetSessionRequest.AsObject;
  static serializeBinaryToWriter(message: GetSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSessionRequest;
  static deserializeBinaryFromReader(message: GetSessionRequest, reader: jspb.BinaryReader): GetSessionRequest;
}

export namespace GetSessionRequest {
  export type AsObject = {
    sessionUrn: string,
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
  getSessionUrn(): string;
  setSessionUrn(value: string): DeleteSessionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteSessionRequest): DeleteSessionRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteSessionRequest;
  static deserializeBinaryFromReader(message: DeleteSessionRequest, reader: jspb.BinaryReader): DeleteSessionRequest;
}

export namespace DeleteSessionRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class DeleteSessionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteSessionResponse): DeleteSessionResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteSessionResponse;
  static deserializeBinaryFromReader(message: DeleteSessionResponse, reader: jspb.BinaryReader): DeleteSessionResponse;
}

export namespace DeleteSessionResponse {
  export type AsObject = {
  }
}

export class GetComputeStatusRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetComputeStatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetComputeStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetComputeStatusRequest): GetComputeStatusRequest.AsObject;
  static serializeBinaryToWriter(message: GetComputeStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetComputeStatusRequest;
  static deserializeBinaryFromReader(message: GetComputeStatusRequest, reader: jspb.BinaryReader): GetComputeStatusRequest;
}

export namespace GetComputeStatusRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class GetComputeStatusResponse extends jspb.Message {
  getStatus(): Session.ComputeStatus;
  setStatus(value: Session.ComputeStatus): GetComputeStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetComputeStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetComputeStatusResponse): GetComputeStatusResponse.AsObject;
  static serializeBinaryToWriter(message: GetComputeStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetComputeStatusResponse;
  static deserializeBinaryFromReader(message: GetComputeStatusResponse, reader: jspb.BinaryReader): GetComputeStatusResponse;
}

export namespace GetComputeStatusResponse {
  export type AsObject = {
    status: Session.ComputeStatus,
  }
}

export class GetCollectionsRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetCollectionsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCollectionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCollectionsRequest): GetCollectionsRequest.AsObject;
  static serializeBinaryToWriter(message: GetCollectionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCollectionsRequest;
  static deserializeBinaryFromReader(message: GetCollectionsRequest, reader: jspb.BinaryReader): GetCollectionsRequest;
}

export namespace GetCollectionsRequest {
  export type AsObject = {
    sessionUrn: string,
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
  getSessionUrn(): string;
  setSessionUrn(value: string): GetConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetConfigRequest): GetConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConfigRequest;
  static deserializeBinaryFromReader(message: GetConfigRequest, reader: jspb.BinaryReader): GetConfigRequest;
}

export namespace GetConfigRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class GetConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): GetConfigResponse;
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
    config?: v1_configs_pb.ApiConfig.AsObject,
  }
}

export class UpdateConfigRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): UpdateConfigRequest;

  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): UpdateConfigRequest;
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
    sessionUrn: string,
    config?: v1_configs_pb.ApiConfig.AsObject,
  }
}

export class UpdateConfigResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateConfigResponse): UpdateConfigResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateConfigResponse;
  static deserializeBinaryFromReader(message: UpdateConfigResponse, reader: jspb.BinaryReader): UpdateConfigResponse;
}

export namespace UpdateConfigResponse {
  export type AsObject = {
  }
}

export class DeleteConfigRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): DeleteConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConfigRequest): DeleteConfigRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConfigRequest;
  static deserializeBinaryFromReader(message: DeleteConfigRequest, reader: jspb.BinaryReader): DeleteConfigRequest;
}

export namespace DeleteConfigRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class DeleteConfigResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConfigResponse): DeleteConfigResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConfigResponse;
  static deserializeBinaryFromReader(message: DeleteConfigResponse, reader: jspb.BinaryReader): DeleteConfigResponse;
}

export namespace DeleteConfigResponse {
  export type AsObject = {
  }
}

export class CreateItemRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): CreateItemRequest;

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

  getComparisonUrnsList(): Array<string>;
  setComparisonUrnsList(value: Array<string>): CreateItemRequest;
  clearComparisonUrnsList(): CreateItemRequest;
  addComparisonUrns(value: string, index?: number): CreateItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateItemRequest): CreateItemRequest.AsObject;
  static serializeBinaryToWriter(message: CreateItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateItemRequest;
  static deserializeBinaryFromReader(message: CreateItemRequest, reader: jspb.BinaryReader): CreateItemRequest;
}

export namespace CreateItemRequest {
  export type AsObject = {
    sessionUrn: string,
    meta?: v1_types_pb.Item.Metadata.AsObject,
    type: v1_types_pb.Item.Resource.Type,
    raw: Uint8Array | string,
    comparisonUrnsList: Array<string>,
  }
}

export class CreateItemResponse extends jspb.Message {
  getItemUrn(): string;
  setItemUrn(value: string): CreateItemResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateItemResponse): CreateItemResponse.AsObject;
  static serializeBinaryToWriter(message: CreateItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateItemResponse;
  static deserializeBinaryFromReader(message: CreateItemResponse, reader: jspb.BinaryReader): CreateItemResponse;
}

export namespace CreateItemResponse {
  export type AsObject = {
    itemUrn: string,
  }
}

export class UpdateItemRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): UpdateItemRequest;

  getItemUrn(): string;
  setItemUrn(value: string): UpdateItemRequest;

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
    sessionUrn: string,
    itemUrn: string,
    meta?: v1_types_pb.Item.Metadata.AsObject,
  }
}

export class UpdateItemResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateItemResponse): UpdateItemResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateItemResponse;
  static deserializeBinaryFromReader(message: UpdateItemResponse, reader: jspb.BinaryReader): UpdateItemResponse;
}

export namespace UpdateItemResponse {
  export type AsObject = {
  }
}

export class GetItemRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetItemRequest;

  getItemUrnList(): Array<string>;
  setItemUrnList(value: Array<string>): GetItemRequest;
  clearItemUrnList(): GetItemRequest;
  addItemUrn(value: string, index?: number): GetItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemRequest): GetItemRequest.AsObject;
  static serializeBinaryToWriter(message: GetItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemRequest;
  static deserializeBinaryFromReader(message: GetItemRequest, reader: jspb.BinaryReader): GetItemRequest;
}

export namespace GetItemRequest {
  export type AsObject = {
    sessionUrn: string,
    itemUrnList: Array<string>,
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

export class GetItemStatusRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetItemStatusRequest;

  getItemUrn(): string;
  setItemUrn(value: string): GetItemStatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemStatusRequest): GetItemStatusRequest.AsObject;
  static serializeBinaryToWriter(message: GetItemStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemStatusRequest;
  static deserializeBinaryFromReader(message: GetItemStatusRequest, reader: jspb.BinaryReader): GetItemStatusRequest;
}

export namespace GetItemStatusRequest {
  export type AsObject = {
    sessionUrn: string,
    itemUrn: string,
  }
}

export class GetItemStatusResponse extends jspb.Message {
  getStatus(): v1_types_pb.Item.Resource.ProcessingStatus;
  setStatus(value: v1_types_pb.Item.Resource.ProcessingStatus): GetItemStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemStatusResponse): GetItemStatusResponse.AsObject;
  static serializeBinaryToWriter(message: GetItemStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemStatusResponse;
  static deserializeBinaryFromReader(message: GetItemStatusResponse, reader: jspb.BinaryReader): GetItemStatusResponse;
}

export namespace GetItemStatusResponse {
  export type AsObject = {
    status: v1_types_pb.Item.Resource.ProcessingStatus,
  }
}

export class DeleteItemRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): DeleteItemRequest;

  getItemUrn(): string;
  setItemUrn(value: string): DeleteItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteItemRequest): DeleteItemRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteItemRequest;
  static deserializeBinaryFromReader(message: DeleteItemRequest, reader: jspb.BinaryReader): DeleteItemRequest;
}

export namespace DeleteItemRequest {
  export type AsObject = {
    sessionUrn: string,
    itemUrn: string,
  }
}

export class DeleteItemResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteItemResponse): DeleteItemResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteItemResponse;
  static deserializeBinaryFromReader(message: DeleteItemResponse, reader: jspb.BinaryReader): DeleteItemResponse;
}

export namespace DeleteItemResponse {
  export type AsObject = {
  }
}

export class UpdateComparisonSetRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): UpdateComparisonSetRequest;

  getComparisonsList(): Array<v1_types_pb.ResourcePair>;
  setComparisonsList(value: Array<v1_types_pb.ResourcePair>): UpdateComparisonSetRequest;
  clearComparisonsList(): UpdateComparisonSetRequest;
  addComparisons(value?: v1_types_pb.ResourcePair, index?: number): v1_types_pb.ResourcePair;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateComparisonSetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateComparisonSetRequest): UpdateComparisonSetRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateComparisonSetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateComparisonSetRequest;
  static deserializeBinaryFromReader(message: UpdateComparisonSetRequest, reader: jspb.BinaryReader): UpdateComparisonSetRequest;
}

export namespace UpdateComparisonSetRequest {
  export type AsObject = {
    sessionUrn: string,
    comparisonsList: Array<v1_types_pb.ResourcePair.AsObject>,
  }
}

export class UpdateComparisonSetResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateComparisonSetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateComparisonSetResponse): UpdateComparisonSetResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateComparisonSetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateComparisonSetResponse;
  static deserializeBinaryFromReader(message: UpdateComparisonSetResponse, reader: jspb.BinaryReader): UpdateComparisonSetResponse;
}

export namespace UpdateComparisonSetResponse {
  export type AsObject = {
  }
}

export class GetComparisonSetRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetComparisonSetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetComparisonSetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetComparisonSetRequest): GetComparisonSetRequest.AsObject;
  static serializeBinaryToWriter(message: GetComparisonSetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetComparisonSetRequest;
  static deserializeBinaryFromReader(message: GetComparisonSetRequest, reader: jspb.BinaryReader): GetComparisonSetRequest;
}

export namespace GetComparisonSetRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class GetComparisonSetResponse extends jspb.Message {
  getComparisonsList(): Array<v1_types_pb.ResourcePair>;
  setComparisonsList(value: Array<v1_types_pb.ResourcePair>): GetComparisonSetResponse;
  clearComparisonsList(): GetComparisonSetResponse;
  addComparisons(value?: v1_types_pb.ResourcePair, index?: number): v1_types_pb.ResourcePair;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetComparisonSetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetComparisonSetResponse): GetComparisonSetResponse.AsObject;
  static serializeBinaryToWriter(message: GetComparisonSetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetComparisonSetResponse;
  static deserializeBinaryFromReader(message: GetComparisonSetResponse, reader: jspb.BinaryReader): GetComparisonSetResponse;
}

export namespace GetComparisonSetResponse {
  export type AsObject = {
    comparisonsList: Array<v1_types_pb.ResourcePair.AsObject>,
  }
}

export class DeleteComparisonSetRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): DeleteComparisonSetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteComparisonSetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteComparisonSetRequest): DeleteComparisonSetRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteComparisonSetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteComparisonSetRequest;
  static deserializeBinaryFromReader(message: DeleteComparisonSetRequest, reader: jspb.BinaryReader): DeleteComparisonSetRequest;
}

export namespace DeleteComparisonSetRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class DeleteComparisonSetResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteComparisonSetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteComparisonSetResponse): DeleteComparisonSetResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteComparisonSetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteComparisonSetResponse;
  static deserializeBinaryFromReader(message: DeleteComparisonSetResponse, reader: jspb.BinaryReader): DeleteComparisonSetResponse;
}

export namespace DeleteComparisonSetResponse {
  export type AsObject = {
  }
}

export class ComputeResultsRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): ComputeResultsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeResultsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeResultsRequest): ComputeResultsRequest.AsObject;
  static serializeBinaryToWriter(message: ComputeResultsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeResultsRequest;
  static deserializeBinaryFromReader(message: ComputeResultsRequest, reader: jspb.BinaryReader): ComputeResultsRequest;
}

export namespace ComputeResultsRequest {
  export type AsObject = {
    sessionUrn: string,
  }
}

export class ComputeResultsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeResultsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeResultsResponse): ComputeResultsResponse.AsObject;
  static serializeBinaryToWriter(message: ComputeResultsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeResultsResponse;
  static deserializeBinaryFromReader(message: ComputeResultsResponse, reader: jspb.BinaryReader): ComputeResultsResponse;
}

export namespace ComputeResultsResponse {
  export type AsObject = {
  }
}

export class GetResultsRequest extends jspb.Message {
  getSessionUrn(): string;
  setSessionUrn(value: string): GetResultsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultsRequest): GetResultsRequest.AsObject;
  static serializeBinaryToWriter(message: GetResultsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultsRequest;
  static deserializeBinaryFromReader(message: GetResultsRequest, reader: jspb.BinaryReader): GetResultsRequest;
}

export namespace GetResultsRequest {
  export type AsObject = {
    sessionUrn: string,
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
  getSessionUrn(): string;
  setSessionUrn(value: string): GetResultRequest;

  getResultUrn(): string;
  setResultUrn(value: string): GetResultRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultRequest): GetResultRequest.AsObject;
  static serializeBinaryToWriter(message: GetResultRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultRequest;
  static deserializeBinaryFromReader(message: GetResultRequest, reader: jspb.BinaryReader): GetResultRequest;
}

export namespace GetResultRequest {
  export type AsObject = {
    sessionUrn: string,
    resultUrn: string,
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
  getSessionUrn(): string;
  setSessionUrn(value: string): GetTextRequest;

  getItemUrn(): string;
  setItemUrn(value: string): GetTextRequest;

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
    sessionUrn: string,
    itemUrn: string,
    span?: v1_types_pb.Span.AsObject,
  }
}

export class GetTextResponse extends jspb.Message {
  getTextSpan(): GetTextResponse.TextSpan | undefined;
  setTextSpan(value?: GetTextResponse.TextSpan): GetTextResponse;
  hasTextSpan(): boolean;
  clearTextSpan(): GetTextResponse;

  getMetadata(): GetTextResponse.Metadata | undefined;
  setMetadata(value?: GetTextResponse.Metadata): GetTextResponse;
  hasMetadata(): boolean;
  clearMetadata(): GetTextResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTextResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTextResponse): GetTextResponse.AsObject;
  static serializeBinaryToWriter(message: GetTextResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTextResponse;
  static deserializeBinaryFromReader(message: GetTextResponse, reader: jspb.BinaryReader): GetTextResponse;
}

export namespace GetTextResponse {
  export type AsObject = {
    textSpan?: GetTextResponse.TextSpan.AsObject,
    metadata?: GetTextResponse.Metadata.AsObject,
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


  export class Metadata extends jspb.Message {
    getTitle(): string;
    setTitle(value: string): Metadata;

    getSource(): string;
    setSource(value: string): Metadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
  }

  export namespace Metadata {
    export type AsObject = {
      title: string,
      source: string,
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
    seedsList: Array<v1_types_pb.Seed.AsObject>,
  }
}

export class AlignWithCollectionRequest extends jspb.Message {
  getSource(): string;
  setSource(value: string): AlignWithCollectionRequest;

  getCollectionUrn(): string;
  setCollectionUrn(value: string): AlignWithCollectionRequest;

  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): AlignWithCollectionRequest;
  hasConfig(): boolean;
  clearConfig(): AlignWithCollectionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignWithCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AlignWithCollectionRequest): AlignWithCollectionRequest.AsObject;
  static serializeBinaryToWriter(message: AlignWithCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignWithCollectionRequest;
  static deserializeBinaryFromReader(message: AlignWithCollectionRequest, reader: jspb.BinaryReader): AlignWithCollectionRequest;
}

export namespace AlignWithCollectionRequest {
  export type AsObject = {
    source: string,
    collectionUrn: string,
    config?: v1_configs_pb.ApiConfig.AsObject,
  }
}

export class AlignWithCollectionResponse extends jspb.Message {
  getResultsList(): Array<AlignWithCollectionResponse.AlignmentResult>;
  setResultsList(value: Array<AlignWithCollectionResponse.AlignmentResult>): AlignWithCollectionResponse;
  clearResultsList(): AlignWithCollectionResponse;
  addResults(value?: AlignWithCollectionResponse.AlignmentResult, index?: number): AlignWithCollectionResponse.AlignmentResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignWithCollectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AlignWithCollectionResponse): AlignWithCollectionResponse.AsObject;
  static serializeBinaryToWriter(message: AlignWithCollectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignWithCollectionResponse;
  static deserializeBinaryFromReader(message: AlignWithCollectionResponse, reader: jspb.BinaryReader): AlignWithCollectionResponse;
}

export namespace AlignWithCollectionResponse {
  export type AsObject = {
    resultsList: Array<AlignWithCollectionResponse.AlignmentResult.AsObject>,
  }

  export class AlignmentResult extends jspb.Message {
    getDocumenturn(): string;
    setDocumenturn(value: string): AlignmentResult;

    getSeedsList(): Array<v1_types_pb.Seed>;
    setSeedsList(value: Array<v1_types_pb.Seed>): AlignmentResult;
    clearSeedsList(): AlignmentResult;
    addSeeds(value?: v1_types_pb.Seed, index?: number): v1_types_pb.Seed;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AlignmentResult.AsObject;
    static toObject(includeInstance: boolean, msg: AlignmentResult): AlignmentResult.AsObject;
    static serializeBinaryToWriter(message: AlignmentResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AlignmentResult;
    static deserializeBinaryFromReader(message: AlignmentResult, reader: jspb.BinaryReader): AlignmentResult;
  }

  export namespace AlignmentResult {
    export type AsObject = {
      documenturn: string,
      seedsList: Array<v1_types_pb.Seed.AsObject>,
    }
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

export class GetDefaultApiConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultApiConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultApiConfigRequest): GetDefaultApiConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetDefaultApiConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultApiConfigRequest;
  static deserializeBinaryFromReader(message: GetDefaultApiConfigRequest, reader: jspb.BinaryReader): GetDefaultApiConfigRequest;
}

export namespace GetDefaultApiConfigRequest {
  export type AsObject = {
  }
}

export class GetDefaultApiConfigResponse extends jspb.Message {
  getConfig(): v1_configs_pb.ApiConfig | undefined;
  setConfig(value?: v1_configs_pb.ApiConfig): GetDefaultApiConfigResponse;
  hasConfig(): boolean;
  clearConfig(): GetDefaultApiConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultApiConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultApiConfigResponse): GetDefaultApiConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetDefaultApiConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultApiConfigResponse;
  static deserializeBinaryFromReader(message: GetDefaultApiConfigResponse, reader: jspb.BinaryReader): GetDefaultApiConfigResponse;
}

export namespace GetDefaultApiConfigResponse {
  export type AsObject = {
    config?: v1_configs_pb.ApiConfig.AsObject,
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
  getRawProperties(): v1_types_pb.Item.Resource.RawProperties | undefined;
  setRawProperties(value?: v1_types_pb.Item.Resource.RawProperties): ExtractResponse;
  hasRawProperties(): boolean;
  clearRawProperties(): ExtractResponse;

  getTextProperties(): v1_types_pb.Item.Resource.TextProperties | undefined;
  setTextProperties(value?: v1_types_pb.Item.Resource.TextProperties): ExtractResponse;
  hasTextProperties(): boolean;
  clearTextProperties(): ExtractResponse;

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
    rawProperties?: v1_types_pb.Item.Resource.RawProperties.AsObject,
    textProperties?: v1_types_pb.Item.Resource.TextProperties.AsObject,
    text: string,
  }
}

