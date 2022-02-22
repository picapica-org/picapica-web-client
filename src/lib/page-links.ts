export const toIndex = "/";

export const toLegal = "/legal/";
export const toHelp = "/help/";
export const toPoster = "/poster/";

export const toSubmit = withParameters<{ urn?: string }>("/submit/");
export const toAnalysis = withParameters<{ urn: string }>("/analysis/");
export const toResults = withParameters<{ urn: string; view?: string }>("/results/");
export const toResult = withParameters<{ urn: string; view?: string }>("/result/");

function withParameters<Parameters extends Partial<Record<string, string>>>(
	to: string
): Partial<Parameters> extends Parameters
	? (pairs?: Readonly<Parameters>) => string
	: (pairs: Readonly<Parameters>) => string {
	return (parameters: Readonly<Parameters> | undefined) => withQuery(to, parameters);
}

function withQuery(to: string, pairs: Partial<Record<string, string>> | undefined): string {
	if (!pairs) {
		return to;
	}

	const params = new URLSearchParams();

	for (const name in pairs) {
		if (Object.prototype.hasOwnProperty.call(pairs, name)) {
			const value = pairs[name];
			if (value !== undefined) {
				params.set(name, value);
			}
		}
	}

	const search = params.toString();
	if (search) {
		return `${to}?${search}`;
	} else {
		return to;
	}
}
