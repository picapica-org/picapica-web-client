import * as jspb from 'google-protobuf'



export class ApiConfig extends jspb.Message {
  getRetrieval(): RetrievalConfig | undefined;
  setRetrieval(value?: RetrievalConfig): ApiConfig;
  hasRetrieval(): boolean;
  clearRetrieval(): ApiConfig;

  getDecomposition(): DecompositionConfig | undefined;
  setDecomposition(value?: DecompositionConfig): ApiConfig;
  hasDecomposition(): boolean;
  clearDecomposition(): ApiConfig;

  getAlignment(): AlignmentConfig | undefined;
  setAlignment(value?: AlignmentConfig): ApiConfig;
  hasAlignment(): boolean;
  clearAlignment(): ApiConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApiConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ApiConfig): ApiConfig.AsObject;
  static serializeBinaryToWriter(message: ApiConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApiConfig;
  static deserializeBinaryFromReader(message: ApiConfig, reader: jspb.BinaryReader): ApiConfig;
}

export namespace ApiConfig {
  export type AsObject = {
    retrieval?: RetrievalConfig.AsObject,
    decomposition?: DecompositionConfig.AsObject,
    alignment?: AlignmentConfig.AsObject,
  }
}

export class RetrievalConfig extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetrievalConfig.AsObject;
  static toObject(includeInstance: boolean, msg: RetrievalConfig): RetrievalConfig.AsObject;
  static serializeBinaryToWriter(message: RetrievalConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetrievalConfig;
  static deserializeBinaryFromReader(message: RetrievalConfig, reader: jspb.BinaryReader): RetrievalConfig;
}

export namespace RetrievalConfig {
  export type AsObject = {
  }
}

export class DecompositionConfig extends jspb.Message {
  getRepresentation(): DecompositionConfig.Representation;
  setRepresentation(value: DecompositionConfig.Representation): DecompositionConfig;

  getLanguage(): DecompositionConfig.Language;
  setLanguage(value: DecompositionConfig.Language): DecompositionConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecompositionConfig.AsObject;
  static toObject(includeInstance: boolean, msg: DecompositionConfig): DecompositionConfig.AsObject;
  static serializeBinaryToWriter(message: DecompositionConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecompositionConfig;
  static deserializeBinaryFromReader(message: DecompositionConfig, reader: jspb.BinaryReader): DecompositionConfig;
}

export namespace DecompositionConfig {
  export type AsObject = {
    representation: DecompositionConfig.Representation,
    language: DecompositionConfig.Language,
  }

  export enum Representation { 
    REPRESENTATION_UNSPECIFIED = 0,
    REPRESENTATION_TOKEN = 1,
    REPRESENTATION_VECTOR = 2,
    REPRESENTATION_POS = 3,
    REPRESENTATION_LEMMA = 4,
  }

  export enum Language { 
    LANGUAGE_UNSPECIFIED = 0,
    LANGUAGE_EN = 1,
    LANGUAGE_DE = 2,
    LANGUAGE_FR = 3,
  }
}

export class AlignmentConfig extends jspb.Message {
  getMode(): AlignmentConfig.Mode;
  setMode(value: AlignmentConfig.Mode): AlignmentConfig;

  getSeeder(): AlignmentConfig.Seeder | undefined;
  setSeeder(value?: AlignmentConfig.Seeder): AlignmentConfig;
  hasSeeder(): boolean;
  clearSeeder(): AlignmentConfig;

  getExtender(): AlignmentConfig.Extender | undefined;
  setExtender(value?: AlignmentConfig.Extender): AlignmentConfig;
  hasExtender(): boolean;
  clearExtender(): AlignmentConfig;

  getReducer(): AlignmentConfig.Reducer | undefined;
  setReducer(value?: AlignmentConfig.Reducer): AlignmentConfig;
  hasReducer(): boolean;
  clearReducer(): AlignmentConfig;

  getSimilarity(): AlignmentConfig.Similarity | undefined;
  setSimilarity(value?: AlignmentConfig.Similarity): AlignmentConfig;
  hasSimilarity(): boolean;
  clearSimilarity(): AlignmentConfig;

  getCombinator(): AlignmentConfig.Combinator | undefined;
  setCombinator(value?: AlignmentConfig.Combinator): AlignmentConfig;
  hasCombinator(): boolean;
  clearCombinator(): AlignmentConfig;

