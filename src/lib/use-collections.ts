import { useState } from "react";
import { GetCollectionsRequest } from "./generated/v1/services_pb";
import { Collection } from "./generated/v1/types_pb";
import { useAsyncEffect } from "./react-util";
import { getSessionClient } from "./session/client";
import { StorageCache } from "./storage-cache";
import { DeepReadonly, delay, noop } from "./util";

const cache = new StorageCache<string, DeepReadonly<Collection.AsObject[]>>("collections");

export function useCollections(sessionUrn: string): [collections: DeepReadonly<Collection.AsObject[]> | undefined] {
	const [collections, setCollections] = useState(() => cache.get(sessionUrn));

	useAsyncEffect(
		async token => {
			for (;;) {
				try {
					const req = new GetCollectionsRequest();
					req.setSessionUrn(sessionUrn);

					const resp = await getSessionClient().getCollections(req, null);
					return resp.toObject().collectionsList;
				} catch (e) {
					console.log(e);
				}

				// wait 3s and retry
				token.checkCanceled();
				await delay(3_000);
				token.checkCanceled();
			}
		},
		result => {
			cache.set(sessionUrn, result);
			setCollections(result);
		},
		noop,
		[sessionUrn, setCollections]
	);

	return [collections];
}
