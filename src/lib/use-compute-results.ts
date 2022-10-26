import { useState } from "react";
import { ComputeResultsRequest, Session } from "./generated/v1/services_pb";
import { useAsyncEffect } from "./react-util";
import { getSessionClient } from "./session/client";
import { SessionMutator } from "./session/mutator";
import { cloneSession, compareTimestamps } from "./session/util";
import { State, UseSessionArray } from "./use-session";
import { delay, noop } from "./util";

const mutator: SessionMutator = session => {
	if (session.status === Session.ComputeStatus.STATUS_UNDEFINED) {
		// we want to set the state to RUNNING as soon as possible to indicate progress.
		const newSession = cloneSession(session);
		newSession.status = Session.ComputeStatus.STATUS_RUNNING;
		return newSession;
	}

	return session;
};

export function useComputerResults(state: State, update: UseSessionArray[1]): void {
	const [retryCount, setRetryCount] = useState(0);

	useAsyncEffect(
		async token => {
			if (state.type !== "Ready") return;

			const { session } = state;
			if (session.status === Session.ComputeStatus.STATUS_RUNNING) return;
			if (
				session.status === Session.ComputeStatus.STATUS_COMPLETED ||
				session.status === Session.ComputeStatus.STATUS_FAILED
			) {
				const { computedAt, modifiedAt } = session;
				if (compareTimestamps(computedAt!, modifiedAt!) >= 0) {
					// We have already computed the results since the last time the session was modified
					return;
				}
			}

			if (retryCount > 0) {
				// wait some time and retry
				await delay(3_000);
				token.checkCanceled();
			}

			const req = new ComputeResultsRequest();
			req.setSessionUrn(session.urn);

			console.log("Compute results");
			const action = getSessionClient()
				.computeResults(req, null)
				.then(
					() => {
						update(action, mutator);
						setRetryCount(0);
					},
					e => {
						setRetryCount(prev => prev + 1);
						throw e;
					}
				)
				.catch(console.log);
		},
		noop,
		noop,
		[state, update, retryCount, setRetryCount]
	);
}
