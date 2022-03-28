import { useQuery } from "react-query";
import { GetTextRequest, GetTextResponse } from "./generated/v1/services_pb";
import { Result, Span } from "./generated/v1/types_pb";
import { getSessionClient } from "./session/client";
import { PicapicaUrn } from "./session/urn";
import { DeepReadonly } from "./util";

export interface SeedText {
	readonly a: ResultText;
	readonly b: ResultText;
}
export interface ResultText {
	readonly resourceUrn: string;
	readonly span: DeepReadonly<Span.AsObject>;
	readonly text: string;
}

export function useResultText(result: DeepReadonly<Result.AsObject>): [readonly SeedText[] | undefined] {
	const query = useQuery(["result-text", result.urn] as const, {
		// text is an immutable resource, so we don't need to refetch
		refetchInterval: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,

		queryFn: async () => {
			const data = getSpanData(result);
			const client = getSessionClient();

			const resultUrn = PicapicaUrn.parse(result.urn);
			if (resultUrn.type !== "result") throw new Error("Invalid result urn.");
			const sessionUrn = PicapicaUrn.stringify({ type: "session", sessionId: resultUrn.sessionId });

			const texts = await Promise.all(
				data.map(({ resourceUrn, span }) => {
					const s = new Span();
					s.setBegin(span.begin);
					s.setEnd(span.end);
					s.setIndex(span.index);

					const req = new GetTextRequest();
					req.setSessionUrn(sessionUrn);
					req.setItemUrn(resourceUrn);
					req.setSpan(s);

					return client.getText(req, null);
				})
			);

			return getSeedTexts(data, texts);
		},
	});

	return [query.data];
}

interface SpanData {
	resourceUrn: string;
	span: DeepReadonly<Span.AsObject>;
}
function getSpanData(result: DeepReadonly<Result.AsObject>): SpanData[] {
	const data: SpanData[] = [];

	if (!result.resources) throw new Error("Invalid result object: Undefined resources");
	const { urnA, urnB } = result.resources;

	for (const { span1, span2 } of result.seedsList) {
		if (!span1 || !span2) throw new Error("Invalid result object: Undefined span in seed list");
		data.push({ resourceUrn: urnA, span: span1 });
		data.push({ resourceUrn: urnB, span: span2 });
	}

	return data;
}

function getSeedTexts(data: readonly SpanData[], texts: readonly GetTextResponse[]): SeedText[] {
	const result: SeedText[] = [];

	for (let i = 0; i < data.length; i += 2) {
		result.push({
			a: { ...data[i + 0], text: texts[i + 0].getTextSpan()?.getText() ?? "" },
			b: { ...data[i + 1], text: texts[i + 1].getTextSpan()?.getText() ?? "" },
		});
	}

	return result;
}
