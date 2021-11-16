export type DeepRequired<T> = {
	[P in keyof T]-?: DeepRequired<T[P]>;
};

export type DeepReadonly<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export function lazy<T>(supplier: () => NonNullable<T>): () => T {
	let value: T | undefined = undefined;
	return () => {
		if (value === undefined) {
			value = supplier();
		}
		return value;
	};
}

export function delay(ms: number): Promise<void> {
	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}

export function firstOf<T>(iter: Iterable<T>): T | undefined {
	for (const item of iter) {
		return item;
	}
	return undefined;
}

export interface CategoryGroup<T, G> {
	category: G;
	items: T[];
}
export function groupByCategory<T, G>(
	iter: Iterable<T>,
	categorize: (item: T, index: number) => G
): CategoryGroup<T, G>[] {
	const result: CategoryGroup<T, G>[] = [];

	let index = 0;
	for (const item of iter) {
		const category = categorize(item, index++);

		const last = result[result.length - 1] as CategoryGroup<T, G> | undefined;
		if (last && last.category === category) {
			last.items.push(item);
		} else {
			result.push({ category, items: [item] });
		}
	}

	return result;
}

export type Comparator<A, B = A> = (a: A, b: B) => boolean;

export function endsWith<A, B>(sequence: readonly A[], needle: readonly B[], comparator?: Comparator<A, B>): boolean {
	if (needle.length > sequence.length) {
		return false;
	}

	const start = sequence.length - needle.length;
	if (comparator) {
		for (let j = 0; j < needle.length; j++) {
			if (!comparator(sequence[start + j], needle[j])) {
				return false;
			}
		}
	} else {
		for (let j = 0; j < needle.length; j++) {
			if ((sequence[start + j] as unknown) !== needle[j]) {
				return false;
			}
		}
	}
	return true;
}

export function shorten(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	} else {
		const chars = [...text];
		if (chars.length <= maxLength) {
			return text;
		}
		return chars.slice(0, maxLength).join("") + "…";
	}
}

export function debugAssert(condition: boolean, message?: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertNever(value: never): never {
	throw new Error(`Unexpected value: ${value}`);
}

export function noop(): void {
	// noop
}

export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}
