import { useQuery } from "react-query";
import { GetCollectionsRequest } from "./generated/v1/services_pb";
import { Collection } from "./generated/v1/types_pb";
import { getSessionClient } from "./session/client";
import { DeepReadonly } from "./util";

export function useCollections(sessionUrn: string): [collections: DeepReadonly<Collection.AsObject[]> | undefined] {
	const query = useQuery(["collections", sessionUrn] as const, {
		queryFn: async () => {
			const req = new GetCollectionsRequest();
			req.setSessionUrn(sessionUrn);

			const resp = await getSessionClient().getCollections(req, null);
			return resp.toObject().collectionsList;
		},
	});

	return [query.data];
}
