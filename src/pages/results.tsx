import React, { useMemo } from "react";
import { Page } from "../elements/page";
import { CollectionResultsOverview, ItemResultsOverview, ResultsOverview } from "../elements/results-overview";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { getLinkToStep } from "../elements/step-selector";
import { Session } from "../lib/generated/v1/services_pb";
import { Result } from "../lib/generated/v1/types_pb";
import { Locales, SimpleString } from "../lib/localization";
import { toResult, toResults } from "../lib/page-links";
import { dynamicComponent } from "../lib/react-util";
import { Urn } from "../lib/session/urn";
import { getLocationSearchParams } from "../lib/url-params";
import { useAnalysisConfig } from "../lib/use-analysis-config";
import { useCollections } from "../lib/use-collections";
import { useComputerResults } from "../lib/use-compute-results";
import { useLocalization } from "../lib/use-localization";
import { getSessionUrn, Ready, useLoadSession } from "../lib/use-session";
import { DeepReadonly, visitType } from "../lib/util";
import "./results.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica</title>
		<meta name="robots" content="noindex"></meta>
		<SharedHead />
	</>
);

export default dynamicComponent(Results);

function Results(): JSX.Element {
	const l = useLocalization(locales);

	const [state, update] = useLoadSession();

	// request computation
	useComputerResults(state, update);

	// display result
	const [collections] = useCollections(getSessionUrn(state));

	const view = getCurrentView();
	const getLinkToResult = (result: DeepReadonly<Result.AsObject>): string => {
		return toResult({ urn: result.urn, view: stringifyView(view) });
	};

	const config = useAnalysisConfig(state);
	const selectedCollections = useMemo(
		() => [...config.collections].filter(e => e[1].size > 0).map(e => e[0] as Urn<"collection">),
		[config]
	);

	const onReady = ({ session }: Ready): JSX.Element => {
		const current: JSX.Element = visitType(view, {
			overview: () => (
				<ResultsOverview
					session={session}
					collections={collections}
					selectedCollections={selectedCollections}
					backTo={getLinkToStep("analysis", session.urn)}
					itemTo={getLinkToView(session.urn, VIEW_ITEMS)}
					collectionTo={collectionUrn => getLinkToView(session.urn, { type: "collection", collectionUrn })}
				/>
			),
			items: () => (
				<ItemResultsOverview
					session={session}
					backTo={getLinkToView(session.urn, VIEW_OVERVIEW)}
					resultTo={getLinkToResult}
				/>
			),
			collection: ({ collectionUrn }) => (
				<CollectionResultsOverview
					collectionUrn={collectionUrn}
					session={session}
					collections={collections}
					backTo={getLinkToView(session.urn, VIEW_OVERVIEW)}
					resultTo={getLinkToResult}
				/>
			),
		});

		const running = session.status === Session.ComputeStatus.STATUS_RUNNING;

		return (
			<>
				{current}

				<p className="loading" style={running ? {} : { opacity: 0, userSelect: "none" }}>
					{l.running}
				</p>
			</>
		);
	};

	return (
		<Page className="Results" title={l.title} header="small">
			<SessionState state={state} onReady={onReady} />
		</Page>
	);
}

type View =
	| { readonly type: "overview" }
	| { readonly type: "items" }
	| { readonly type: "collection"; readonly collectionUrn: string };
const VIEW_OVERVIEW: View = { type: "overview" };
const VIEW_ITEMS: View = { type: "items" };

function parseView(view: string): View {
	if (view) {
		if (view === "items") {
			return VIEW_ITEMS;
		}

		const m = /^collection:([^]+)$/.exec(view);
		if (m) {
			return { type: "collection", collectionUrn: m[1] };
		}
	}

	return VIEW_OVERVIEW;
}
function stringifyView(view: View): string | undefined {
	if (view.type === "items") {
		return "items";
	} else if (view.type === "collection") {
		return `collection:${view.collectionUrn}`;
	} else {
		return undefined;
	}
}

function getCurrentView(): View {
	const view = getLocationSearchParams().get("view");
	return view ? parseView(view) : VIEW_OVERVIEW;
}
function getLinkToView(sessionUrn: string, view: View): string {
	return toResults({ urn: sessionUrn, view: stringifyView(view) });
}

const locales: Locales<SimpleString<"title" | "running">> = {
	en: {
		title: "Results - Picapica",

		running: "Your submitted files are currently being processed. This might take a few seconds.",
	},
	de: {
		title: "Ergebnisse - Picapica",

		running: "Ihre Eingabe wird bearbeitet. Dies kann ein paar Sekunden dauern.",
	},
};
