import { Session } from "../generated/v1/services_pb";
import { DeepReadonly, identity } from "../util";

export type SessionMutator = (session: DeepReadonly<Session.AsObject>) => DeepReadonly<Session.AsObject>;

export const noMutation: SessionMutator = identity;
