import React, { useCallback, useMemo } from "react";
import { Buttons } from "../elements/buttons";
import { Icon, ItemTypeIcon } from "../elements/icon";
import { CollectionLabel, SubmittedFilesLabel } from "../elements/labels";
import { Page } from "../elements/page";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { StepActionBar } from "../elements/step-action-bar";
import { BackButton, StartButton } from "../elements/step-buttons";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { Session } from "../lib/generated/v1/services_pb";
import { Collection, Item } from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { dynamicComponent } from "../lib/react-util";
import { updateComparisonSetAction } from "../lib/session/actions";
import { AnalysisConfig, ItemUrn } from "../lib/session/analysis-config";
import { getSessionClient } from "../lib/session/client";
import { sortSessionItems } from "../lib/session/util";
import { useCollections } from "../lib/use-collections";
import { useLocalization } from "../lib/use-localization";
import { getSessionUrn, Ready, useLoadSession } from "../lib/use-session";
import { DeepReadonly, EMPTY_ARRAY, EMPTY_SET, noop } from "../lib/util";
import "./analysis.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica</title>
		<meta name="robots" content="noindex"></meta>
		<SharedHead />
	</>
);

export default dynamicComponent(Analysis);

function Analysis(): JSX.Element {
	const l = useLocalization(locales);

	const [state, update] = useLoadSession();
	const [collections] = useCollections(getSessionUrn(state));

	const updateConfig = useCallback(
		(config: AnalysisConfig) => {
			if (state.type === "Ready") {
				const { mutate, request } = updateComparisonSetAction(state.session, config);
				update(getSessionClient().updateComparisonSet(request, null).then(noop), mutate);
			}
		},
		[state, update]
	);

	const config = useMemo(() => {
		if (state.type === "Ready") {
			return AnalysisConfig.fromResourcePairs(
				state.session.comparisonsList ?? EMPTY_ARRAY,
				state.session.itemsList.map(i => i.urn)
			);
		} else {
			return AnalysisConfig.EMPTY;
		}
	}, [state]);

	const onReady = ({ session }: Ready): JSX.Element => (
		<>
			<StepActionBar
				left={<BackButton to={getLinkToStep("submit", session.urn)} />}
				right={<StartButton to={getLinkToStep("results", session.urn)} />}
				instruction={l.instruction}
			/>

			<ItemConfig session={session} config={config} update={updateConfig} />

			{(collections ?? []).map(collection => {
				return (
					<CollectionConfig
						key={collection.urn}
						session={session}
						config={config}
						update={updateConfig}
						collection={collection}
						instruction={l.wikipediaInstruction}
					/>
				);
			})}

			<StepActionBar
				left={<BackButton to={getLinkToStep("submit", session.urn)} />}
				right={<StartButton to={getLinkToStep("results", session.urn)} />}
				instruction={""}
			/>
		</>
	);

	return (
		<Page className="Analysis" title={l.title} header="small">
			<StepSelectorGroup sessionUrn={getSessionUrn(state)} current="analysis">
				<SessionState state={state} onReady={onReady} />
			</StepSelectorGroup>
		</Page>
	);
}

interface ItemConfigProps {
	session: DeepReadonly<Session.AsObject>;
	config: AnalysisConfig;
	update: (config: AnalysisConfig) => void;
}