  getNormalizer(): AlignmentConfig.Normalizer | undefined;
  setNormalizer(value?: AlignmentConfig.Normalizer): AlignmentConfig;
  hasNormalizer(): boolean;
  clearNormalizer(): AlignmentConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlignmentConfig.AsObject;
  static toObject(includeInstance: boolean, msg: AlignmentConfig): AlignmentConfig.AsObject;
  static serializeBinaryToWriter(message: AlignmentConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlignmentConfig;
  static deserializeBinaryFromReader(message: AlignmentConfig, reader: jspb.BinaryReader): AlignmentConfig;
}

export namespace AlignmentConfig {
  export type AsObject = {
    mode: AlignmentConfig.Mode,
    seeder?: AlignmentConfig.Seeder.AsObject,
    extender?: AlignmentConfig.Extender.AsObject,
    reducer?: AlignmentConfig.Reducer.AsObject,
    similarity?: AlignmentConfig.Similarity.AsObject,
    combinator?: AlignmentConfig.Combinator.AsObject,
    normalizer?: AlignmentConfig.Normalizer.AsObject,
  }

  export class Seeder extends jspb.Message {
    getNeedlemanWunsch(): AlignmentConfig.Seeder.NeedlemanWunsch | undefined;
    setNeedlemanWunsch(value?: AlignmentConfig.Seeder.NeedlemanWunsch): Seeder;
    hasNeedlemanWunsch(): boolean;
    clearNeedlemanWunsch(): Seeder;

    getSmithWaterman(): AlignmentConfig.Seeder.SmithWaterman | undefined;
    setSmithWaterman(value?: AlignmentConfig.Seeder.SmithWaterman): Seeder;
    hasSmithWaterman(): boolean;
    clearSmithWaterman(): Seeder;

    getNgram(): AlignmentConfig.Seeder.Ngram | undefined;
    setNgram(value?: AlignmentConfig.Seeder.Ngram): Seeder;
    hasNgram(): boolean;
    clearNgram(): Seeder;

    getHash(): AlignmentConfig.Seeder.Hash | undefined;
    setHash(value?: AlignmentConfig.Seeder.Hash): Seeder;
    hasHash(): boolean;
    clearHash(): Seeder;

    getSeederCase(): Seeder.SeederCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Seeder.AsObject;
    static toObject(includeInstance: boolean, msg: Seeder): Seeder.AsObject;
    static serializeBinaryToWriter(message: Seeder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Seeder;
    static deserializeBinaryFromReader(message: Seeder, reader: jspb.BinaryReader): Seeder;
  }

  export namespace Seeder {
    export type AsObject = {
      needlemanWunsch?: AlignmentConfig.Seeder.NeedlemanWunsch.AsObject,
      smithWaterman?: AlignmentConfig.Seeder.SmithWaterman.AsObject,
      ngram?: AlignmentConfig.Seeder.Ngram.AsObject,
      hash?: AlignmentConfig.Seeder.Hash.AsObject,
    }

    export class NeedlemanWunsch extends jspb.Message {
      getMismatchCost(): number;
      setMismatchCost(value: number): NeedlemanWunsch;

      getGapCost(): number;
      setGapCost(value: number): NeedlemanWunsch;

      getMatchAward(): number;
      setMatchAward(value: number): NeedlemanWunsch;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): NeedlemanWunsch.AsObject;
      static toObject(includeInstance: boolean, msg: NeedlemanWunsch): NeedlemanWunsch.AsObject;
      static serializeBinaryToWriter(message: NeedlemanWunsch, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): NeedlemanWunsch;
      static deserializeBinaryFromReader(message: NeedlemanWunsch, reader: jspb.BinaryReader): NeedlemanWunsch;
    }

    export namespace NeedlemanWunsch {
      export type AsObject = {
        mismatchCost: number,
        gapCost: number,
        matchAward: number,
      }
    }


    export class SmithWaterman extends jspb.Message {
      getMismatchCost(): number;
      setMismatchCost(value: number): SmithWaterman;

      getGapCost(): number;
      setGapCost(value: number): SmithWaterman;

      getMatchAward(): number;
      setMatchAward(value: number): SmithWaterman;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): SmithWaterman.AsObject;
      static toObject(includeInstance: boolean, msg: SmithWaterman): SmithWaterman.AsObject;
      static serializeBinaryToWriter(message: SmithWaterman, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): SmithWaterman;
      static deserializeBinaryFromReader(message: SmithWaterman, reader: jspb.BinaryReader): SmithWaterman;
    }

