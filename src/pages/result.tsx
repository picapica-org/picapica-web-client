import React from "react";
import { AlignmentView } from "../elements/alignment-view";
import { CenterAlignTwo } from "../elements/center-align-two";
import { ItemTypeIcon } from "../elements/icon";
import { Page } from "../elements/page";
import { OverviewContainer } from "../elements/results-overview";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { Session } from "../lib/generated/v1/services_pb";
import * as types from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { toResults } from "../lib/page-links";
import { dynamicComponent } from "../lib/react-util";
import { PicapicaUrn, Urn } from "../lib/session/urn";
import { getLocationSearchParams } from "../lib/url-params";
import { useAlignment } from "../lib/use-alignment";
import { useCollectionDocument } from "../lib/use-collection-document";
import { useLocalization } from "../lib/use-localization";
import { SeedText, useResultText } from "../lib/use-result-text";
import { Ready, useLoadSession } from "../lib/use-session";
import { debugAssert, DeepReadonly } from "../lib/util";
import "./result.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica</title>
		<SharedHead />
	</>
);

export default dynamicComponent(Result);

function Result(): JSX.Element {
	const [state] = useLoadSession();

	const onReady = ({ session }: Ready): JSX.Element => {
		return (
			<OverviewContainer
				title="Text alignment"
				backTo={toResults({
					urn: session.urn,
					view: getLocationSearchParams().get("view") ?? undefined,
				})}>
				<ResultValidity session={session} />
			</OverviewContainer>
		);
	};

	return (
		<Page className="Result" header="small">
			<SessionState state={state} onReady={onReady} />
		</Page>
	);
}

function ResultValidity({ session }: { session: DeepReadonly<Session.AsObject> }): JSX.Element {
	const l = useLocalization(locales);

	const pageUrn = getLocationSearchParams().get("urn");
	const result = session.resultsList.find(r => r.urn === pageUrn);

	if (!result) {
		return (
			<div className="invalid-result-error">
				<p>{l.invalidUrn}</p>
			</div>
		);
	}

	if (result.status !== types.Result.ResultStatusCode.STATUS_OK) {
		return <div className="invalid-result-error">{l.failedResult(result.status)}</div>;
	}

	debugAssert(result.resources !== undefined, "Expected that the result object has resources");
	const left = getResultResource(result.resources.urnA, session);
	const right = getResultResource(result.resources.urnB, session);

	const error = left.type === "error" ? left : right.type === "error" ? right : undefined;
	if (error) {
		throw new Error("");
	}

	if (left.type === "error") {
		return (
			<div className="invalid-result-error">
				<p>{l[`resultError${left.error}`]}</p>
			</div>
		);
	}
	if (right.type === "error") {
		return (
			<div className="invalid-result-error">
				<p>{l[`resultError${right.error}`]}</p>
			</div>
		);
	}

	return <ResultView left={left} right={right} result={result} />;
}

type ResultResource = ResultResourceSessionItem | ResultResourceCollectionDocument;
interface ResultResourceSessionItem {
	type: "item";
	item: DeepReadonly<types.Item.AsObject>;
}
interface ResultResourceCollectionDocument {
	type: "document";
	sessionUrn: string;
	collectionUrn: Urn<"collection">;
	documentUrn: Urn<"document">;
}
interface ResultResourceError {
	type: "error";
	error: "InvalidUrnType" | "UnknownItem";
}
function getResultResource(urn: string, session: DeepReadonly<Session.AsObject>): ResultResource | ResultResourceError {
	const parsed = PicapicaUrn.parse(urn);

	if (parsed.type === "item") {
		const item = session.itemsList.find(i => i.urn === urn);
		if (!item) return { type: "error", error: "UnknownItem" };
		return { type: "item", item };
	}

	if (parsed.type === "document") {
		const collectionUrn = PicapicaUrn.stringify({ type: "collection", collectionId: parsed.collectionId });
		return { type: "document", documentUrn: PicapicaUrn.stringify(parsed), sessionUrn: session.urn, collectionUrn };
	}

	return { type: "error", error: "InvalidUrnType" };
}

interface ResultViewProps {
	readonly result: DeepReadonly<types.Result.AsObject>;
	readonly left: ResultResource;
	readonly right: ResultResource;
}

function ResultView({ result, left, right }: ResultViewProps): JSX.Element {
	const [texts] = useResultText(result);

	return (
		<>
			<ResultSummary result={result} />
			{texts?.map((text, i) => {
				return (
					<ResultSeedView key={i} alignmentKey={`${i}:${result.urn}`} left={left} right={right} text={text} />
				);
			})}
		</>
	);
}

interface ResultSummaryProps {
	readonly result: DeepReadonly<types.Result.AsObject>;
}
function ResultSummary({ result }: ResultSummaryProps): JSX.Element {
	const l = useLocalization(locales);

	const [texts] = useResultText(result);

	const [alignments] = useAlignment(
		`${texts?.length}:${result.urn}`,
		texts?.map(t => ({ left: t.a.text, right: t.b.text })) ?? []
	);

	let sharedWords = 0;
	let incomplete = texts === undefined;
	if (texts) {
		for (const alignment of alignments) {
			sharedWords += alignment.diff?.sharedWords ?? 0;
			incomplete ||= alignment.diff === undefined;
		}
	}

	return (
		<div className="ResultSummary">
			<p className="summary">{l.reusedPassages(result.seedsList.length)}</p>
			<p className="details">{l.detailed(result.seedsList.length, sharedWords, incomplete)}</p>
		</div>
	);
}