function ItemConfig({ session, config, update }: ItemConfigProps): JSX.Element {
	const l = useLocalization(locales);

	const items = sortSessionItems(session.itemsList);

	const allUrns: ItemUrn[] = items.map(i => i.urn);
	const allA = allUrns.every(urn => config.groupA.has(urn));
	const allB = allUrns.every(urn => config.groupB.has(urn));
	const all = allA && allB;
	const none = allUrns.every(urn => !config.groupA.has(urn) && !config.groupB.has(urn));

	const INACTIVE = "inactive";

	function setAll(): void {
		const newConfig = config.withGroupA(new Set(allUrns)).withGroupB(new Set(allUrns));
		update(newConfig);
	}
	function setNone(): void {
		const newConfig = config.withGroupA(EMPTY_SET).withGroupB(EMPTY_SET);
		update(newConfig);
	}
	function setAllA(): void {
		const newConfig = config.withGroupA(new Set(allUrns));
		update(newConfig);
	}
	function setAllB(): void {
		const newConfig = config.withGroupB(new Set(allUrns));
		update(newConfig);
	}
	function toggleA(urn: ItemUrn): void {
		const newConfig = config.withGroupA(toggleSetValue(config.groupA, urn));
		update(newConfig);
	}
	function toggleB(urn: ItemUrn): void {
		const newConfig = config.withGroupB(toggleSetValue(config.groupB, urn));
		update(newConfig);
	}

	return (
		<div className="ItemConfig">
			<div className="heading">
				<span className="title">
					<SubmittedFilesLabel />
				</span>
				<span className="buttons">
					<span className={Buttons.BUTTON_GROUP}>
						<button className={`${Buttons.BUTTON} ${all ? Buttons.ACTIVE : INACTIVE}`} onClick={setAll}>
							{l.all}
						</button>
						<button className={`${Buttons.BUTTON} ${none ? Buttons.ACTIVE : INACTIVE}`} onClick={setNone}>
							{l.none}
						</button>
					</span>
				</span>
			</div>
			<div className="content">
				<div className="instruction">{l.itemInstruction}</div>
				<div className="table">
					<div className={Buttons.BUTTON_GROUP}>
						<span className={Buttons.NON_BUTTON}>{l.file}</span>
						<button className={`${Buttons.BUTTON} ${allA ? Buttons.ACTIVE : INACTIVE}`} onClick={setAllA}>
							A
						</button>
						<button className={`${Buttons.BUTTON} ${allB ? Buttons.ACTIVE : INACTIVE}`} onClick={setAllB}>
							B
						</button>
					</div>
					{items.map(item => {
						const a = config.groupA.has(item.urn);
						const b = config.groupB.has(item.urn);

						return (
							<div key={item.urn} className={Buttons.BUTTON_GROUP}>
								<span className={Buttons.NON_BUTTON}>
									<ItemTypeIcon type={item.resource?.type ?? Item.Resource.Type.TYPE_UNSPECIFIED} />
									{item.meta?.name}
								</span>
								<button
									className={`${Buttons.BUTTON} ${a ? Buttons.ACTIVE : INACTIVE}`}
									onClick={() => toggleA(item.urn)}>
									A
								</button>
								<button
									className={`${Buttons.BUTTON} ${b ? Buttons.ACTIVE : INACTIVE}`}
									onClick={() => toggleB(item.urn)}>
									B
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

interface CollectionConfigProps {
	session: DeepReadonly<Session.AsObject>;
	config: AnalysisConfig;
	collection: DeepReadonly<Collection.AsObject>;
	instruction: string;
	update: (config: AnalysisConfig) => void;
}

function CollectionConfig({ session, config, collection, instruction, update }: CollectionConfigProps): JSX.Element {
	const l = useLocalization(locales);

	const set = config.collections.get(collection.urn) ?? EMPTY_SET;
	const items = sortSessionItems(session.itemsList);

	const allUrns: ItemUrn[] = items.map(i => i.urn);
	const all = allUrns.every(urn => set.has(urn));
	const none = allUrns.every(urn => !set.has(urn));

	const INACTIVE = "inactive";

	function setAll(): void {
		const newConfig = config.withCollection(collection.urn, new Set(allUrns));
		update(newConfig);
	}
	function setNone(): void {
		const newConfig = config.withCollection(collection.urn, EMPTY_SET);
		update(newConfig);
	}
	function toggleHas(urn: ItemUrn): void {
		const newConfig = config.withCollection(collection.urn, toggleSetValue(set, urn));
		update(newConfig);
	}

	return (
		<div className="CollectionConfig">
			<div className="heading">
				<span className="title">
					<CollectionLabel collectionUrn={collection.urn} />
				</span>
				<span className="buttons">
					<span className={Buttons.BUTTON_GROUP}>
						<button className={`${Buttons.BUTTON} ${all ? Buttons.ACTIVE : INACTIVE}`} onClick={setAll}>
							{l.all}
						</button>
						<button className={`${Buttons.BUTTON} ${none ? Buttons.ACTIVE : INACTIVE}`} onClick={setNone}>
							{l.none}
						</button>
					</span>
				</span>
			</div>
			<div className="content">
				<div className="instruction">{instruction}</div>
				<div className="table">
					<div className={Buttons.BUTTON_GROUP}>
						<span className={Buttons.NON_BUTTON}>{l.file}</span>
						<button className={`${Buttons.BUTTON} ${all ? Buttons.ACTIVE : INACTIVE}`} onClick={setAll}>
							<Icon kind="check-line" />
						</button>
						<button className={`${Buttons.BUTTON} ${none ? Buttons.ACTIVE : INACTIVE}`} onClick={setNone}>
							<Icon kind="close-line" />
						</button>
					</div>
					{items.map(item => {
						const has = set.has(item.urn);

						return (
							<div key={item.urn} className={Buttons.BUTTON_GROUP}>
								<span className={Buttons.NON_BUTTON}>
									<ItemTypeIcon type={item.resource?.type ?? Item.Resource.Type.TYPE_UNSPECIFIED} />
									{item.meta?.name}
								</span>
								<button
									className={`${Buttons.BUTTON} ${has ? Buttons.ACTIVE : INACTIVE}`}
									onClick={() => toggleHas(item.urn)}>
									<Icon kind="check-line" />
								</button>
								<button
									className={`${Buttons.BUTTON} ${!has ? Buttons.ACTIVE : INACTIVE}`}
									onClick={() => toggleHas(item.urn)}>
									<Icon kind="close-line" />
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

function toggleSetValue<T>(set: ReadonlySet<T>, value: T): Set<T> {
	const result = new Set(set);
	if (set.has(value)) {
		result.delete(value);
	} else {
		result.add(value);
	}
	return result;
}

const locales: Locales<
	SimpleString<"title" | "instruction" | "all" | "none" | "file" | "itemInstruction" | "wikipediaInstruction">
> = {
	en: {
		title: "Analysis - Picapica",

		instruction: "Select analysis options",

		all: "All",
		none: "None",
		file: "File",

		itemInstruction: "Compare your submitted files among each other. Group A will be compared with Group B.",
		wikipediaInstruction: "Compare your submitted files with all of Wikipedia.",
	},
	de: {
		title: "Analyse - Picapica",

		instruction: "Analyseoptionen auswählen",

		all: "Alles",
		none: "Nichts",
		file: "Datei",

		itemInstruction:
			"Vergleichen Sie Ihre eingereichten Dateien miteinander. Gruppe A wird mit Gruppe B verglichen.",
		wikipediaInstruction: "Vergleichen Sie Ihre eingereichten Dateien mit der gesamten Wikipedia.",
	},
};
