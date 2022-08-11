import { useQuery } from "react-query";
import { GetDocumentRequest } from "./generated/v1/services_pb";
import { Document } from "./generated/v1/types_pb";
import { getSessionClient } from "./session/client";
import { DeepReadonly } from "./util";

export function useCollectionDocument(
	sessionUrn: string,
	documentUrn: string
): [collections: DeepReadonly<Document.AsObject> | undefined] {
	const query = useQuery(["collection-document", sessionUrn, documentUrn] as const, {
		// collections are an immutable resource, so we don't need to refetch
		refetchInterval: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,

		queryFn: async () => {
			const req = new GetDocumentRequest();
			req.setSessionUrn(sessionUrn);
			req.setDocumentUrn(documentUrn);

			const resp = await getSessionClient().getDocument(req, null);
			return resp.toObject().document;
		},
	});

	return [query.data];
}
