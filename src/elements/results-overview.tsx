import React from "react";
import { Link } from "gatsby";
import { getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { DeepReadonly } from "../lib/util";
import { Session } from "../lib/generated/v1/services_pb";
import { Collection, Result } from "../lib/generated/v1/types_pb";
import { categorizeResults } from "../lib/session/result-categories";
import { Badge } from "./badge";
import { CollectionLabel, SubmittedFilesLabel } from "./labels";
import { Buttons } from "./buttons";
import { PicaIcon } from "./icon";
import "./results-overview.scss";
import { LoaderAnimation } from "./loader-animation";
import { PicapicaUrn } from "../lib/session/urn";

interface OverviewContainerProps extends LocalizableProps {
	readonly backTo?: string;
	readonly title: React.ReactNode;
}

function OverviewContainer(props: React.PropsWithChildren<OverviewContainerProps>): JSX.Element {
	const l = getLocalization(props, locales);

	return (
		<div className="OverviewContainer">
			<div className="head">
				{props.backTo && (
					<Link className={Buttons.BUTTON} to={props.backTo} title={l.back}>
						<PicaIcon kind="back" />
					</Link>
				)}
				<div>{props.title}</div>
			</div>
			<div className="content">{props.children}</div>
		</div>
	);
}

interface CenterAlignTwoProps {
	readonly className?: string;
	readonly grow: "left" | "right";
	readonly children: [left: React.ReactNode, right: React.ReactNode];
}

function CenterAlignTwo(props: CenterAlignTwoProps): JSX.Element {
	return (
		<div className={"CenterAlignTwo" + (props.className ? " " + props.className : "")}>
			<div className={`left${props.grow === "left" ? " grow" : ""}`}>{props.children[0]}</div>
			<div className={`right${props.grow === "right" ? " grow" : ""}`}>{props.children[1]}</div>
		</div>
	);
}

export interface ResultsOverviewProps extends LocalizableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly collections?: DeepReadonly<Collection.AsObject[]>;
	readonly itemTo: string;
	readonly collectionTo: (collectionUrn: string) => string;
}

export function ResultsOverview(props: ResultsOverviewProps): JSX.Element {
	const l = getLocalization(props, locales);

	const categories = categorizeResults(props.session.resultsList);

	if (categories.invalid.length) {
		console.error("Not displaying the following results:");
		console.error(categories.invalid);
	}

	const title = (
		<CenterAlignTwo grow="left">
			{[<span className="title">{l.analysisResults}</span>, <Badge kind="Dark">{l.results}</Badge>]}
		</CenterAlignTwo>
	);

	return (
		<div className="ResultsOverview">
			<OverviewContainer lang={props.lang} title={title}>
				<div>
					<Link className={Buttons.BUTTON} to={props.itemTo}>
						<CenterAlignTwo grow="left">
							{[
								<SubmittedFilesLabel lang={props.lang} />,
								<Badge kind="Light">{categories.items.length}</Badge>,
							]}
						</CenterAlignTwo>
					</Link>
				</div>
				{[...categories.collections].map(([urn, results]) => {
					return (
						<div key={urn}>
							<Link className={Buttons.BUTTON} to={props.collectionTo(urn)}>
								<CenterAlignTwo grow="left">
									{[
										<CollectionLabel
											lang={props.lang}
											collectionUrn={urn}
											collections={props.collections}
										/>,
										<Badge kind="Light">{results.length}</Badge>,
									]}
								</CenterAlignTwo>
							</Link>
						</div>
					);
				})}
			</OverviewContainer>
		</div>
	);
}

export interface ItemResultsOverviewProps extends LocalizableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly backTo: string;
	readonly resultTo: (result: DeepReadonly<Result.AsObject>) => string;
}

