import React from "react";
import { Collection } from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { PicapicaCollectionUrn, PicapicaUrn, Urn } from "../lib/session/urn";
import { useCollectionLocalization } from "../lib/use-collection-localization";
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
			readonly collectionUrn: Urn<"collection"> | PicapicaCollectionUrn;
			readonly collections?: DeepReadonly<Collection.AsObject[]>;
	  }
	| {
			readonly collection: DeepReadonly<Collection.AsObject>;
	  };

export function CollectionLabel(props: CollectionProps): JSX.Element {
	const { urn, collection } = processProps(props);
	const { title } = useCollectionLocalization(urn);

	if (title) {
		return <Label text={title} />;
	} else if (collection?.properties) {
		return <Label text={`${collection.properties.name} - ${collection.properties.description}`} />;
	} else {
		return <UnknownCollectionLabel />;
	}
}
interface ProcessedProps {
	urn: PicapicaCollectionUrn;
	collection: DeepReadonly<Collection.AsObject> | undefined;
}
function processProps(props: CollectionProps): ProcessedProps {
	if ("collection" in props) {
		return {
			urn: PicapicaUrn.parse(props.collection.urn) as PicapicaCollectionUrn,
			collection: props.collection,
		};
	} else {
		let urn: PicapicaCollectionUrn;
		let urnString: string;
		if (typeof props.collectionUrn === "string") {
			const parsed = PicapicaUrn.parse(props.collectionUrn);
			urn = parsed;
			urnString = props.collectionUrn;
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
