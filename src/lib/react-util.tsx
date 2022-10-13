import React, { DependencyList, useCallback, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AlertProvider } from "../context/alert";
import { CancellationController, CancellationToken } from "./cancellation";
import { LocalizationProvider } from "./use-localization";

const queryClient = new QueryClient();

export function dynamic(Supplier: () => JSX.Element): JSX.Element {
	const isSSR = typeof window === "undefined";
	if (isSSR) {
		return <></>;
	} else {
		return (
			<LocalizationProvider>
				<AlertProvider>
					<QueryClientProvider client={queryClient}>
						<Supplier />
					</QueryClientProvider>
				</AlertProvider>
			</LocalizationProvider>
		);
	}
}

export function dynamicComponent(Supplier: () => JSX.Element): () => JSX.Element {
	return () => dynamic(Supplier);
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

export function addLocationChangeListener(listener: () => void): () => void {
	urlChangeListener.add(listener);

	return () => {
		urlChangeListener.delete(listener);
	};
}

const urlChangeListener = new Set<() => void>();

function addUrlChange(): void {
	const pushState = history.pushState;
	const replaceState = history.replaceState;

	history.pushState = function () {
		// eslint-disable-next-line prefer-rest-params
		pushState.apply(history, arguments as any);
		onChange();
	};

	history.replaceState = function () {
		// eslint-disable-next-line prefer-rest-params
		replaceState.apply(history, arguments as any);
		onChange();
	};

	window.addEventListener("popstate", function () {
		onChange();
	});

	let id: NodeJS.Timeout | undefined = undefined;
	function onChange(): void {
		if (id !== undefined) {
			clearTimeout(id);
		}

		id = setTimeout(() => {
			id = undefined;

			for (const listener of urlChangeListener) {
				listener();
			}
		}, 0);
	}
}

if (typeof history !== "undefined") {
	addUrlChange();
}

export interface OpenFileDialogOptions {
	readonly multiple?: boolean;
	readonly accept?: string;
	readonly capture?: React.InputHTMLAttributes<HTMLInputElement>["capture"];
}

export function useOpenFileDialog(
	onSelect: (files: File[]) => void,
	options: OpenFileDialogOptions
): [open: () => void, element: JSX.Element] {
	const input = useRef<HTMLInputElement>(null);

	const open = useCallback(() => {
		input.current?.click();
	}, [input]);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			e.stopPropagation();
			e.preventDefault();

			if (e.target.files) {
				const files = fileListToArray(e.target.files);
				if (files.length > 0) {
					onSelect(files);
				}
			}
		},
		[onSelect]
	);

	return [open, <input type="file" ref={input} style={{ display: "none" }} onChange={onChange} {...options} />];
}

export function fileListToArray(fileList: FileList): File[] {
	const files: File[] = [];
	for (let i = 0; i < fileList.length; i++) {
		files.push(fileList[i]);
	}
	return files;
}
