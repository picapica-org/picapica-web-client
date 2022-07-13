import React from "react";
import { Helmet } from "react-helmet";
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
import { dynamic } from "../lib/react-util";
import { getLocationSearchParams } from "../lib/url-params";
import { useAlignment } from "../lib/use-alignment";
import { useLocalization } from "../lib/use-localization";
import { SeedText, useResultText } from "../lib/use-result-text";
import { Ready, useLoadSession } from "../lib/use-session";
import { DeepReadonly } from "../lib/util";
import "./result.scss";

export default function ResultPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Result />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Result(): JSX.Element {
	const l = useLocalization(locales);

	const [state] = useLoadSession();

	const onReady = ({ session }: Ready): JSX.Element => {
		const pageUrn = getLocationSearchParams().get("urn");
		const result = session.resultsList.find(r => r.urn === pageUrn);

		return (
			<OverviewContainer
				title="Text alignment"
				backTo={toResults({
					urn: session.urn,
					view: getLocationSearchParams().get("view") ?? undefined,
				})}>
				{result ? (
					<ResultView session={session} result={result} />
				) : (
					<div className="invalid-result-error">
						<p>{l.invalidUrn}</p>
					</div>
				)}
			</OverviewContainer>
		);
	};

	return (
		<Page className="Result" header="small">
			<SessionState state={state} onReady={onReady} />
		</Page>
	);
}

interface ResultViewProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly result: DeepReadonly<types.Result.AsObject>;
}

function ResultView(props: ResultViewProps): JSX.Element {
	const l = useLocalization(locales);

	// TODO: Error view. For now, I'll assume that all results have status=OK
	// TODO: Account for missing items
	// TODO: Account for collections
	const resources = getResultResources(props.result, props.session)!;
	const [texts] = useResultText(props.result);

	return (
		<>
			<ResultSummary {...props} resources={resources} />
			{texts?.map((text, i) => {
				return (
					<ResultSeedView
						key={i}
						alignmentKey={`${i}:${props.result.urn}`}
						resources={resources}
						text={text}
					/>
				);
			})}
		</>
	);
}

interface ResultResources {
	readonly left: DeepReadonly<types.Item.AsObject>;
	readonly right: DeepReadonly<types.Item.AsObject>;
}

function getResultResources(
	result: DeepReadonly<types.Result.AsObject>,
	session: DeepReadonly<Session.AsObject>
): ResultResources | undefined {
	if (!result.resources) return undefined;
	const { urnA, urnB } = result.resources;
	const a = session.itemsList.find(i => i.urn === urnA);
	const b = session.itemsList.find(i => i.urn === urnB);
	if (!a || !b) return undefined;
	return { left: a, right: b };
}

interface ResultSummaryProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly result: DeepReadonly<types.Result.AsObject>;
	readonly resources: ResultResources;
}
function ResultSummary(props: ResultSummaryProps): JSX.Element {
	const l = useLocalization(locales);

	const [texts] = useResultText(props.result);

	const [alignments] = useAlignment(
		`${texts?.length}:${props.result.urn}`,
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
			<p className="summary">{l.reusedPassages(props.result.seedsList.length)}</p>
			<p className="details">{l.detailed(props.result.seedsList.length, sharedWords, incomplete)}</p>
		</div>
	);
}

interface ResultSeedViewProps {
	readonly resources: ResultResources;
	readonly text: SeedText;
	readonly alignmentKey: string;
}
function ResultSeedView({ resources, text, alignmentKey }: ResultSeedViewProps): JSX.Element {
	return (
		<div className="ResultSeedView">
			<div className="header">
				<div className="left">
					<ResultLabel item={resources.left} />
				</div>
				<div className="right">
					<ResultLabel item={resources.right} />
				</div>
			</div>
			<div className="alignment">
				<AlignmentView alignmentKey={alignmentKey} left={text.a.text} right={text.b.text} />
			</div>
		</div>
	);
}

interface ResultLabelProps {
	item: DeepReadonly<types.Item.AsObject>;
}
function ResultLabel(props: ResultLabelProps): JSX.Element {
	return (
		<span className="ResultLabel">
			<CenterAlignTwo
				grow="right"
				left={<ItemTypeIcon type={props.item.resource?.type ?? types.Item.Resource.Type.TYPE_UNSPECIFIED} />}
				right={<span className="text">{props.item.meta?.name ?? ""}</span>}
			/>
		</span>
	);
}

const locales: Locales<
	SimpleString<"invalidUrn"> & {
		reusedPassages: (reused: number) => JSX.Element;
		detailed: (reused: number, sharedWords: number, incomplete: boolean) => JSX.Element;
	}
> = {
	en: {
		// TODO: Better error message
		invalidUrn: "Invalid link. The result you are trying to access is not available.",

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
