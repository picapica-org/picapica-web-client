/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as v1_services_pb from '../v1/services_pb';


export class AlignmentServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoAlign = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.AlignResponse,
    (request: v1_services_pb.AlignRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.AlignResponse.deserializeBinary
  );

  align(
    request: v1_services_pb.AlignRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.AlignResponse>;

  align(
    request: v1_services_pb.AlignRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.AlignResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.AlignResponse>;

  align(
    request: v1_services_pb.AlignRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.AlignResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.AlignmentService/Align',
        request,
        metadata || {},
        this.methodInfoAlign,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.AlignmentService/Align',
    request,
    metadata || {},
    this.methodInfoAlign);
  }

}

export class DecompositionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoDecompose = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.DecomposeResponse,
    (request: v1_services_pb.DecomposeRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.DecomposeResponse.deserializeBinary
  );

  decompose(
    request: v1_services_pb.DecomposeRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.DecomposeResponse>;

  decompose(
    request: v1_services_pb.DecomposeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.DecomposeResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.DecomposeResponse>;

  decompose(
    request: v1_services_pb.DecomposeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.DecomposeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.DecompositionService/Decompose',
        request,
        metadata || {},
        this.methodInfoDecompose,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.DecompositionService/Decompose',
    request,
    metadata || {},
    this.methodInfoDecompose);
  }

}

export class RetrievalServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoRetrieve = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.RetrieveResponse,
    (request: v1_services_pb.RetrieveRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.RetrieveResponse.deserializeBinary
  );

  retrieve(
    request: v1_services_pb.RetrieveRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/v1.RetrievalService/Retrieve',
      request,
      metadata || {},
      this.methodInfoRetrieve);
  }

}

