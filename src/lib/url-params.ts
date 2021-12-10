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

/**
 * Returns the search parameters of the current document location.
 */
export function getLocationSearchParams(): ReadonlyURLSearchParams {
	return new URLSearchParams(location.search);
}

export type SearchParamsChanges = Record<string, string | null>;

/**
 * Changes the URL search parameters of the given URL and returns whether the given URL was changed.
 */
export function changeUrlSearchParams(url: URL, changes: SearchParamsChanges): boolean {
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

	return didChange;
}

/**
 * Returns the current URL with the given changes applied to it.
 */
export function getChangedLocationSearchParams(changes: SearchParamsChanges): URL {
	const url = new URL(location.href);
	changeUrlSearchParams(url, changes);
	return url;
}

/**
 * Changes the search parameters of the current document location.
 */
export function changeLocationSearchParams(mode: "push" | "replace", changes: SearchParamsChanges): void {
	const url = new URL(location.href);

	if (!changeUrlSearchParams(url, changes)) {
		return;
	}

	if (mode === "push") {
		history.pushState(history.state, "", url);
	} else {
		history.replaceState(history.state, "", url);
	}
}
