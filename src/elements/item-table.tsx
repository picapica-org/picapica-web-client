import React, { useCallback } from "react";
import { PicaIcon } from "../elements/icon";
import { SessionMethods } from "../elements/session-manager";
import { getSessionClient } from "../lib/session/client";
import { Session } from "../lib/generated/v1/services_pb";
import { Item } from "../lib/generated/v1/types_pb";
import { LocalizableProps, Locales, SimpleString, getLocalization, getIntlLocales } from "../lib/localization";
import { assertNever, DeepReadonly } from "../lib/util";
import { Buttons } from "../elements/buttons";
import { EditInput } from "../elements/edit-input";
import { deleteItemAction, updateItemAction } from "../lib/session/actions";
import "./item-table.scss";

export interface ItemTableProps extends LocalizableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly methods: SessionMethods;
}
export function ItemTable(props: ItemTableProps): JSX.Element {
	const l = getLocalization(props, locales);

	function deleteItem(item: Item.AsObject): void {
		const { updatedSession, request } = deleteItemAction(props.session, item.urn);

		props.methods.update(
			getSessionClient()
				.deleteItem(request, null)
				.catch(err => {
					console.log(err);
				}),
			updatedSession
		);
	}

	function renameItem(item: Item.AsObject, newName: string): void {
		// clean up name
		newName = newName.replace(/\s+/g, " ").trim();

		if (item.meta?.name === newName) {
			return;
		}

		const meta = new Item.Metadata();
		meta.setName(newName);

		const { updatedSession, request } = updateItemAction(props.session, item.urn, meta);

		props.methods.update(
			getSessionClient()
				.updateItem(request, null)
				.catch(err => {
					console.log(err);
				}),
			updatedSession
		);
	}

	const validateItemName = useCallback(
		(text: string): string | false => {
			if (/^\s*$/.test(text)) {
				return l.emptyItemName;
			}
			return false;
		},
		[l]
	);

	return (
		<table className="ItemTable">
			<thead>
				<tr>
					<th className="name" colSpan={2}>
						{l.file}
					</th>
					<th className="size">{l.size}</th>
					<th className="action"></th>
				</tr>
			</thead>
			<tbody>
				{props.session.itemsList.map(item => {
					return (
						<tr key={item.urn}>
							<td className="icon">
								{getIcon(item.resource?.type ?? Item.Resource.Type.TYPE_UNSPECIFIED)}
							</td>
							<td className="name">
								<EditInput
									lang={props.lang}
									text={item.meta?.name ?? ""}
									onSubmit={newName => renameItem(item, newName)}
									validate={validateItemName}
								/>
							</td>
							<td className="size">
								<span className="size">{formatBytes(item.resource?.properties?.size ?? 0, props)}</span>
							</td>
							<td className="action">
								<button
									className={`delete ${Buttons.BUTTON} ${Buttons.SMALL} ${Buttons.RED}`}
									onClick={() => deleteItem(item)}>
									<PicaIcon kind="delete" />
									<span className="text">{l.delete}</span>
								</button>
							</td>
						</tr>
					);
				})}
				{props.session.itemsList.length === 0 && (
					<tr>
						<td className="empty" colSpan={4}>
							<em>{l.emptyItemList}</em>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

function formatBytes(bytes: number, props: LocalizableProps): string {
	let unit;
	if (bytes < 100) {
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
			return <PicaIcon kind="text" />;
		case Item.Resource.Type.TYPE_URL:
			return <PicaIcon kind="url" />;
		case Item.Resource.Type.TYPE_FILE:
			return <PicaIcon kind="file" />;
		default:
			assertNever(type);
	}
}

const locales: Locales<SimpleString<"emptyItemList" | "file" | "size" | "delete" | "emptyItemName">> = {
	en: {
		emptyItemList: "Empty",
		file: "File",
		size: "Size",

		delete: "Delete",

		emptyItemName: "The file name cannot be empty.",
	},
	de: {
		emptyItemList: "Leer",
		file: "Datei",
		size: "Größe",

		delete: "Löschen",

		emptyItemName: "Der Name kann nicht leer sein.",
	},
};
