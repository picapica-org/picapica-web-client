import React from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { dynamic, useAsyncEffect } from "../lib/react-util";
import { getLinkToStep } from "../elements/step-selector";
import { BackButton } from "../elements/step-buttons";
import { SessionState } from "../elements/session-creating-loading";
import { getSessionUrn, Ready, useLoadSession } from "../lib/use-session";
import { delay, noop, visitType } from "../lib/util";
import { noMutation } from "../lib/session/mutator";
import { useCollections } from "../lib/use-collections";
import { CollectionResultsOverview, ItemResultsOverview, ResultsOverview } from "../elements/results-overview";
import { getLocationSearchParams } from "../lib/url-params";
import { LoaderAnimation } from "../elements/loader-animation";
import { toResult, toResults } from "../lib/page-links";
import "./results.scss";

export default function ResultsPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Results lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Results(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state, update] = useLoadSession();

	// Reload the current session as long as there are incomplete results
	useAsyncEffect(
		async token => {
			if (state.type === "Ready" && state.session.resultsList.some(result => !result.completed)) {
				// There are some results that have not completed yet.

				// wait 3s so we don't spam the server
				await delay(3_000);
				token.checkCanceled();

				update(Promise.resolve(), noMutation);
			}
		},
		noop,
		noop,
		[state, update]
	);

	const [collections] = useCollections(getSessionUrn(state));
	console.log(collections);

	const view = getCurrentView();

	const onReady = ({ session }: Ready): JSX.Element => {
		const current: JSX.Element = visitType(view, {
			overview: () => (
				<ResultsOverview
					{...props}
					session={session}
					collections={collections}
					itemTo={getLinkToView(session.urn, VIEW_ITEMS)}
					collectionTo={collectionUrn => getLinkToView(session.urn, { type: "collection", collectionUrn })}
				/>
			),
			items: () => (
				<ItemResultsOverview
					{...props}
					session={session}
					backTo={getLinkToView(session.urn, VIEW_OVERVIEW)}
					resultTo={result => toResult({ urn: result.urn })}
				/>
			),
			collection: ({ collectionUrn }) => (
				<CollectionResultsOverview
					{...props}
					collectionUrn={collectionUrn}
					session={session}
					collections={collections}
					backTo={getLinkToView(session.urn, VIEW_OVERVIEW)}
					resultTo={result => toResult({ urn: result.urn })}
				/>
			),
		});

		return (
			<>
				{current}

				<BackButton {...props} to={getLinkToStep("analysis", session.urn)} />

				{view.type}

				<LoaderAnimation />
			</>
		);
	};

	return (
		<Page {...props} className="Results" header="small">
			<SessionState {...props} state={state} onReady={onReady} />
		</Page>
	);
}

type View =
	| { readonly type: "overview" }
	| { readonly type: "items" }
	| { readonly type: "collection"; readonly collectionUrn: string };
const VIEW_OVERVIEW: View = { type: "overview" };
const VIEW_ITEMS: View = { type: "items" };

function getCurrentView(): View {
	const view = getLocationSearchParams().get("view");

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
function getLinkToView(sessionUrn: string, view: View): string {
	let viewValue;
	if (view.type === "items") {
		viewValue = "items";
	} else if (view.type === "collection") {
		viewValue = `collection:${view.collectionUrn}`;
	} else {
		viewValue = undefined;
	}

	return toResults({ urn: sessionUrn, view: viewValue });
}

const locales: Locales<SimpleString<"instruction">> = {
	en: {
		instruction: "TODO",
	},
	de: {
		instruction: "TODO",
	},
};
