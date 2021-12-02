import * as jspb from 'google-protobuf'



export class Element extends jspb.Message {
  getSpan(): Span | undefined;
  setSpan(value?: Span): Element;
  hasSpan(): boolean;
  clearSpan(): Element;

  getStringValue(): string;
  setStringValue(value: string): Element;

  getVectorValuesList(): Array<number>;
  setVectorValuesList(value: Array<number>): Element;
  clearVectorValuesList(): Element;
  addVectorValues(value: number, index?: number): Element;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Element.AsObject;
  static toObject(includeInstance: boolean, msg: Element): Element.AsObject;
  static serializeBinaryToWriter(message: Element, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Element;
  static deserializeBinaryFromReader(message: Element, reader: jspb.BinaryReader): Element;
}

export namespace Element {
  export type AsObject = {
    span?: Span.AsObject,
    stringValue: string,
    vectorValuesList: Array<number>,
  }
}

export class Seed extends jspb.Message {
  getSpan1(): Span | undefined;
  setSpan1(value?: Span): Seed;
  hasSpan1(): boolean;
  clearSpan1(): Seed;

  getSpan2(): Span | undefined;
  setSpan2(value?: Span): Seed;
  hasSpan2(): boolean;
  clearSpan2(): Seed;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Seed.AsObject;
  static toObject(includeInstance: boolean, msg: Seed): Seed.AsObject;
  static serializeBinaryToWriter(message: Seed, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Seed;
  static deserializeBinaryFromReader(message: Seed, reader: jspb.BinaryReader): Seed;
}

export namespace Seed {
  export type AsObject = {
    span1?: Span.AsObject,
    span2?: Span.AsObject,
  }
}

export class Span extends jspb.Message {
  getBegin(): number;
  setBegin(value: number): Span;

  getEnd(): number;
  setEnd(value: number): Span;

  getIndex(): number;
  setIndex(value: number): Span;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Span.AsObject;
  static toObject(includeInstance: boolean, msg: Span): Span.AsObject;
  static serializeBinaryToWriter(message: Span, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Span;
  static deserializeBinaryFromReader(message: Span, reader: jspb.BinaryReader): Span;
}

export namespace Span {
  export type AsObject = {
    begin: number,
    end: number,
    index: number,
  }
}

export class ResourcePair extends jspb.Message {
  getUrnA(): string;
  setUrnA(value: string): ResourcePair;

  getUrnB(): string;
  setUrnB(value: string): ResourcePair;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourcePair.AsObject;
  static toObject(includeInstance: boolean, msg: ResourcePair): ResourcePair.AsObject;
  static serializeBinaryToWriter(message: ResourcePair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourcePair;
  static deserializeBinaryFromReader(message: ResourcePair, reader: jspb.BinaryReader): ResourcePair;
}

export namespace ResourcePair {
  export type AsObject = {
    urnA: string,
    urnB: string,
  }
}

export class Result extends jspb.Message {
  getUrn(): string;
  setUrn(value: string): Result;

  getResources(): ResourcePair | undefined;
  setResources(value?: ResourcePair): Result;
  hasResources(): boolean;
  clearResources(): Result;

  getCompleted(): boolean;
  setCompleted(value: boolean): Result;

  getSeedsList(): Array<Seed>;
  setSeedsList(value: Array<Seed>): Result;
  clearSeedsList(): Result;
  addSeeds(value?: Seed, index?: number): Seed;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    urn: string,
    resources?: ResourcePair.AsObject,
    completed: boolean,
    seedsList: Array<Seed.AsObject>,
  }
}

export class Collection extends jspb.Message {
  getUrn(): string;
  setUrn(value: string): Collection;

  getProperties(): Collection.Properties | undefined;
  setProperties(value?: Collection.Properties): Collection;
  hasProperties(): boolean;
  clearProperties(): Collection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collection.AsObject;
  static toObject(includeInstance: boolean, msg: Collection): Collection.AsObject;
  static serializeBinaryToWriter(message: Collection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collection;
  static deserializeBinaryFromReader(message: Collection, reader: jspb.BinaryReader): Collection;
}

export namespace Collection {
  export type AsObject = {
    urn: string,
    properties?: Collection.Properties.AsObject,
  }

  export class Properties extends jspb.Message {
    getName(): string;
    setName(value: string): Properties;

    getSourceUrl(): string;
    setSourceUrl(value: string): Properties;

    getLogoUrl(): string;
    setLogoUrl(value: string): Properties;

    getDescription(): string;
    setDescription(value: string): Properties;

    getLanguage(): string;
    setLanguage(value: string): Properties;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Properties.AsObject;
    static toObject(includeInstance: boolean, msg: Properties): Properties.AsObject;
    static serializeBinaryToWriter(message: Properties, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Properties;
    static deserializeBinaryFromReader(message: Properties, reader: jspb.BinaryReader): Properties;
  }

  export namespace Properties {
    export type AsObject = {
      name: string,
      sourceUrl: string,
      logoUrl: string,
      description: string,
      language: string,
    }
  }

}

export class Item extends jspb.Message {
  getUrn(): string;
  setUrn(value: string): Item;

  getMeta(): Item.Metadata | undefined;
  setMeta(value?: Item.Metadata): Item;
  hasMeta(): boolean;
  clearMeta(): Item;

  getResource(): Item.Resource | undefined;
  setResource(value?: Item.Resource): Item;
  hasResource(): boolean;
  clearResource(): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
  export type AsObject = {
    urn: string,
    meta?: Item.Metadata.AsObject,
    resource?: Item.Resource.AsObject,
  }

  export class Metadata extends jspb.Message {
    getName(): string;
    setName(value: string): Metadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
  }

  export namespace Metadata {
    export type AsObject = {
      name: string,
    }
  }


  export class Resource extends jspb.Message {
    getUrn(): string;
    setUrn(value: string): Resource;

    getType(): Item.Resource.Type;
    setType(value: Item.Resource.Type): Resource;

    getProperties(): Item.Resource.Properties | undefined;
    setProperties(value?: Item.Resource.Properties): Resource;
    hasProperties(): boolean;
    clearProperties(): Resource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Resource.AsObject;
    static toObject(includeInstance: boolean, msg: Resource): Resource.AsObject;
    static serializeBinaryToWriter(message: Resource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Resource;
    static deserializeBinaryFromReader(message: Resource, reader: jspb.BinaryReader): Resource;
  }

  export namespace Resource {
    export type AsObject = {
      urn: string,
      type: Item.Resource.Type,
      properties?: Item.Resource.Properties.AsObject,
    }

    export class Properties extends jspb.Message {
      getRawChecksum(): string;
      setRawChecksum(value: string): Properties;

      getContentChecksum(): string;
      setContentChecksum(value: string): Properties;

      getSize(): number;
      setSize(value: number): Properties;

      getLength(): number;
      setLength(value: number): Properties;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Properties.AsObject;
      static toObject(includeInstance: boolean, msg: Properties): Properties.AsObject;
      static serializeBinaryToWriter(message: Properties, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Properties;
      static deserializeBinaryFromReader(message: Properties, reader: jspb.BinaryReader): Properties;
    }

    export namespace Properties {
      export type AsObject = {
        rawChecksum: string,
        contentChecksum: string,
        size: number,
        length: number,
      }
    }


    export enum Type { 
      TYPE_UNSPECIFIED = 0,
      TYPE_TEXT = 1,
      TYPE_URL = 2,
      TYPE_FILE = 3,
    }
  }

}

