import { Session } from "./generated/v1/services_pb";
import { StorageCache } from "./storage-cache";
import { DeepReadonly } from "./util";

interface CacheItem {
	readonly id: string;
	readonly when: number;
}
const lastComputeCache = new StorageCache<string, CacheItem>("last-compute-cache");

function getComputeIdentity(session: DeepReadonly<Session.AsObject>): string {
	return JSON.stringify(session.config ?? {});
}

export function getLastCompute(session: DeepReadonly<Session.AsObject>): Date | undefined {
	const currentId = getComputeIdentity(session);

	const last = lastComputeCache.get(session.urn);
	if (last?.id === currentId) {
		return new Date(last.when);
	}
	return undefined;
}

export function setLastCompute(session: DeepReadonly<Session.AsObject>): void {
	lastComputeCache.set(session.urn, {
		id: getComputeIdentity(session),
		when: Date.now(),
	});
}
