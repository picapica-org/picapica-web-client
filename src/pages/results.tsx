import React, { useState } from "react";
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
import { toResult, toResults } from "../lib/page-links";
import { getSessionClient } from "../lib/session/client";
import { ComputeResultsRequest, Session } from "../lib/generated/v1/services_pb";
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

	// request computation
	const [didCompute, setDidCompute] = useState(false);
	useAsyncEffect(
		async token => {
			if (didCompute) return;

			if (state.type !== "Ready") return;
			if (state.session.status === Session.ComputeStatus.STATUS_RUNNING) {
				setDidCompute(true);
				return;
			}

			const req = new ComputeResultsRequest();
			req.setSessionUrn(state.session.urn);

			for (;;) {
				try {
					console.log("requesting");

					const resp = await getSessionClient().computeResults(req, null);
					setDidCompute(true);
					update(Promise.resolve(), noMutation);
					return resp;
				} catch (error) {
					// wait some time and retry
					token.checkCanceled();
					await delay(3_000);
					token.checkCanceled();
				}
			}
		},
		noop,
		noop,
		[state, update, didCompute, setDidCompute]
	);

	// display result
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

		const running = session.status === Session.ComputeStatus.STATUS_RUNNING;

		return (
			<>
				{current}

				{running && <p>{l.running}</p>}

				<p>
					<BackButton {...props} to={getLinkToStep("analysis", session.urn)} />
				</p>
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

const locales: Locales<SimpleString<"running">> = {
	en: {
		running: "Your submitted files are currently being processed. This might take a few seconds.",
	},
	de: {
		running: "Ihre Eingabe wird bearbeited. Dies kann ein paar Sekunden dauern.",
	},
};
