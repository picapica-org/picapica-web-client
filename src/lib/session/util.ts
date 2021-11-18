import { Session } from "../generated/v1/services_pb";
import { DeepReadonly } from "../util";

export function cloneSession(session: DeepReadonly<Session.AsObject>): Session.AsObject {
	return JSON.parse(JSON.stringify(session));
}
