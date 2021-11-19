/**
 * An object that can tell whether the current operation has been canceled.
 */
export interface CancellationToken {
	/**
	 * Whether the operation has been canceled.
	 *
	 * Once an operation has been canceled, it can **never** be un-canceled again.
	 */
	readonly isCanceled: boolean;
	/**
	 * A simply utility function that will throw a generic error if the operation has been canceled.
	 */
	readonly checkCanceled: () => void;
}

/**
 * An object that controls and holds whether an operation has been changed.
 *
 * The controller also implements the {@link CancellationToken} interface. You can pass the controller directly into
 * function that need a token. TypeScript will ensure that the token is used correctly.
 */
export class CancellationController implements CancellationToken {
	isCanceled = false;
	readonly checkCanceled = (): void => {
		if (this.isCanceled) {
			throw new Error("Operation was canceled.");
		}
	};
	/**
	 * A simply utility function that will set `isCanceled` to `true`.
	 */
	readonly cancel = (): void => {
		this.isCanceled = true;
	};
}