export function ItemResultsOverview(props: ItemResultsOverviewProps): JSX.Element {
	const l = getLocalization(props, locales);

	const { status } = props.session;
	const { items } = categorizeResults(props.session.resultsList);

	const title = (
		<CenterAlignTwo grow="left">
			{[<SubmittedFilesLabel lang={props.lang} />, <Badge kind="Dark">{l.matches}</Badge>]}
		</CenterAlignTwo>
	);

	const itemNameMap = new Map(props.session.itemsList.map(item => [item.urn, item.meta?.name]));

	return (
		<div className="ItemResultsOverview">
			<OverviewContainer lang={props.lang} backTo={props.backTo} title={title}>
				{items.map(({ result }) => {
					const leftName = itemNameMap.get(result.resources?.urnA ?? "") ?? l.unknownItem;
					const rightName = itemNameMap.get(result.resources?.urnB ?? "") ?? l.unknownItem;

					return (
						<div key={result.urn}>
							<Link className={Buttons.BUTTON} to={props.resultTo(result)}>
								<CenterAlignTwo grow="left">
									{[
										<span className="item-vs">
											<span className="left">{leftName}</span>
											<span className="vs">vs.</span>
											<span className="right">{rightName}</span>
										</span>,
										status === Session.ComputeStatus.STATUS_COMPLETED ? (
											<Badge kind="Light">{result.seedsList.length}</Badge>
										) : (
											<LoaderAnimation />
										),
									]}
								</CenterAlignTwo>
							</Link>
						</div>
					);
				})}

				{items.length === 0 && <div className="no-results">{l.noResults}</div>}
			</OverviewContainer>
		</div>
	);
}

export interface CollectionResultsOverviewProps extends LocalizableProps {
	readonly collectionUrn: string;
	readonly session: DeepReadonly<Session.AsObject>;
	readonly collections?: DeepReadonly<Collection.AsObject[]>;
	readonly backTo: string;
	readonly resultTo: (result: DeepReadonly<Result.AsObject>) => string;
}

export function CollectionResultsOverview(props: CollectionResultsOverviewProps): JSX.Element {
	const l = getLocalization(props, locales);

	const { status } = props.session;
	const results = categorizeResults(props.session.resultsList).collections.get(props.collectionUrn) ?? [];

	const title = (
		<CenterAlignTwo grow="left">
			{[
				<CollectionLabel
					lang={props.lang}
					collectionUrn={props.collectionUrn}
					collections={props.collections}
				/>,
				<Badge kind="Dark">{l.matches}</Badge>,
			]}
		</CenterAlignTwo>
	);

	const itemNameMap = new Map(props.session.itemsList.map(item => [item.urn, item.meta?.name]));

	return (
		<div className="CollectionResultsOverview">
			<OverviewContainer lang={props.lang} backTo={props.backTo} title={title}>
				{results.map(({ item, document, result }) => {
					const itemName = itemNameMap.get(PicapicaUrn.stringify(item)) ?? l.unknownItem;
					const documentName = document.documentId;

					return (
						<div key={result.urn}>
							<Link className={Buttons.BUTTON} to={props.resultTo(result)}>
								<CenterAlignTwo grow="left">
									{[
										<span className="item-vs">
											<span className="left">{itemName}</span>
											<span className="vs">vs.</span>
											<span className="right">{documentName}</span>
										</span>,
										status === Session.ComputeStatus.STATUS_COMPLETED ? (
											<Badge kind="Light">{result.seedsList.length}</Badge>
										) : (
											<LoaderAnimation />
										),
									]}
								</CenterAlignTwo>
							</Link>
						</div>
					);
				})}

				{results.length === 0 && <div className="no-results">{l.noResults}</div>}
			</OverviewContainer>
		</div>
	);
}

const locales: Locales<SimpleString<"back" | "analysisResults" | "results" | "matches" | "noResults" | "unknownItem">> =
	{
		en: {
			back: "Back",

			analysisResults: "Analysis results",
			results: "Results",
			matches: "Matches",
			noResults: "No results",

			unknownItem: "<unknown>",
		},
		de: {
			back: "Zurück",

			analysisResults: "Analyse\xADergebnisse",
			results: "Ergebnisse",
			matches: "Treffer",
			noResults: "Keine Ergebnisse",

			unknownItem: "<unbekannt>",
		},
	};
