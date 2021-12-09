import { useState } from "react";
import { GetCollectionsRequest } from "./generated/v1/services_pb";
import { Collection } from "./generated/v1/types_pb";
import { useAsyncEffect } from "./react-util";
import { getSessionClient } from "./session/client";
import { DeepReadonly, delay, noop } from "./util";

const cache = new Map<string, DeepReadonly<Collection.AsObject[]>>();

function getCacheKey(sessionUrn: string): string {
	return `collections-cache/${sessionUrn}`;
}
function getCachedCollections(sessionUrn: string): DeepReadonly<Collection.AsObject[]> | undefined {
	let cachedCollection = cache.get(sessionUrn);

	if (cachedCollection === undefined) {
		const value = sessionStorage.getItem(getCacheKey(sessionUrn));
		if (value) {
			cachedCollection = JSON.parse(value) as DeepReadonly<Collection.AsObject[]>;
			cache.set(sessionUrn, cachedCollection);
		}
	}

	return cachedCollection;
}
function setCachedCollections(sessionUrn: string, collections: DeepReadonly<Collection.AsObject[]>): void {
	cache.set(sessionUrn, collections);
	sessionStorage.setItem(getCacheKey(sessionUrn), JSON.stringify(collections));
}

export function useCollections(sessionUrn: string): [collections: DeepReadonly<Collection.AsObject[]> | undefined] {
	const [collections, setCollections] = useState(() => getCachedCollections(sessionUrn));

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
			setCachedCollections(sessionUrn, result);
			setCollections(result);
		},
		noop,
		[sessionUrn, setCollections]
	);

	return [collections];
}
