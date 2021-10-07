export interface ReadonlyURLSearchParams {
	/**
	 * Returns the first value associated to the given search parameter.
	 */
	get(name: string): string | null;
	/**
	 * Returns all the values association with a given search parameter.
	 */
	getAll(name: string): string[];
	/**
	 * Returns a Boolean indicating if such a search parameter exists.
	 */
	has(name: string): boolean;
	/**
	 * Returns a string containing a query string suitable for use in a URL. Does not include the question mark.
	 */
	toString(): string;
	forEach(callbackfn: (value: string, key: string, parent: ReadonlyURLSearchParams) => void, thisArg?: any): void;

	[Symbol.iterator](): IterableIterator<[string, string]>;
	/**
	 * Returns an array of key, value pairs for every entry in the search params.
	 */
	entries(): IterableIterator<[string, string]>;
	/**
	 * Returns a list of keys in the search params.
	 */
	keys(): IterableIterator<string>;
	/**
	 * Returns a list of values in the search params.
	 */
	values(): IterableIterator<string>;
}

export function getURLSearchParams(): ReadonlyURLSearchParams {
	return new URLSearchParams(location.search);
}

export function changeURLSearchParams(mode: "push" | "replace", changes: Record<string, string | null>): void {
	const url = new URL(location.href);

	let didChange = false;

	for (const name in changes) {
		if (Object.prototype.hasOwnProperty.call(changes, name)) {
			const value = changes[name];

			if (url.searchParams.get(name) === value) {
				// nothing has to be done
				continue;
			}

			if (value === null) {
				url.searchParams.delete(name);
			} else {
				url.searchParams.set(name, value);
			}

			didChange = true;
		}
	}

	if (!didChange) {
		return;
	}

	if (mode === "push") {
		history.pushState(history.state, "", url);
	} else {
		history.replaceState(history.state, "", url);
	}
}
