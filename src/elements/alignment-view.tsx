import React from "react";
import { LeftChange, RightChange } from "../lib/alignment";
import { useAlignment } from "../lib/use-alignment";
import "./alignment-view.scss";

export interface Props {
	readonly left: string;
	readonly right: string;
	readonly alignmentKey: string;
}

export function AlignmentView(props: Props): JSX.Element {
	const [alignments] = useAlignment(props.alignmentKey, [props]);

	const diff = alignments[0]?.diff?.diff;

	return (
		<div className="AlignmentView">
			{diff ? (
				<>
					{diff.map(({ left }, i) => {
						return <Change key={"l" + i} left={left} index={i} />;
					})}
					{diff.map(({ right }, i) => {
						return <Change key={"r" + i} right={right} index={i} />;
					})}
				</>
			) : (
				<>
					<div className="left" style={{ gridRow: 1 }}>
						<span>{props.left}</span>
					</div>
					<div className="right" style={{ gridRow: 1 }}>
						<span>{props.right}</span>
					</div>
				</>
			)}
		</div>
	);
}

function Change(
	props: ({ left: LeftChange<string> } | { right: RightChange<string> }) & {
		index: number;
	}
): JSX.Element {
	let equal: string;
	let changed: string;
	let type: "left" | "right";
	if ("left" in props) {
		equal = props.left.equal;
		changed = props.left.removed;
		type = "left";
	} else {
		equal = props.right.equal;
		changed = props.right.added;
		type = "right";
	}

	const changedClass = type === "left" ? "removed" : "added";

	return (
		<div className={type} style={{ gridRow: props.index + 1 }}>
			<span className="unchanged">{equal.trim()}</span>
			{/\s$/.test(equal) ? " " : ""}
			<span className={changedClass}>{changed}</span>
		</div>
	);
}