    export namespace SmithWaterman {
      export type AsObject = {
        mismatchCost: number,
        gapCost: number,
        matchAward: number,
      }
    }


    export class Ngram extends jspb.Message {
      getN(): number;
      setN(value: number): Ngram;

      getOverlap(): number;
      setOverlap(value: number): Ngram;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Ngram.AsObject;
      static toObject(includeInstance: boolean, msg: Ngram): Ngram.AsObject;
      static serializeBinaryToWriter(message: Ngram, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Ngram;
      static deserializeBinaryFromReader(message: Ngram, reader: jspb.BinaryReader): Ngram;
    }

    export namespace Ngram {
      export type AsObject = {
        n: number,
        overlap: number,
      }
    }


    export class Hash extends jspb.Message {
      getN(): number;
      setN(value: number): Hash;

      getOverlap(): number;
      setOverlap(value: number): Hash;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Hash.AsObject;
      static toObject(includeInstance: boolean, msg: Hash): Hash.AsObject;
      static serializeBinaryToWriter(message: Hash, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Hash;
      static deserializeBinaryFromReader(message: Hash, reader: jspb.BinaryReader): Hash;
    }

    export namespace Hash {
      export type AsObject = {
        n: number,
        overlap: number,
      }
    }


    export enum SeederCase { 
      SEEDER_NOT_SET = 0,
      NEEDLEMAN_WUNSCH = 1,
      SMITH_WATERMAN = 2,
      NGRAM = 3,
      HASH = 4,
    }
  }


  export class Extender extends jspb.Message {
    getDensity(): AlignmentConfig.Extender.Density | undefined;
    setDensity(value?: AlignmentConfig.Extender.Density): Extender;
    hasDensity(): boolean;
    clearDensity(): Extender;

    getRange(): AlignmentConfig.Extender.Range | undefined;
    setRange(value?: AlignmentConfig.Extender.Range): Extender;
    hasRange(): boolean;
    clearRange(): Extender;

    getExtenderCase(): Extender.ExtenderCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Extender.AsObject;
    static toObject(includeInstance: boolean, msg: Extender): Extender.AsObject;
    static serializeBinaryToWriter(message: Extender, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Extender;
    static deserializeBinaryFromReader(message: Extender, reader: jspb.BinaryReader): Extender;
  }

  export namespace Extender {
    export type AsObject = {
      density?: AlignmentConfig.Extender.Density.AsObject,
      range?: AlignmentConfig.Extender.Range.AsObject,
    }

    export class Density extends jspb.Message {
      getMinPoints(): number;
      setMinPoints(value: number): Density;

      getEpsilon(): number;
      setEpsilon(value: number): Density;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Density.AsObject;
      static toObject(includeInstance: boolean, msg: Density): Density.AsObject;
      static serializeBinaryToWriter(message: Density, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Density;
      static deserializeBinaryFromReader(message: Density, reader: jspb.BinaryReader): Density;
    }

    export namespace Density {
      export type AsObject = {
        minPoints: number,
        epsilon: number,
      }
    }


    export class Range extends jspb.Message {
      getTheta(): number;
      setTheta(value: number): Range;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Range.AsObject;
      static toObject(includeInstance: boolean, msg: Range): Range.AsObject;
      static serializeBinaryToWriter(message: Range, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Range;
      static deserializeBinaryFromReader(message: Range, reader: jspb.BinaryReader): Range;
    }

    export namespace Range {
      export type AsObject = {
        theta: number,
      }
    }


    export enum ExtenderCase { 
      EXTENDER_NOT_SET = 0,
      DENSITY = 1,
      RANGE = 2,
    }
  }


  export class Reducer extends jspb.Message {
    getPassageLength(): AlignmentConfig.Reducer.PassageLength | undefined;
    setPassageLength(value?: AlignmentConfig.Reducer.PassageLength): Reducer;
    hasPassageLength(): boolean;
    clearPassageLength(): Reducer;

    getReducerCase(): Reducer.ReducerCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Reducer.AsObject;
    static toObject(includeInstance: boolean, msg: Reducer): Reducer.AsObject;
    static serializeBinaryToWriter(message: Reducer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Reducer;
    static deserializeBinaryFromReader(message: Reducer, reader: jspb.BinaryReader): Reducer;
  }

