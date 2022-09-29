import { QueryFunctionContext, useQueries, useQuery, UseQueryOptions } from "react-query";
import { GetDocumentRequest } from "./generated/v1/services_pb";
import { Document } from "./generated/v1/types_pb";
import { getSessionClient } from "./session/client";
import { Urn } from "./session/urn";
import { DeepReadonly } from "./util";

type QueryData = Document.AsObject | undefined;
type QueryKey = readonly ["collection-document", string, Urn<"document">];

async function fetchDocument(context: QueryFunctionContext<QueryKey>): Promise<QueryData> {
	const [, sessionUrn, documentUrn] = context.queryKey;

	const req = new GetDocumentRequest();
	req.setSessionUrn(sessionUrn);
	req.setDocumentUrn(documentUrn);

	const resp = await getSessionClient().getDocument(req, null);
	return resp.toObject().document;
}
function getQueryOptions(
	sessionUrn: string,
	documentUrn: Urn<"document">
	// eslint-disable-next-line @typescript-eslint/ban-types
): UseQueryOptions<QueryData, unknown, QueryData, QueryKey> & { queryKey: {} } {
	return {
		queryKey: ["collection-document", sessionUrn, documentUrn],
		queryFn: fetchDocument,
		// collections are an immutable resource, so we don't need to refetch
		refetchInterval: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	};
}

export function useCollectionDocument(
	sessionUrn: string,
	documentUrn: Urn<"document">
): DeepReadonly<Document.AsObject> | undefined {
	const options = getQueryOptions(sessionUrn, documentUrn);
	const query = useQuery(options.queryKey, options);
	return query.data;
}

export function usePreloadCollectionDocuments(sessionUrn: string, documentUrns: readonly Urn<"document">[]): void {
	useQueries(documentUrns.map(urn => getQueryOptions(sessionUrn, urn)));
}
