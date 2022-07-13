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
	if ("collection" in props) {
		return getCollectionLabel(PicapicaUrn.parse(props.collection.urn) as PicapicaCollectionUrn, props.collection);
	} else {
		let urn: PicapicaCollectionUrn;
		let urnString: string;
		if (typeof props.collectionUrn === "string") {
			const parsed = PicapicaUrn.tryParse(props.collectionUrn);
			if (parsed && parsed.type === "collection") {
				urn = parsed;
				urnString = props.collectionUrn;
			} else {
				return <UnknownCollectionLabel />;
			}
		} else {
			urn = props.collectionUrn;
			urnString = PicapicaUrn.stringify(urn);
		}

		const collection = props.collections?.find(c => c.urn === urnString);

		return getCollectionLabel(urn, collection);
	}
}
function getCollectionLabel(
	urn: PicapicaCollectionUrn,
	collection: DeepReadonly<Collection.AsObject> | undefined
): JSX.Element {
	const Known = getKnownCollectionLabel(urn);
	if (Known) {
		return <Known />;
	}

	const name = collection?.properties?.name;
	if (name) {
		return <Label text={name} />;
	}

	return <UnknownCollectionLabel />;
}
function getKnownCollectionLabel(urn: PicapicaCollectionUrn): (() => JSX.Element) | undefined {
	if (urn.collectionId.startsWith("wikipedia")) {
		return () => {
			const l = useLocalization(locales);
			return <Label text={l.wikipedia} />;
		};
	}
}
function UnknownCollectionLabel(): JSX.Element {
	const l = useLocalization(locales);
	return <Label text={l.unknown} />;
}

const locales: Locales<SimpleString<"submittedFiles" | "wikipedia" | "unknown">> = {
	en: {
		submittedFiles: "Your submitted files",
		wikipedia: "Wikipedia - the free encyclopedia",
		unknown: "Unknown",
	},
	de: {
		submittedFiles: "Ihre eingereichten Dateien",
		wikipedia: "Wikipedia - die freie Enzyklopädie",
		unknown: "Unbekannt",
	},
};
