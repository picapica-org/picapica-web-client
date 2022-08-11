import { useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Item, Timestamp } from "./generated/v1/types_pb";
import { getSessionClient } from "./session/client";
import { ItemMeta, ItemProto, toItemResourceType } from "./session/create-item";
import { SessionMutator } from "./session/mutator";
import { cloneSession, createTimestamp } from "./session/util";
import { Result } from "./util";

export type UploadId = string & { readonly __uploadId: never };

export interface UploadingItem {
	readonly uploadId: UploadId;
	readonly item: ItemMeta;
	readonly startTimestamp: Timestamp.AsObject;
}
export interface UploadedItem extends UploadingItem {
	readonly itemUrn: string;
}
export interface FailedItem extends UploadingItem {
	readonly error: unknown;
}

interface Done {
	readonly item: UploadingItem;
	readonly result: Result<string, unknown>;
}

export type UseUploadArray = [
	uploading: readonly UploadingItem[],
	upload: (items: readonly ItemProto[], sessionUrn: string) => void
];
export function useUpload(
	successfulUpload: (item: UploadedItem) => void,
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
		(items, sessionUrn) => {
			if (items.length === 0) {
				return;
			}

			const newUploads = items.map(proto => {
				const uploading: UploadingItem = {
					uploadId: uuidV4() as UploadId,
					item: proto.getMeta(),
					startTimestamp: createTimestamp(),
				};

				proto
					.read()
					.then(async item => {
						const request = item.getRequest(sessionUrn);
						request.addComparisonUrns(sessionUrn);
						const response = await getSessionClient().createItem(request, null);
						return response.getItemUrn();
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
					successfulUpload({ ...item, itemUrn: result.value });
				} else {
					failedUpload({ ...item, error: result.error });
				}
			}
			setDone([]);
		}
	}, [done, setDone, successfulUpload, failedUpload]);

	return [uploadingItems, upload];
}

export function optimisticallyAddItem({ item, itemUrn }: UploadedItem): SessionMutator {
	return oldSession => {
		const session = cloneSession(oldSession);

		// add item
		session.itemsList.push({
			urn: itemUrn,
			meta: { name: item.name },
			resource: {
				itemUrn,
				type: toItemResourceType(item.type),
				status: Item.Resource.ProcessingStatus.STATUS_RUNNING,
				rawProperties: { checksum: "fake", size: item.size },
				textProperties: { checksum: "fake", length: 0 },
			},
		});

		// add comparison URNs
		session.comparisonsList.push({ urnA: itemUrn, urnB: session.urn });

		return session;
	};
}
