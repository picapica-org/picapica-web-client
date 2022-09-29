import { Link } from "gatsby";
import React from "react";
import { Session } from "../lib/generated/v1/services_pb";
import { Collection, Result } from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { categorizeResults, CollectionResult } from "../lib/session/result-categories";
import { PicapicaUrn, Urn } from "../lib/session/urn";
import { useCollectionDocument, usePreloadCollectionDocuments } from "../lib/use-collection-document";
import { useLocalization } from "../lib/use-localization";
import { DeepReadonly } from "../lib/util";
import { Badge } from "./badge";
import { Buttons } from "./buttons";
import { CenterAlignTwo } from "./center-align-two";
import { PicaIcon } from "./icon";
import { CollectionLabel, Label, SubmittedFilesLabel } from "./labels";
import { LoaderAnimation } from "./loader-animation";
import "./results-overview.scss";

export interface OverviewContainerProps {
	readonly backTo?: string;
	readonly title: React.ReactNode;
}

export function OverviewContainer({
	backTo,
	title,
	children,
}: React.PropsWithChildren<OverviewContainerProps>): JSX.Element {
	const l = useLocalization(locales);

	return (
		<div className="OverviewContainer">
			<div className="head">
				{backTo && (
					<Link className={Buttons.BUTTON} to={backTo} title={l.back}>
						<PicaIcon kind="back" />
					</Link>
				)}
				<div>{title}</div>
			</div>
			<div className="content">{children}</div>
		</div>
	);
}

export interface ResultsOverviewProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly collections?: DeepReadonly<Collection.AsObject[]>;
	readonly backTo: string;
	readonly itemTo: string;
	readonly collectionTo: (collectionUrn: string) => string;
}

export function ResultsOverview({
	session,
	collections,
	backTo,
	itemTo,
	collectionTo,
}: ResultsOverviewProps): JSX.Element {
	const l = useLocalization(locales);

	const categories = categorizeResults(session.resultsList);

	if (categories.invalid.length) {
		console.error("Not displaying the following results:");
		console.error(categories.invalid);
	}

	const title = (
		<CenterAlignTwo
			grow="left"
			left={<Label icon="results" text={l.analysisResults} />}
			right={<Badge kind="Dark">{l.results}</Badge>}
		/>
	);

	const running = session.status === Session.ComputeStatus.STATUS_RUNNING;

	return (
		<div className="ResultsOverview">
			<OverviewContainer backTo={backTo} title={title}>
				<div>
					<Link className={Buttons.BUTTON} to={itemTo}>
						<CenterAlignTwo
							grow="left"
							left={<SubmittedFilesLabel />}
							right={
								<Badge kind="Light">
									{running && <LoaderAnimation />}
									{categories.items.length}
								</Badge>
							}
						/>
					</Link>
				</div>
				{[...categories.collections].map(([urn, results]) => {
					return (
						<div key={urn}>
							<PreloadDocument sessionUrn={session.urn} results={results} />
							<Link className={Buttons.BUTTON} to={collectionTo(urn)}>
								<CenterAlignTwo
									grow="left"
									left={<CollectionLabel collectionUrn={urn} collections={collections} />}
									right={<Badge kind="Light">{results.length}</Badge>}
								/>
							</Link>
						</div>
					);
				})}
			</OverviewContainer>
		</div>
	);
}

function PreloadDocument({ sessionUrn, results }: { sessionUrn: string; results: CollectionResult[] }): JSX.Element {
	usePreloadCollectionDocuments(
		sessionUrn,
		results.map(r => PicapicaUrn.stringify(r.document))
	);
	return <></>;
}

export interface ItemResultsOverviewProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly backTo: string;
	readonly resultTo: (result: DeepReadonly<Result.AsObject>) => string;
}

export function ItemResultsOverview({ session, backTo, resultTo }: ItemResultsOverviewProps): JSX.Element {
	const l = useLocalization(locales);

	const { items } = categorizeResults(session.resultsList);

	const title = (
		<CenterAlignTwo grow="left" left={<SubmittedFilesLabel />} right={<Badge kind="Dark">{l.matches}</Badge>} />
	);

	const itemNameMap = new Map(session.itemsList.map(item => [item.urn, item.meta?.name]));

	return (
		<div className="ItemResultsOverview">
			<OverviewContainer backTo={backTo} title={title}>
				{items.map(({ result }) => {
					const leftName = itemNameMap.get(result.resources?.urnA ?? "") ?? l.unknownItem;
					const rightName = itemNameMap.get(result.resources?.urnB ?? "") ?? l.unknownItem;

					return (
						<div key={result.urn}>
							<Link className={Buttons.BUTTON} to={resultTo(result)}>
								<CenterAlignTwo
									grow="left"
									left={
										<span className="item-vs">
											<span className="left">{leftName}</span>
											<span className="vs">vs.</span>
											<span className="right">{rightName}</span>
										</span>
									}
									right={
										session.status === Session.ComputeStatus.STATUS_COMPLETED ? (
											<Badge kind="Light">{result.seedsList.length}</Badge>
										) : (
											<LoaderAnimation />
										)
									}
								/>
							</Link>
						</div>
					);
				})}

				{items.length === 0 && <div className="no-results">{l.noResults}</div>}
			</OverviewContainer>
		</div>
	);
}

export interface CollectionResultsOverviewProps {
	readonly collectionUrn: string;
	readonly session: DeepReadonly<Session.AsObject>;
	readonly collections?: DeepReadonly<Collection.AsObject[]>;
	readonly backTo: string;
	readonly resultTo: (result: DeepReadonly<Result.AsObject>) => string;
}

export function CollectionResultsOverview({
	session,
	collectionUrn,
	collections,
	backTo,
	resultTo,
}: CollectionResultsOverviewProps): JSX.Element {
	const l = useLocalization(locales);

	const results = categorizeResults(session.resultsList).collections.get(collectionUrn as Urn<"collection">) ?? [];

	const title = (
		<CenterAlignTwo
			grow="left"
			left={<CollectionLabel collectionUrn={collectionUrn} collections={collections} />}
			right={<Badge kind="Dark">{l.matches}</Badge>}
		/>
	);

	const itemNameMap = new Map(session.itemsList.map(item => [item.urn, item.meta?.name]));

	return (
		<div className="CollectionResultsOverview">
			<OverviewContainer backTo={backTo} title={title}>
				{results.map(({ item, document, result }) => {
					const itemName = itemNameMap.get(PicapicaUrn.stringify(item)) ?? l.unknownItem;
					const documentName = (
						<DocumentName sessionUrn={session.urn} urn={PicapicaUrn.stringify(document)} />
					);

					return (
						<div key={result.urn}>
							<Link className={Buttons.BUTTON} to={resultTo(result)}>
								<CenterAlignTwo
									grow="left"
									left={
										<span className="item-vs">
											<span className="left">{itemName}</span>
											<span className="vs">vs.</span>
											<span className="right">{documentName}</span>
										</span>
									}
									right={
										session.status === Session.ComputeStatus.STATUS_COMPLETED ? (
											<Badge kind="Light">{result.seedsList.length}</Badge>
										) : (
											<LoaderAnimation />
										)
									}
								/>
							</Link>
						</div>
					);
				})}

				{results.length === 0 && <div className="no-results">{l.noResults}</div>}
			</OverviewContainer>
		</div>
	);
}

function DocumentName({ sessionUrn, urn }: { sessionUrn: string; urn: Urn<"document"> }): JSX.Element {
	const document = useCollectionDocument(sessionUrn, urn);
	if (document?.properties) {
		return <>{document.properties?.title}</>;
	}
	return <LoaderAnimation />;
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
