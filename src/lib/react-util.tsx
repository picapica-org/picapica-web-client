import React, { useEffect, DependencyList } from "react";
import { CancellationController, CancellationToken } from "./cancellation";

export function dynamic(supplier: () => JSX.Element): JSX.Element {
	const isSSR = typeof window === "undefined";
	if (isSSR) {
		return <></>;
	} else {
		return supplier();
	}
}

/**
 * This is an async replacement for `useEffect`.
 *
 * The supplier must not cause effects. Only the success and error functions are allowed to cause effects.
 *
 * Neither the success nor the error function support clean functions.
 *
 * @param supplier
 * @param successEffect
 * @param errorEffect
 * @param deps
 */
export function useAsyncEffect<T>(
	supplier: (token: CancellationToken) => Promise<T>,
	successEffect: (result: T) => void,
	errorEffect?: (reason: unknown) => void,
	deps?: DependencyList
): void {
	useEffect(
		() => {
			const controller = new CancellationController();

			supplier(controller).then(
				result => {
					if (!controller.isCanceled) {
						successEffect(result);
					}
				},
				reason => {
					if (!controller.isCanceled) {
						errorEffect?.(reason);
					}
				}
			);

			return controller.cancel;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps
	);
}
