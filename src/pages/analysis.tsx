import React, { useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, LocalizableProps, Locales, SimpleString, getLocalization } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { StepActionBar } from "../elements/step-action-bar";
import { BackButton, NextButton } from "../elements/step-buttons";
import { SessionLoading } from "../elements/session-creating-loading";
import { LoadState, useLoadSession, visitState } from "../lib/use-session";
import { Icon, ItemTypeIcon, PicaIcon } from "../elements/icon";
import { updateConfigAction } from "../lib/session/actions";
import { Session } from "../lib/generated/v1/services_pb";
import { AnalysisConfig, CollectionUrn, ItemUrn } from "../lib/session/analysis-config";
import { DeepReadonly, EMPTY_ARRAY, EMPTY_SET, noop } from "../lib/util";
import { getSessionClient } from "../lib/session/client";
import { Buttons } from "../elements/buttons";
import { Item } from "../lib/generated/v1/types_pb";
import "./analysis.scss";

export default function AnalysisPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Analysis lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Analysis(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state, update] = useLoadSession();

	const updateConfig = useCallback(
		(config: AnalysisConfig) => {
			if (state.type === "Ready") {
				const { mutate, request } = updateConfigAction(state.session, config);
				// TODO: Handle errors
				update(getSessionClient().updateConfig(request, null).then(noop), mutate);
			}
		},
		[state, update]
	);

	const config = useMemo(() => {
		if (state.type === "Ready") {
			return AnalysisConfig.fromResourcePairs(state.session.config?.pairingsList ?? EMPTY_ARRAY);
		} else {
			return AnalysisConfig.EMPTY;
		}
	}, [state]);

	const content = visitState<LoadState, JSX.Element>(state, {
		Loading(state) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={state.sessionId} current="analysis">
					<SessionLoading {...props} state={state} />
				</StepSelectorGroup>
			);
		},
		Ready({ session }) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={session.id} current="analysis">
					<StepActionBar
						left={<BackButton {...props} to={getLinkToStep("submit", session.id)} />}
						right={<NextButton {...props} to={getLinkToStep("results", session.id)} />}
						instruction={l.instruction}
					/>

					<ItemConfig {...props} session={session} config={config} update={updateConfig} />
					<CollectionConfig
						{...props}
						session={session}
						config={config}
						update={updateConfig}
						collection="urn:collection:wikipedia"
						title={l.wikipediaTitle}
						instruction={l.wikipediaInstruction}
					/>

					<StepActionBar
						left={<BackButton {...props} to={getLinkToStep("submit", session.id)} />}
						right={<NextButton {...props} to={getLinkToStep("results", session.id)} />}
						instruction={""}
					/>
				</StepSelectorGroup>
			);
		},
	});

	return (
		<Page {...props} className="Analysis" header="small">
			{content}
		</Page>
	);
}

interface ItemConfigProps extends LocalizableProps {
	session: DeepReadonly<Session.AsObject>;
	config: AnalysisConfig;
	update: (config: AnalysisConfig) => void;
}

function ItemConfig(props: ItemConfigProps): JSX.Element {
	const l = getLocalization(props, locales);

	const allUrns: ItemUrn[] = props.session.itemsList.map(i => i.urn);
	const allA = allUrns.every(urn => props.config.groupA.has(urn));
	const allB = allUrns.every(urn => props.config.groupB.has(urn));
	const all = allA && allB;
	const none = allUrns.every(urn => !props.config.groupA.has(urn) && !props.config.groupB.has(urn));

	const INACTIVE = "inactive";

	function setAll(): void {
		const newConfig = props.config.withGroupA(new Set(allUrns)).withGroupB(new Set(allUrns));
		props.update(newConfig);
	}
	function setNone(): void {
		const newConfig = props.config.withGroupA(EMPTY_SET).withGroupB(EMPTY_SET);
		props.update(newConfig);
	}
	function setAllA(): void {
		const newConfig = props.config.withGroupA(new Set(allUrns));
		props.update(newConfig);
	}
	function setAllB(): void {
		const newConfig = props.config.withGroupB(new Set(allUrns));
		props.update(newConfig);
	}
	function toggleA(urn: ItemUrn): void {
		const newConfig = props.config.withGroupA(toggleSetValue(props.config.groupA, urn));
		props.update(newConfig);
	}
	function toggleB(urn: ItemUrn): void {
		const newConfig = props.config.withGroupB(toggleSetValue(props.config.groupB, urn));
		props.update(newConfig);
	}

	return (
		<div className="ItemConfig">
			<div className="heading">
				<span className="title">
					<span>
						<PicaIcon kind="upload" />
						{l.itemTitle}
					</span>
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
					{props.session.itemsList.map(item => {
						const a = props.config.groupA.has(item.urn);
						const b = props.config.groupB.has(item.urn);

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

interface CollectionConfigProps extends LocalizableProps {
	session: DeepReadonly<Session.AsObject>;
	config: AnalysisConfig;
	collection: CollectionUrn;
	title: string;
	instruction: string;
	update: (config: AnalysisConfig) => void;
}

function CollectionConfig(props: CollectionConfigProps): JSX.Element {
	const l = getLocalization(props, locales);

	const set = props.config.collections.get(props.collection) ?? EMPTY_SET;

	const allUrns: ItemUrn[] = props.session.itemsList.map(i => i.urn);
	const all = allUrns.every(urn => set.has(urn));
	const none = allUrns.every(urn => !set.has(urn));

	const INACTIVE = "inactive";

	function setAll(): void {
		const newConfig = props.config.withCollection(props.collection, new Set(allUrns));
		props.update(newConfig);
	}
	function setNone(): void {
		const newConfig = props.config.withCollection(props.collection, EMPTY_SET);
		props.update(newConfig);
	}
	function toggleHas(urn: ItemUrn): void {
		const newConfig = props.config.withCollection(props.collection, toggleSetValue(set, urn));
		props.update(newConfig);
	}

	return (
		<div className="CollectionConfig">
			<div className="heading">
				<span className="title">
					<span>{props.title}</span>
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
				<div className="instruction">{props.instruction}</div>
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
					{props.session.itemsList.map(item => {
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
	SimpleString<
		| "instruction"
		| "all"
		| "none"
		| "file"
		| "itemTitle"
		| "itemInstruction"
		| "wikipediaTitle"
		| "wikipediaInstruction"
	>
> = {
	en: {
		instruction: "Select analysis options",

		all: "All",
		none: "None",
		file: "File",

		itemTitle: "Your submitted files",
		itemInstruction: "Compare your submitted files among each other. Group A will be compared with Group B.",
		wikipediaTitle: "Wikipedia - the free encyclopedia",
		wikipediaInstruction: "Compare your submitted files with all of Wikipedia.",
	},
	de: {
		instruction: "Analyseoptionen auswählen",

		all: "Alles",
		none: "Nichts",
		file: "Datei",

		itemTitle: "Ihre eingereichten Dateien",
		itemInstruction:
			"Vergleichen Sie Ihre eingereichten Dateien miteinander. Gruppe A wird mit Gruppe B verglichen.",
		wikipediaTitle: "Wikipedia - die freie Enzyklopädie",
		wikipediaInstruction: "Vergleichen Sie Ihre eingereichten Dateien mit der gesamten Wikipedia.",
	},
};
