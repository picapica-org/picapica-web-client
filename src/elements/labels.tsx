import React from "react";
import { Collection } from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { PicapicaCollectionUrn, PicapicaUrn } from "../lib/session/urn";
import { useLocalization } from "../lib/use-localization";
import { DeepReadonly } from "../lib/util";
import { PicaIcon, PicaIconKind } from "./icon";
import "./labels.scss";

export interface LabelProps {
	readonly icon?: PicaIconKind;
	readonly text: string;
}

export function Label(props: LabelProps): JSX.Element {
	return (
		<span className="Label">
			{props.icon && <PicaIcon kind={props.icon} />}
			<span className="text">{props.text}</span>
		</span>
	);
}

export function SubmittedFilesLabel(): JSX.Element {
	const l = useLocalization(locales);
	return <Label icon="upload" text={l.submittedFiles} />;
}

export type CollectionProps =
	| {
			readonly collectionUrn: string | PicapicaCollectionUrn;
			readonly collections?: DeepReadonly<Collection.AsObject[]>;
	  }
	| {
			readonly collection: DeepReadonly<Collection.AsObject>;
	  };

export function CollectionLabel(props: CollectionProps): JSX.Element {
	const known = useLocalization(knownCollections);
	const processed = processProps(props);

	if (!processed) return <UnknownCollectionLabel />;
	const { urn, collection } = processed;

	const knownLabel = known[urn.collectionId as keyof typeof known] as string | undefined;
	if (typeof knownLabel === "string") {
		return <Label text={knownLabel} />;
	}

	if (collection?.properties) {
		return <Label text={`${collection.properties.name} - ${collection.properties.description}`} />;
	}

	return <UnknownCollectionLabel />;
}
interface ProcessedProps {
	urn: PicapicaCollectionUrn;
	collection: DeepReadonly<Collection.AsObject> | undefined;
}
function processProps(props: CollectionProps): ProcessedProps | undefined {
	if ("collection" in props) {
		return {
			urn: PicapicaUrn.parse(props.collection.urn) as PicapicaCollectionUrn,
			collection: props.collection,
		};
	} else {
		let urn: PicapicaCollectionUrn;
		let urnString: string;
		if (typeof props.collectionUrn === "string") {
			const parsed = PicapicaUrn.tryParse(props.collectionUrn);
			if (parsed && parsed.type === "collection") {
				urn = parsed;
				urnString = props.collectionUrn;
			} else {
				return undefined;
			}
		} else {
			urn = props.collectionUrn;
			urnString = PicapicaUrn.stringify(urn);
		}

		const collection = props.collections?.find(c => c.urn === urnString);

		return { urn, collection };
	}
}

function UnknownCollectionLabel(): JSX.Element {
	const l = useLocalization(locales);
	return <Label text={l.unknown} />;
}

const knownCollectionsEn = {
	core_fulltext_languagenameenglish: "CORE - The world's largest collection of open-access research papers",
} as const;
const knownCollectionsDe = {
	core_fulltext_languagenameenglish: "CORE - The world's largest collection of open-access research papers",
} as const;
const knownCollections: Locales<SimpleString<keyof typeof knownCollectionsEn | keyof typeof knownCollectionsDe>> = {
	en: knownCollectionsEn,
	de: knownCollectionsDe,
};
const locales: Locales<SimpleString<"submittedFiles" | "unknown">> = {
	en: {
		submittedFiles: "Your submitted files",
		unknown: "Unknown",
	},
	de: {
		submittedFiles: "Ihre eingereichten Dateien",
		unknown: "Unbekannt",
	},
};