export class SessionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateSession = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.CreateSessionResponse,
    (request: v1_services_pb.CreateSessionRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.CreateSessionResponse.deserializeBinary
  );

  createSession(
    request: v1_services_pb.CreateSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.CreateSessionResponse>;

  createSession(
    request: v1_services_pb.CreateSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.CreateSessionResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.CreateSessionResponse>;

  createSession(
    request: v1_services_pb.CreateSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.CreateSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/CreateSession',
        request,
        metadata || {},
        this.methodInfoCreateSession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/CreateSession',
    request,
    metadata || {},
    this.methodInfoCreateSession);
  }

  methodInfoGetSession = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetSessionResponse,
    (request: v1_services_pb.GetSessionRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetSessionResponse.deserializeBinary
  );

  getSession(
    request: v1_services_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetSessionResponse>;

  getSession(
    request: v1_services_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetSessionResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetSessionResponse>;

  getSession(
    request: v1_services_pb.GetSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetSession',
        request,
        metadata || {},
        this.methodInfoGetSession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetSession',
    request,
    metadata || {},
    this.methodInfoGetSession);
  }

  methodInfoDeleteSession = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.DeleteSessionResponse,
    (request: v1_services_pb.DeleteSessionRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.DeleteSessionResponse.deserializeBinary
  );

  deleteSession(
    request: v1_services_pb.DeleteSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.DeleteSessionResponse>;

  deleteSession(
    request: v1_services_pb.DeleteSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteSessionResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.DeleteSessionResponse>;

  deleteSession(
    request: v1_services_pb.DeleteSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/DeleteSession',
        request,
        metadata || {},
        this.methodInfoDeleteSession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/DeleteSession',
    request,
    metadata || {},
    this.methodInfoDeleteSession);
  }

  methodInfoGetCollections = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetCollectionsResponse,
    (request: v1_services_pb.GetCollectionsRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetCollectionsResponse.deserializeBinary
  );

  getCollections(
    request: v1_services_pb.GetCollectionsRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetCollectionsResponse>;

  getCollections(
    request: v1_services_pb.GetCollectionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetCollectionsResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetCollectionsResponse>;

  getCollections(
    request: v1_services_pb.GetCollectionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetCollectionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetCollections',
        request,
        metadata || {},
        this.methodInfoGetCollections,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetCollections',
    request,
    metadata || {},
    this.methodInfoGetCollections);
  }

  methodInfoGetConfig = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetConfigResponse,
    (request: v1_services_pb.GetConfigRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetConfigResponse.deserializeBinary
  );

  getConfig(
    request: v1_services_pb.GetConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetConfigResponse>;

  getConfig(
    request: v1_services_pb.GetConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetConfigResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetConfigResponse>;

  getConfig(
    request: v1_services_pb.GetConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetConfig',
        request,
        metadata || {},
        this.methodInfoGetConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetConfig',
    request,
    metadata || {},
    this.methodInfoGetConfig);
  }

  methodInfoUpdateConfig = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.UpdateConfigResponse,
    (request: v1_services_pb.UpdateConfigRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.UpdateConfigResponse.deserializeBinary
  );

  updateConfig(
    request: v1_services_pb.UpdateConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.UpdateConfigResponse>;

  updateConfig(
    request: v1_services_pb.UpdateConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.UpdateConfigResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.UpdateConfigResponse>;

  updateConfig(
    request: v1_services_pb.UpdateConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.UpdateConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/UpdateConfig',
        request,
        metadata || {},
        this.methodInfoUpdateConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/UpdateConfig',
    request,
    metadata || {},
    this.methodInfoUpdateConfig);
  }

  methodInfoDeleteConfig = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.DeleteConfigResponse,
    (request: v1_services_pb.DeleteConfigRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.DeleteConfigResponse.deserializeBinary
  );

  deleteConfig(
    request: v1_services_pb.DeleteConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.DeleteConfigResponse>;

  deleteConfig(
    request: v1_services_pb.DeleteConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteConfigResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.DeleteConfigResponse>;

  deleteConfig(
    request: v1_services_pb.DeleteConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/DeleteConfig',
        request,
        metadata || {},
        this.methodInfoDeleteConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/DeleteConfig',
    request,
    metadata || {},
    this.methodInfoDeleteConfig);
  }

  methodInfoCreateItem = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.CreateItemResponse,
    (request: v1_services_pb.CreateItemRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.CreateItemResponse.deserializeBinary
  );

  createItem(
    request: v1_services_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.CreateItemResponse>;

  createItem(
    request: v1_services_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.CreateItemResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.CreateItemResponse>;

  createItem(
    request: v1_services_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.CreateItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/CreateItem',
        request,
        metadata || {},
        this.methodInfoCreateItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/CreateItem',
    request,
    metadata || {},
    this.methodInfoCreateItem);
  }

  methodInfoUpdateItem = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.UpdateItemResponse,
    (request: v1_services_pb.UpdateItemRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.UpdateItemResponse.deserializeBinary
  );

  updateItem(
    request: v1_services_pb.UpdateItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.UpdateItemResponse>;

  updateItem(
    request: v1_services_pb.UpdateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.UpdateItemResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.UpdateItemResponse>;

  updateItem(
    request: v1_services_pb.UpdateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.UpdateItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/UpdateItem',
        request,
        metadata || {},
        this.methodInfoUpdateItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/UpdateItem',
    request,
    metadata || {},
    this.methodInfoUpdateItem);
  }

  methodInfoGetItem = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetItemResponse,
    (request: v1_services_pb.GetItemRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetItemResponse.deserializeBinary
  );

  getItem(
    request: v1_services_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetItemResponse>;

  getItem(
    request: v1_services_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetItemResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetItemResponse>;

  getItem(
    request: v1_services_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetItem',
        request,
        metadata || {},
        this.methodInfoGetItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetItem',
    request,
    metadata || {},
    this.methodInfoGetItem);
  }

  methodInfoDeleteItem = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.DeleteItemResponse,
    (request: v1_services_pb.DeleteItemRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.DeleteItemResponse.deserializeBinary
  );

  deleteItem(
    request: v1_services_pb.DeleteItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.DeleteItemResponse>;

  deleteItem(
    request: v1_services_pb.DeleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteItemResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.DeleteItemResponse>;

  deleteItem(
    request: v1_services_pb.DeleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.DeleteItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/DeleteItem',
        request,
        metadata || {},
        this.methodInfoDeleteItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/DeleteItem',
    request,
    metadata || {},
    this.methodInfoDeleteItem);
  }

  methodInfoGetResults = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetResultsResponse,
    (request: v1_services_pb.GetResultsRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetResultsResponse.deserializeBinary
  );

  getResults(
    request: v1_services_pb.GetResultsRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetResultsResponse>;

  getResults(
    request: v1_services_pb.GetResultsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetResultsResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetResultsResponse>;

  getResults(
    request: v1_services_pb.GetResultsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetResultsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetResults',
        request,
        metadata || {},
        this.methodInfoGetResults,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetResults',
    request,
    metadata || {},
    this.methodInfoGetResults);
  }

  methodInfoGetResult = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetResultResponse,
    (request: v1_services_pb.GetResultRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetResultResponse.deserializeBinary
  );

  getResult(
    request: v1_services_pb.GetResultRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetResultResponse>;

  getResult(
    request: v1_services_pb.GetResultRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetResultResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetResultResponse>;

  getResult(
    request: v1_services_pb.GetResultRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetResultResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetResult',
        request,
        metadata || {},
        this.methodInfoGetResult,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetResult',
    request,
    metadata || {},
    this.methodInfoGetResult);
  }

  methodInfoGetText = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.GetTextResponse,
    (request: v1_services_pb.GetTextRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.GetTextResponse.deserializeBinary
  );

  getText(
    request: v1_services_pb.GetTextRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.GetTextResponse>;

  getText(
    request: v1_services_pb.GetTextRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.GetTextResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.GetTextResponse>;

  getText(
    request: v1_services_pb.GetTextRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.GetTextResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.SessionService/GetText',
        request,
        metadata || {},
        this.methodInfoGetText,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.SessionService/GetText',
    request,
    metadata || {},
    this.methodInfoGetText);
  }

}

export class ApiServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.InfoResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    v1_services_pb.InfoResponse.deserializeBinary
  );

  info(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.InfoResponse>;

  info(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.InfoResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.InfoResponse>;

  info(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.InfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.ApiService/Info',
        request,
        metadata || {},
        this.methodInfoInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.ApiService/Info',
    request,
    metadata || {},
    this.methodInfoInfo);
  }

  methodInfoAlignPair = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.AlignPairResponse,
    (request: v1_services_pb.AlignPairRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.AlignPairResponse.deserializeBinary
  );

  alignPair(
    request: v1_services_pb.AlignPairRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.AlignPairResponse>;

  alignPair(
    request: v1_services_pb.AlignPairRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.AlignPairResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.AlignPairResponse>;

  alignPair(
    request: v1_services_pb.AlignPairRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.AlignPairResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.ApiService/AlignPair',
        request,
        metadata || {},
        this.methodInfoAlignPair,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.ApiService/AlignPair',
    request,
    metadata || {},
    this.methodInfoAlignPair);
  }

}

export class ExtractionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoExtract = new grpcWeb.AbstractClientBase.MethodInfo(
    v1_services_pb.ExtractResponse,
    (request: v1_services_pb.ExtractRequest) => {
      return request.serializeBinary();
    },
    v1_services_pb.ExtractResponse.deserializeBinary
  );

  extract(
    request: v1_services_pb.ExtractRequest,
    metadata: grpcWeb.Metadata | null): Promise<v1_services_pb.ExtractResponse>;

  extract(
    request: v1_services_pb.ExtractRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: v1_services_pb.ExtractResponse) => void): grpcWeb.ClientReadableStream<v1_services_pb.ExtractResponse>;

  extract(
    request: v1_services_pb.ExtractRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: v1_services_pb.ExtractResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/v1.ExtractionService/Extract',
        request,
        metadata || {},
        this.methodInfoExtract,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/v1.ExtractionService/Extract',
    request,
    metadata || {},
    this.methodInfoExtract);
  }

}

