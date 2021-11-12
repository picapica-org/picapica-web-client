import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { Icon } from "../elements/icon";
import { CreateState, ManagedState, SessionManager } from "../elements/session-manager";
import { SharedHead } from "../elements/shared-header";
import { getSessionClient } from "../lib/client";
import { CreateItemRequest, DeleteItemRequest, Session } from "../lib/generated/v1/services_pb";
import { Item } from "../lib/generated/v1/types_pb";
import {
	getCurrentLang,
	LocalizableProps,
	Locales,
	SimpleString,
	getLocalization,
	getIntlLocales,
} from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { newCreateTextItemRequest, newCreateUrlItemRequest } from "../lib/requests";
import { assertNever, DeepReadonly } from "../lib/util";
import "./submit.scss";
import { Buttons } from "../elements/buttons";

export default function SubmitPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Submit lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Submit(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const handler = useCallback(
		(s: ManagedState<CreateState>) => {
			return s.visit({
				Creating({ retries }) {
					return (
						<div className="CreateSession">
							<span>{retries === 0 ? l.creatingSession : l.failedCreatingSession}</span>
						</div>
					);
				},
				Loading({ sessionId, retries }) {
					return (
						<div className="LoadSession">
							<span>{retries === 0 ? l.loadingSession : l.failedLoadingSession}</span>
						</div>
					);
				},
				Ready({ session }) {
					return (
						<div className="Session">
							<button
								onClick={() =>
									getSessionClient()
										.createItem(
											newCreateTextItemRequest(createRandomText()).setSessionId(session.id),
											null
										)
										.then(
											() => s.reload(),
											() => console.log("error")
										)
								}>
								Random Text
							</button>
							<button
								onClick={() =>
									getSessionClient()
										.createItem(
											newCreateUrlItemRequest(prompt() ?? "empty").setSessionId(session.id),
											null
										)
										.then(
											() => s.reload(),
											() => console.log("error")
										)
								}>
								URL
							</button>

							<ul>
								{session.itemsList.map((item, i) => {
									return <li key={i}>{JSON.stringify(item)}</li>;
								})}
							</ul>

							<ItemTable {...props} session={session} reload={s.reload} />
						</div>
					);
				},
			});
		},
		[l, props]
	);

	return (
		<Page {...props} className="Submit" header="small">
			<SessionManager create handler={handler} />
		</Page>
	);
}

function createRandomText(): string {
	const len = 10 ** (Math.random() * 6);

	return Array.from({ length: len }, () => {
		if (Math.random() < 1 / 100) {
			return "\n";
		}
		if (Math.random() < 1 / 4) {
			return " ";
		}

		return String.fromCodePoint(65 + Math.floor(Math.random() * 26));
	}).join("");
}

function ItemTable(
	props: { session: DeepReadonly<Session.AsObject>; reload: () => void } & LocalizableProps
): JSX.Element {
	const l = getLocalization(props, locales);

	function deleteItem(item: Item.AsObject): void {
		const req = new DeleteItemRequest();
		req.setSessionId(props.session.id);
		req.setItemId(item.urn);

		getSessionClient()
			.deleteItem(req, null)
			.then(
				() => {
					props.reload();
				},
				err => {
					console.log(err);
				}
			);
	}

	return (
		<table className="ItemTable">
			<thead>
				<tr>
					<th className="name">{l.file}</th>
					<th className="size">{l.size}</th>
					<th className="action"></th>
				</tr>
			</thead>
			<tbody>
				{props.session.itemsList.map((item, i) => {
					return (
						<tr key={i}>
							<td className="name">
								{getIcon(item.resource?.type ?? Item.Resource.Type.TYPE_UNSPECIFIED)}
								<span className="name">{item.meta?.name ?? ""}</span>
							</td>
							<td className="size">
								<span className="size">{formatBytes(item.resource?.properties?.size ?? 0, props)}</span>
							</td>
							<td className="action">
								<button
									className={`delete ${Buttons.BUTTON} ${Buttons.SMALL}`}
									onClick={() => deleteItem(item)}>
									<Icon kind="delete-bin-5-line" />
									{l.delete}
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

function formatBytes(bytes: number, props: LocalizableProps): string {
	let unit;
	if (bytes < 1_000) {
		unit = "byte";
	} else if (bytes < 1_000_000) {
		unit = "kilobyte";
		bytes /= 1_000;
	} else {
		unit = "megabyte";
		bytes /= 1_000_000;
	}

	const formatter = new Intl.NumberFormat(getIntlLocales(props), {
		maximumSignificantDigits: 2,
		style: "unit",
		unit,
	});
	return formatter.format(bytes);
}

function getIcon(type: Item.Resource.Type): JSX.Element {
	switch (type) {
		case Item.Resource.Type.TYPE_UNSPECIFIED:
			return <>?</>;
		case Item.Resource.Type.TYPE_TEXT:
			return <Icon kind="align-left" />;
		case Item.Resource.Type.TYPE_URL:
			return <Icon kind="link" />;
		case Item.Resource.Type.TYPE_FILE:
			return <Icon kind="file-line" />;
		default:
			assertNever(type);
	}
}

const locales: Locales<
	SimpleString<
		| "creatingSession"
		| "failedCreatingSession"
		| "loadingSession"
		| "failedLoadingSession"
		| "file"
		| "size"
		| "delete"
	>
> = {
	en: {
		creatingSession: "Creating session...",
		failedCreatingSession: "Failed to create session. Trying again...",
		loadingSession: "Loading session...",
		failedLoadingSession: "Failed to loading session. Trying again...",

		file: "File",
		size: "Size",

		delete: "Delete",
	},
	de: {
		creatingSession: "Sitzung wird erstellt...",
		failedCreatingSession: "Sitzung konnte nicht erstellt werden. Es wird erneut versucht...",
		loadingSession: "Sitzung wird geladed...",
		failedLoadingSession: "Sitzung konnte nicht geladen werden. Es wird erneut versucht...",

		file: "Datei",
		size: "Größe",

		delete: "Löschen",
	},
};
