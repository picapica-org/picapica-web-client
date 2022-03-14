import { useState } from "react";
import { ComputeResultsRequest, Session } from "./generated/v1/services_pb";
import { getLastCompute, setLastCompute } from "./last-compute";
import { useAsyncEffect } from "./react-util";
import { getSessionClient } from "./session/client";
import { SessionMutator } from "./session/mutator";
import { cloneSession } from "./session/util";
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
			if (getLastCompute(session) !== undefined) return;

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
						setLastCompute(session);
						setRetryCount(0);
					},
					e => {
						setRetryCount(prev => prev + 1);
						throw e;
					}
				);

			update(action, mutator);
		},
		noop,
		noop,
		[state, update, retryCount, setRetryCount]
	);
}
