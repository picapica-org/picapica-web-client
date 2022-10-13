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

export interface UseUpload {
	readonly uploading: readonly UploadingItem[];
	readonly upload: (items: readonly ItemProto[], sessionUrn: string) => void;
	readonly failed: readonly FailedItem[];
	readonly removeFailed: (uploadId: UploadId) => void;
}
export function useUpload(successfulUpload: (item: UploadedItem) => void): UseUpload {
	const [uploadingItems, setUploadingItems] = useState<readonly UploadingItem[]>([]);
	const [done, setDone] = useState<readonly Done[]>([]);

	const [failed, setFailed] = useState<readonly FailedItem[]>([]);
	const addFailed = useCallback((failed: FailedItem): void => setFailed(prev => [...prev, failed]), [setFailed]);
	const removeFailed = useCallback(
		(uploadId: UploadId): void => setFailed(prev => prev.filter(item => item.uploadId !== uploadId)),
		[setFailed]
	);

	const addDone = useCallback(
		(done: Done): void => {
			setDone(prev => [...prev, done]);
			setUploadingItems(prev => prev.filter(i => i.uploadId !== done.item.uploadId));
		},
		[setUploadingItems, setDone]
	);

	const upload: UseUpload["upload"] = useCallback(
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
					addFailed({ ...item, error: result.error });
				}
			}
			setDone([]);
		}
	}, [done, setDone, successfulUpload, addFailed]);

	return { uploading: uploadingItems, upload, failed, removeFailed };
}

export function optimisticallyAddItem({ item, itemUrn }: UploadedItem): SessionMutator {
	return oldSession => {
		const session = cloneSession(oldSession);

		const s = Date.now() / 1000;
		const seconds = Math.floor(s);
		const nanos = (s - seconds) * 10e9;
		const now: Timestamp.AsObject = { nanos, seconds };

		// add item
		session.itemsList.push({
			urn: itemUrn,
			createdAt: now,
			modifiedAt: now,
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