  export namespace Reducer {
    export type AsObject = {
      passageLength?: AlignmentConfig.Reducer.PassageLength.AsObject,
    }

    export class PassageLength extends jspb.Message {
      getMinLength(): number;
      setMinLength(value: number): PassageLength;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): PassageLength.AsObject;
      static toObject(includeInstance: boolean, msg: PassageLength): PassageLength.AsObject;
      static serializeBinaryToWriter(message: PassageLength, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): PassageLength;
      static deserializeBinaryFromReader(message: PassageLength, reader: jspb.BinaryReader): PassageLength;
    }

    export namespace PassageLength {
      export type AsObject = {
        minLength: number,
      }
    }


    export enum ReducerCase { 
      REDUCER_NOT_SET = 0,
      PASSAGE_LENGTH = 1,
    }
  }


  export class Similarity extends jspb.Message {
    getIdentity(): AlignmentConfig.Similarity.Identity | undefined;
    setIdentity(value?: AlignmentConfig.Similarity.Identity): Similarity;
    hasIdentity(): boolean;
    clearIdentity(): Similarity;

    getCosine(): AlignmentConfig.Similarity.Cosine | undefined;
    setCosine(value?: AlignmentConfig.Similarity.Cosine): Similarity;
    hasCosine(): boolean;
    clearCosine(): Similarity;

    getLevenshtein(): AlignmentConfig.Similarity.Levenshtein | undefined;
    setLevenshtein(value?: AlignmentConfig.Similarity.Levenshtein): Similarity;
    hasLevenshtein(): boolean;
    clearLevenshtein(): Similarity;

    getJaccard(): AlignmentConfig.Similarity.Jaccard | undefined;
    setJaccard(value?: AlignmentConfig.Similarity.Jaccard): Similarity;
    hasJaccard(): boolean;
    clearJaccard(): Similarity;

    getSimilarityCase(): Similarity.SimilarityCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Similarity.AsObject;
    static toObject(includeInstance: boolean, msg: Similarity): Similarity.AsObject;
    static serializeBinaryToWriter(message: Similarity, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Similarity;
    static deserializeBinaryFromReader(message: Similarity, reader: jspb.BinaryReader): Similarity;
  }

  export namespace Similarity {
    export type AsObject = {
      identity?: AlignmentConfig.Similarity.Identity.AsObject,
      cosine?: AlignmentConfig.Similarity.Cosine.AsObject,
      levenshtein?: AlignmentConfig.Similarity.Levenshtein.AsObject,
      jaccard?: AlignmentConfig.Similarity.Jaccard.AsObject,
    }

    export class Identity extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Identity.AsObject;
      static toObject(includeInstance: boolean, msg: Identity): Identity.AsObject;
      static serializeBinaryToWriter(message: Identity, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Identity;
      static deserializeBinaryFromReader(message: Identity, reader: jspb.BinaryReader): Identity;
    }

    export namespace Identity {
      export type AsObject = {
      }
    }


    export class Cosine extends jspb.Message {
      getThreshold(): number;
      setThreshold(value: number): Cosine;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Cosine.AsObject;
      static toObject(includeInstance: boolean, msg: Cosine): Cosine.AsObject;
      static serializeBinaryToWriter(message: Cosine, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Cosine;
      static deserializeBinaryFromReader(message: Cosine, reader: jspb.BinaryReader): Cosine;
    }

    export namespace Cosine {
      export type AsObject = {
        threshold: number,
      }
    }


    export class Levenshtein extends jspb.Message {
      getThreshold(): number;
      setThreshold(value: number): Levenshtein;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Levenshtein.AsObject;
      static toObject(includeInstance: boolean, msg: Levenshtein): Levenshtein.AsObject;
      static serializeBinaryToWriter(message: Levenshtein, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Levenshtein;
      static deserializeBinaryFromReader(message: Levenshtein, reader: jspb.BinaryReader): Levenshtein;
    }

    export namespace Levenshtein {
      export type AsObject = {
        threshold: number,
      }
    }


    export class Jaccard extends jspb.Message {
      getThreshold(): number;
      setThreshold(value: number): Jaccard;

