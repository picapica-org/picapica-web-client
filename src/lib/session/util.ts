import { Session } from "../generated/v1/services_pb";
import { Item, Timestamp } from "../generated/v1/types_pb";
import { DeepReadonly } from "../util";

export function cloneSession(session: DeepReadonly<Session.AsObject>): Session.AsObject {
	return JSON.parse(JSON.stringify(session));
}

export function compareTimestamps(a: Timestamp.AsObject, b: Timestamp.AsObject): number {
	if (a.seconds === b.seconds) return a.nanos - b.nanos;
	return a.seconds - b.seconds;
}

export function sortSessionItems(items: readonly DeepReadonly<Item.AsObject>[]): DeepReadonly<Item.AsObject>[] {
	return [...items].sort((a, b) => {
		const aCreated = a.createdAt;
		const bCreated = b.createdAt;

		if (!aCreated && !bCreated) return 0;
		if (!aCreated) return -1; // a < b
		if (!bCreated) return +1; // b < a

		return compareTimestamps(aCreated, bCreated) || a.urn.localeCompare(b.urn);
	});
}
