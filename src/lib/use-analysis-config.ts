import { useMemo } from "react";
import { AnalysisConfig } from "./session/analysis-config";
import { State } from "./use-session";
import { EMPTY_ARRAY } from "./util";

export function useAnalysisConfig(state: State): AnalysisConfig {
	return useMemo(() => {
		if (state.type === "Ready") {
			return AnalysisConfig.fromResourcePairs(
				state.session.comparisonsList ?? EMPTY_ARRAY,
				state.session.itemsList.map(i => i.urn)
			);
		} else {
			return AnalysisConfig.EMPTY;
		}
	}, [state]);
}
