interface StorageItem<T> {
	readonly value: T;
	readonly expiredAt: number;
}

export interface ReadonlyStorageCache<K extends string, V> {
	readonly name: string;
	get(key: K): V | undefined;
}

/**
 * This implements a cache backed by a (potentially) persistent storage.
 *
 * The cached values **MUST be deeply immutable**. Modifying the cached values in any way results in undefined behavior.
 *
 * The cached values also have to be JSON-serializable.
 */
export class StorageCache<K extends string, V> implements ReadonlyStorageCache<K, V> {
	readonly name: string;

	private readonly _memCache = new Map<K, StorageItem<V>>();

	constructor(name: string) {
		this.name = name;
	}

	private _getSessionStorageKey(key: K): string {
		return `storage/${this.name}/${key}`;
	}

	get(key: K): V | undefined {
		let cached = this._memCache.get(key);

		if (cached === undefined) {
			const serialized = sessionStorage.getItem(this._getSessionStorageKey(key));
			if (serialized) {
				cached = JSON.parse(serialized) as StorageItem<V>;
				this._memCache.set(key, cached);
			}
		}

		if (cached && cached.expiredAt < Date.now()) {
			// the item has expired already
			this.delete(key);
			cached = undefined;
		}

		return cached?.value;
	}
	/**
	 * @param key
	 * @param value
	 * @param ttl Defines how many milliseconds the value will persist in cache. The value will no longer be accessible
	 * after the given duration.
	 */
	set(key: K, value: V, ttl = Infinity): void {
		const item: StorageItem<V> = {
			value,
			expiredAt: Date.now() + ttl,
		};

		this._memCache.set(key, item);
		sessionStorage.setItem(this._getSessionStorageKey(key), JSON.stringify(value));
	}
	delete(key: K): void {
		this._memCache.delete(key);
		sessionStorage.removeItem(this._getSessionStorageKey(key));
	}
}
