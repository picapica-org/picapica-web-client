import { Locales } from "./localization";
import { PicapicaUrn } from "./session/urn";
import { useLocalization } from "./use-localization";

export interface CollectionLocalization {
	readonly title: string;
}

type KnownCollections = "core_fulltext_languagenameenglish";

const knownCollections: Locales<Record<KnownCollections, CollectionLocalization>> = {
	en: {
		core_fulltext_languagenameenglish: {
			title: "CORE - The world's largest collection of open-access research papers",
		},
	},
	de: {
		core_fulltext_languagenameenglish: {
			title: "CORE - The world's largest collection of open-access research papers",
		},
	},
};

const EMPTY_OBJ = {};

export function useCollectionLocalization(urn: PicapicaUrn | string): Partial<CollectionLocalization> {
	const l: Readonly<Record<string, CollectionLocalization | undefined>> = useLocalization(knownCollections);

	const parsed = typeof urn === "string" ? PicapicaUrn.tryParse(urn) : urn;
	if (parsed && parsed.type === "collection") {
		const known = l[parsed.collectionId];
		if (known) {
			return known;
		}
	}

	return EMPTY_OBJ;
}
