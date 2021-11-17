import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemMeta, ItemProto } from "./session/create-item";
import { getSessionClient } from "./session/client";

export interface UploadingItem {
	readonly uploadId: string;
	readonly item: ItemMeta;
}
export interface FailedItem {
	readonly uploadId: string;
	readonly item: ItemMeta;
	readonly error: unknown;
}

type Result<O, E> = { readonly type: "Ok"; readonly value: O } | { readonly type: "Error"; readonly error: E };

interface Done {
	readonly item: UploadingItem;
	readonly result: Result<void, unknown>;
}

export type UseUploadArray = [
	uploading: readonly UploadingItem[],
	upload: (items: readonly ItemProto[], sessionId: string) => void
];
export function useUpload(
	successfulUpload: (item: ItemMeta) => void,
	failedUpload: (item: FailedItem) => void
): UseUploadArray {
	const [uploadingItems, setUploadingItems] = useState<readonly UploadingItem[]>([]);
	const [done, setDone] = useState<readonly Done[]>([]);

	const addDone = useCallback(
		(done: Done): void => {
			setDone(prev => [...prev, done]);
			setUploadingItems(prev => prev.filter(i => i.uploadId !== done.item.uploadId));
		},
		[setUploadingItems, setDone]
	);

	const upload: UseUploadArray[1] = useCallback(
		(items, sessionId) => {
			if (items.length === 0) {
				return;
			}

			const newUploads = items.map(proto => {
				const uploading: UploadingItem = {
					uploadId: uuidv4(),
					item: proto.getMeta(),
				};

				proto
					.read()
					.then(async item => {
						const request = item.getRequest(sessionId);
						await getSessionClient().createItem(request, null);
					})
					.then(
						value => addDone({ item: uploading, result: { type: "Ok", value } }),
						error => addDone({ item: uploading, result: { type: "Error", error } })
					);

				return uploading;
			});

			setUploadingItems(prev => [...prev, ...newUploads]);
		},
		[setUploadingItems, addDone]
	);

	useEffect(() => {
		if (done.length > 0) {
			for (const { item, result } of done) {
				if (result.type === "Ok") {
					successfulUpload(item.item);
				} else {
					failedUpload({ ...item, error: result.error });
				}
			}
			setDone([]);
		}
	}, [done, setDone, successfulUpload, failedUpload]);

	return [uploadingItems, upload];
}