      getSeparator(): string;
      setSeparator(value: string): Jaccard;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Jaccard.AsObject;
      static toObject(includeInstance: boolean, msg: Jaccard): Jaccard.AsObject;
      static serializeBinaryToWriter(message: Jaccard, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Jaccard;
      static deserializeBinaryFromReader(message: Jaccard, reader: jspb.BinaryReader): Jaccard;
    }

    export namespace Jaccard {
      export type AsObject = {
        threshold: number,
        separator: string,
      }
    }


    export enum SimilarityCase { 
      SIMILARITY_NOT_SET = 0,
      IDENTITY = 1,
      COSINE = 2,
      LEVENSHTEIN = 3,
      JACCARD = 4,
    }
  }


  export class Combinator extends jspb.Message {
    getStringConcat(): AlignmentConfig.Combinator.StringConcat | undefined;
    setStringConcat(value?: AlignmentConfig.Combinator.StringConcat): Combinator;
    hasStringConcat(): boolean;
    clearStringConcat(): Combinator;

    getVectorConcat(): AlignmentConfig.Combinator.VectorConcat | undefined;
    setVectorConcat(value?: AlignmentConfig.Combinator.VectorConcat): Combinator;
    hasVectorConcat(): boolean;
    clearVectorConcat(): Combinator;

    getCombinatorCase(): Combinator.CombinatorCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Combinator.AsObject;
    static toObject(includeInstance: boolean, msg: Combinator): Combinator.AsObject;
    static serializeBinaryToWriter(message: Combinator, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Combinator;
    static deserializeBinaryFromReader(message: Combinator, reader: jspb.BinaryReader): Combinator;
  }

  export namespace Combinator {
    export type AsObject = {
      stringConcat?: AlignmentConfig.Combinator.StringConcat.AsObject,
      vectorConcat?: AlignmentConfig.Combinator.VectorConcat.AsObject,
    }

    export class StringConcat extends jspb.Message {
      getSep(): string;
      setSep(value: string): StringConcat;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): StringConcat.AsObject;
      static toObject(includeInstance: boolean, msg: StringConcat): StringConcat.AsObject;
      static serializeBinaryToWriter(message: StringConcat, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): StringConcat;
      static deserializeBinaryFromReader(message: StringConcat, reader: jspb.BinaryReader): StringConcat;
    }

    export namespace StringConcat {
      export type AsObject = {
        sep: string,
      }
    }


    export class VectorConcat extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): VectorConcat.AsObject;
      static toObject(includeInstance: boolean, msg: VectorConcat): VectorConcat.AsObject;
      static serializeBinaryToWriter(message: VectorConcat, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): VectorConcat;
      static deserializeBinaryFromReader(message: VectorConcat, reader: jspb.BinaryReader): VectorConcat;
    }

    export namespace VectorConcat {
      export type AsObject = {
      }
    }


    export enum CombinatorCase { 
      COMBINATOR_NOT_SET = 0,
      STRING_CONCAT = 1,
      VECTOR_CONCAT = 2,
    }
  }


  export class Normalizer extends jspb.Message {
    getSorting(): AlignmentConfig.Normalizer.Sorting | undefined;
    setSorting(value?: AlignmentConfig.Normalizer.Sorting): Normalizer;
    hasSorting(): boolean;
    clearSorting(): Normalizer;

    getNormalizerCase(): Normalizer.NormalizerCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Normalizer.AsObject;
    static toObject(includeInstance: boolean, msg: Normalizer): Normalizer.AsObject;
    static serializeBinaryToWriter(message: Normalizer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Normalizer;
    static deserializeBinaryFromReader(message: Normalizer, reader: jspb.BinaryReader): Normalizer;
  }

  export namespace Normalizer {
    export type AsObject = {
      sorting?: AlignmentConfig.Normalizer.Sorting.AsObject,
    }

    export class Sorting extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Sorting.AsObject;
      static toObject(includeInstance: boolean, msg: Sorting): Sorting.AsObject;
      static serializeBinaryToWriter(message: Sorting, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Sorting;
      static deserializeBinaryFromReader(message: Sorting, reader: jspb.BinaryReader): Sorting;
    }

    export namespace Sorting {
      export type AsObject = {
      }
    }


    export enum NormalizerCase { 
      NORMALIZER_NOT_SET = 0,
      SORTING = 1,
    }
  }


  export enum Mode { 
    MODE_UNSPECIFIED = 0,
    MODE_STRING = 1,
    MODE_VECTOR = 2,
  }
}

