import React, { useCallback, useContext } from "react";
import { LocalizationContext } from "../context/localization";
import { Buttons } from "../elements/buttons";
import { EditInput, TextView } from "../elements/edit-input";
import { ItemTypeIcon, PicaIcon } from "../elements/icon";
import { Session } from "../lib/generated/v1/services_pb";
import { Item } from "../lib/generated/v1/types_pb";
import { getIntlLocales, Locales, LocalizableOptions, SimpleString } from "../lib/localization";
import { deleteItemAction, updateItemAction } from "../lib/session/actions";
import { getSessionClient } from "../lib/session/client";
import { compareTimestamps, sortSessionItems } from "../lib/session/util";
import { useLocalization } from "../lib/use-localization";
import { UseSessionArray } from "../lib/use-session";
import { FailedItem, UploadId, UploadingItem } from "../lib/use-upload";
import { DeepReadonly, noop } from "../lib/util";
import { LoaderAnimation } from "./loader-animation";
import "./item-table.scss";

export interface ItemTableProps {
	readonly session: DeepReadonly<Session.AsObject>;
	readonly uploading: readonly UploadingItem[];
	readonly failed: readonly FailedItem[];
	readonly removeFailed: (uploadId: UploadId) => void;
	readonly update: UseSessionArray[1];
}
export function ItemTable({ session, uploading, failed, removeFailed, update }: ItemTableProps): JSX.Element {
	const localizationOptions = useContext(LocalizationContext);
	const l = useLocalization(locales);

	const items = sortSessionItems(session.itemsList).reverse();

	function deleteItem(item: Item.AsObject): void {
		const { mutate, request } = deleteItemAction(session, item.urn);

		update(
			getSessionClient()
				.deleteItem(request, null)
				.then(noop, err => {
					console.log(err);
				}),
			mutate
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

		const { mutate, request } = updateItemAction(session, item.urn, meta);

		update(
			getSessionClient()
				.updateItem(request, null)
				.then(noop, err => {
					console.log(err);
				}),
			mutate
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
				{[...failed]
					.sort((a, b) => compareTimestamps(a.startTimestamp, b.startTimestamp))
					.map(({ item, uploadId }, i) => {
						return (
							<tr key={uploadId} className={"failed-item" + (i === 0 ? " first" : "")}>
								<td className="icon">
									<PicaIcon kind="failed" />
								</td>
								<td className="name">
									<TextView text={item.name} />
								</td>
								<td className="size">
									<span className="size">{formatBytes(item.size, localizationOptions)}</span>
								</td>
								<td className="action">
									<button
										className={`delete ${Buttons.BUTTON} ${Buttons.SMALL} ${Buttons.RED}`}
										onClick={() => removeFailed(uploadId)}>
										<PicaIcon kind="delete" />
										<span className="text">{l.delete}</span>
									</button>
								</td>
							</tr>
						);
					})}
				{[...uploading]
					.sort((a, b) => -compareTimestamps(a.startTimestamp, b.startTimestamp))
					.map(({ item, uploadId }, i) => {
						return (
							<tr key={uploadId} className={"uploading-item" + (i === 0 ? " first" : "")}>
								<td className="icon">
									<LoaderAnimation />
								</td>
								<td className="name">
									<TextView text={item.name} />
								</td>
								<td className="size">
									<span className="size">{formatBytes(item.size, localizationOptions)}</span>
								</td>
								<td className="action"></td>
							</tr>
						);
					})}
				{items.map((item, i) => {
					return (
						<tr key={item.urn} className={"session-item" + (i === 0 ? " first" : "")}>
							<td className="icon">
								<ItemTypeIcon type={item.resource?.type ?? Item.Resource.Type.TYPE_UNSPECIFIED} />
							</td>
							<td className="name">
								<EditInput
									text={item.meta?.name ?? ""}
									onSubmit={newName => renameItem(item, newName)}
									validate={validateItemName}
								/>
							</td>
							<td className="size">
								<span className="size">
									{formatBytes(item.resource?.rawProperties?.size ?? 0, localizationOptions)}
								</span>
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
				{items.length === 0 && uploading.length === 0 && failed.length === 0 && (
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

function formatBytes(bytes: number, props: LocalizableOptions): string {
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
