import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { OverviewContainer } from "../elements/results-overview";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { toResults } from "../lib/page-links";
import { dynamic } from "../lib/react-util";
import { getLocationSearchParams } from "../lib/url-params";
import { Ready, useLoadSession } from "../lib/use-session";
import { DeepReadonly } from "../lib/util";
import * as types from "../lib/generated/v1/types_pb";
import { Session } from "../lib/generated/v1/services_pb";
import { SeedText, useResultText } from "../lib/use-result-text";
import { AlignmentView } from "../elements/alignment-view";
import { ItemTypeIcon } from "../elements/icon";
import { CenterAlignTwo } from "../elements/center-align-two";
import "./result.scss";

export default function ResultPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Result lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Result(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state] = useLoadSession();

	const onReady = ({ session }: Ready): JSX.Element => {
		const pageUrn = getLocationSearchParams().get("urn");
		const result = session.resultsList.find(r => r.urn === pageUrn);

		return (
			<OverviewContainer
				{...props}
				title="Text alignment"
				backTo={toResults({
					urn: session.urn,
					view: getLocationSearchParams().get("view") ?? undefined,
				})}>
				{result ? (
					<ResultView {...props} session={session} result={result} />
				) : (
					<div className="invalid-result-error">
						<p>{l.invalidUrn}</p>
					</div>
				)}
			</OverviewContainer>
		);
	};

	return (
		<Page {...props} className="Result" header="small">
			<SessionState {...props} state={state} onReady={onReady} />
		</Page>
	);
}

interface ResultViewProps extends LocalizableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly result: DeepReadonly<types.Result.AsObject>;
}

function ResultView(props: ResultViewProps): JSX.Element {
	const l = getLocalization(props, locales);

	// TODO: Error view. For now, I'll assume that all results have status=OK
	// TODO: Account for missing items
	// TODO: Account for collections
	const resources = getResultResources(props.result, props.session)!;
	const [texts] = useResultText(props.result);

	return (
		<>
			<ResultSummary {...props} resources={resources} />
			{texts?.map((text, i) => {
				return <ResultSeedView key={i} resources={resources} text={text} />;
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

interface ResultSummaryProps extends LocalizableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly result: DeepReadonly<types.Result.AsObject>;
	readonly resources: ResultResources;
}
function ResultSummary(props: ResultSummaryProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [texts] = useResultText(props.result);

	return (
		<div className="ResultSummary">
			<p className="summary">{l.reusedPassages(props.result.seedsList.length)}</p>
			<p className="details">TODO: {texts?.reduce((a, b) => a + b.a.text.length, 0)}</p>
		</div>
	);
}

interface ResultSeedViewProps {
	readonly resources: ResultResources;
	readonly text: SeedText;
}
function ResultSeedView({ resources, text }: ResultSeedViewProps): JSX.Element {
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
				<AlignmentView left={text.a.text} right={text.b.text} />
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

const locales: Locales<SimpleString<"invalidUrn"> & { reusedPassages: (value: number) => JSX.Element }> = {
	en: {
		// TODO: Better error message
		invalidUrn: "Invalid link. The result you are trying to access is not available.",

		reusedPassages: number => (number === 1 ? <>Found 1 reused passage.</> : <>Found {number} reused passages.</>),
	},
	de: {
		invalidUrn: "Falscher Link. Das Ergebnis ist nicht verfügbar.",

		reusedPassages: number =>
			number === 1 ? (
				<>1 wiederverwendeter Abschnitt gefunden.</>
			) : (
				<>{number} wiederverwendete Abschnitte gefunden.</>
			),
	},
};