interface ResultSeedViewProps {
	readonly left: ResultResource;
	readonly right: ResultResource;
	readonly text: SeedText;
	readonly alignmentKey: string;
}
function ResultSeedView({ left, right, text, alignmentKey }: ResultSeedViewProps): JSX.Element {
	return (
		<div className="ResultSeedView">
			<div className="header">
				<div className="left">
					<ResultLabel resource={left} />
				</div>
				<div className="right">
					<ResultLabel resource={right} />
				</div>
			</div>
			<div className="alignment">
				<AlignmentView alignmentKey={alignmentKey} left={text.a.text} right={text.b.text} />
			</div>
		</div>
	);
}

interface ResultLabelProps {
	resource: ResultResource;
}
function ResultLabel({ resource }: ResultLabelProps): JSX.Element {
	return (
		<span className="ResultLabel">
			{resource.type === "item" ? (
				<ItemResultLabel resource={resource} />
			) : (
				<DocumentResultLabel resource={resource} />
			)}
		</span>
	);
}
function ItemResultLabel({ resource }: { resource: ResultResourceSessionItem }): JSX.Element {
	const { item } = resource;

	return (
		<CenterAlignTwo
			className="ItemResultLabel"
			grow="right"
			left={<ItemTypeIcon type={item.resource?.type ?? types.Item.Resource.Type.TYPE_UNSPECIFIED} />}
			right={<span className="text">{item.meta?.name ?? ""}</span>}
		/>
	);
}
function DocumentResultLabel({ resource }: { resource: ResultResourceCollectionDocument }): JSX.Element {
	const { documentUrn, sessionUrn } = resource;

	const document = useCollectionDocument(sessionUrn, documentUrn);

	return (
		<span className="DocumentResultLabel">
			<span className="text">{document?.properties?.title ?? ""}</span>
		</span>
	);
}

const locales: Locales<
	SimpleString<"invalidUrn" | `resultError${ResultResourceError["error"]}`> & {
		failedResult: (status: types.Result.ResultStatusCode) => JSX.Element;
		reusedPassages: (reused: number) => JSX.Element;
		detailed: (reused: number, sharedWords: number, incomplete: boolean) => JSX.Element;
	}
> = {
	en: {
		invalidUrn: "Invalid link. The result you are trying to access is not available.",
		failedResult(status) {
			return (
				<>
					<p>Picapica was unable to calculate this result due to a server error.</p>
					<p>Status code: {status}</p>
				</>
			);
		},

		resultErrorInvalidUrnType:
			"Invalid URN type in result. This is a problem with Picapica itself. Please report this bug.",
		resultErrorUnknownItem:
			"Invalid item in result. The item has likely been deleted which means that this result can no longer be viewed.",

		reusedPassages(reused) {
			if (reused === 1) {
				return <>Found 1 reused passage.</>;
			}
			return <>Found {reused} reused passages.</>;
		},
		detailed(reused, sharedWords, incomplete) {
			const details: string[] = [];

			details.push(reused === 1 ? `1 reused passage` : `${reused} reused passages`);

			const atLeast = incomplete ? ">" : "";
			details.push(sharedWords === 1 ? `${atLeast}1 shared word` : `${atLeast}${sharedWords} shared words`);

			return <>Detailed comparison of your submitted document: {details.join(", ")}</>;
		},
	},
	de: {
		invalidUrn: "Falscher Link. Das Ergebnis ist nicht verfügbar.",
		failedResult(status) {
			return (
				<>
					<p>Picapica konnte dieses Ergebnis nicht berechnen wegen eines Serverproblems.</p>
					<p>Statuscode: {status}</p>
				</>
			);
		},

		resultErrorInvalidUrnType:
			"Flascher URN-Type im Ergebnis. Dies ist ein Problem in der Picapica Software. Bitte melden Sie diesen Fehler.",
		resultErrorUnknownItem:
			"Invalid item in result. The item has likely been deleted which means that this result can no longer be viewed.",

		reusedPassages(reused) {
			if (reused === 1) {
				return <>1 wiederverwendete Passage gefunden.</>;
			}
			return <>{reused} wiederverwendete Passagen gefunden.</>;
		},
		detailed(reused, sharedWords, incomplete) {
			const details: string[] = [];

			details.push(reused === 1 ? `1 wiederverwendete Passage` : `${reused} wiederverwendete Passagen`);

			const atLeast = incomplete ? ">" : "";
			details.push(
				sharedWords === 1 ? `${atLeast}1 gemeinsames Wort` : `${atLeast}${sharedWords} gemeinsame Wörter`
			);

			return <>Detailierter Vergleich Ihres eingereichten Dokuments: {details.join(", ")}</>;
		},
	},
};
