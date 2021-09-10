export function firstOf<T>(iter: Iterable<T>): T | undefined {
	for (const item of iter) {
		return item;
	}
	return undefined;
}

export function assertNever(value: never): never {
	throw new Error(`Unexpected value: ${value}`);
}
