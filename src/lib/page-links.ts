export const toIndex = "/";

export const toLegal = "/legal/";
export const toHelp = "/help/";
export const toPoster = "/poster/";

export const toSubmit = "/submit/";
export const toAnalysis = "/analysis/";
export const toResults = "/results/";
export const toResult = "/result/";

export function withQuery(to: string, pairs: Partial<Record<string, string>>): string {
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
