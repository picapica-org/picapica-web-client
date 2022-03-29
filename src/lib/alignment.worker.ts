import { getSimpleCombinedDiff } from "./alignment";

self.onmessage = ({ data: { left, right, id } }) => {
	const diff = getSimpleCombinedDiff(left, right);
	self.postMessage({ diff, id });
};
