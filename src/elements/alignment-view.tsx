import React from "react";
import { getCombinedDiff, LeftChange, RightChange, WordToken } from "../lib/alignment";
import { CategoryGroup, groupByCategory } from "../lib/util";
import "./alignment-view.scss";

export interface Props {
	readonly left: string;
	readonly right: string;
}

export function AlignmentView(props: Props): JSX.Element {
	const { diff, scores } = getCombinedDiff(props.left, props.right);

	return (
		<div className="AlignmentView">
			{diff.map(({ left }, i) => {
				return <Change key={"l" + i} left={left} index={i} scores={scores} />;
			})}
			{diff.map(({ right }, i) => {
				return <Change key={"r" + i} right={right} index={i} scores={scores} />;
			})}
		</div>
	);
}

function Change(
	props: ({ left: LeftChange } | { right: RightChange }) & { index: number; scores: Map<WordToken, number> }
): JSX.Element {
	let equalTokens: readonly WordToken[];
	let type: "left" | "right";
	let changedTokens;
	if ("left" in props) {
		equalTokens = props.left.equal;
		type = "left";
		changedTokens = props.left.removed;
	} else {
		equalTokens = props.right.equal;
		type = "right";
		changedTokens = props.right.added;
	}

	const changedClass = type === "left" ? "removed" : "added";

	const groups = groupByCategory([...equalTokens, ...changedTokens], (t, i) => {
		if (i < equalTokens.length) {
			return "unchanged";
		}
		const score = quantizeScore(props.scores.get(t) ?? 0);
		if (score !== "ignore") {
			return `partial-${score}`;
		}
		return changedClass;
	});

	return (
		<div className={type} style={{ gridRow: props.index + 1 }}>
			{renderGroups(groups)}
		</div>
	);
}

function renderGroups(groups: readonly CategoryGroup<WordToken, string>[]): JSX.Element {
	const combined = groups.map(g => ({ name: g.category, value: g.items.join("") }));
	const length = combined.length;

	return (
		<>
			{combined.map((g, i) => {
				const space =
					(i < length - 1 && /\s$/.test(g.value)) || (i + 1 < length && /^\s/.test(combined[i + 1].value));

				return (
					<React.Fragment key={i}>
						<span className={g.name}>{g.value.trim()}</span>
						{space ? " " : ""}
					</React.Fragment>
				);
			})}
		</>
	);
}

function quantizeScore(score: number): "ignore" | "low" | "medium" | "high" {
	if (score <= 5) {
		return "ignore";
	}
	if (score <= 10) {
		return "low";
	}
	if (score <= 20) {
		return "medium";
	}
	return "high";
}
