import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Popup from "reactjs-popup";
import { Buttons } from "../elements/buttons";
import { Locales } from "../lib/localization";
import { useLocalization } from "../lib/use-localization";
import { asArray, noop } from "../lib/util";
import "./alert.scss";

export type AlertType = "error";

export interface AlertMessage {
	type: AlertType;
	title?: string;
	message: string | string[];
}

interface AlertPopupProps {
	message: Readonly<AlertMessage>;
	resolve: (message: Readonly<AlertMessage>) => void;
	currentIndex: number;
	total: number;
}
const AlertPopup = React.memo(({ message, resolve, currentIndex, total }: AlertPopupProps): JSX.Element => {
	const l = useLocalization(locales);

	const close = useCallback(() => resolve(message), [resolve, message]);

	return (
		<Popup open modal closeOnDocumentClick={false} closeOnEscape={false} className="AlertModal" onClose={close}>
			<div className={"modal " + message.type}>
				<div className="title">
					<span>{message.title || l[`alert-${message.type}`]}</span>
					{currentIndex !== 0 || total !== 1 ? (
						<span className="progress">
							({currentIndex + 1}/{total})
						</span>
					) : undefined}
				</div>
				<div className="body">
					{asArray(message.message).map((m, i) => (
						<p key={i}>{m}</p>
					))}
				</div>
				<div className="buttons">
					<button className={`${Buttons.BUTTON}`} onClick={close}>
						{l.okay}
					</button>
				</div>
			</div>
		</Popup>
	);
});

const locales: Locales<Record<`alert-${AlertType}` | "okay", string>> = {
	en: {
		"okay": "Okay",

		// alert types
		"alert-error": "Error",
	},
	de: {
		"okay": "Okay",

		// alert types
		"alert-error": "Fehler",
	},
};

export interface AlertActions {
	readonly sendAlert: (message: AlertMessage) => void;
}

const AlertContext = createContext<AlertActions>({ sendAlert: noop });

export function AlertProvider({ children }: React.PropsWithChildren<unknown>): JSX.Element {
	const [messageQueue, setMessageQueue] = useState<readonly Readonly<AlertMessage>[]>([]);

	// This is a counter to keep track of which alert message we are currently showing.
	// Only one alert can be displayed at a time, so when alerts are sent while another is being displayed, the message
	// is queued until all previous alerts have been resolved by the user. To tell the user that there are queued
	// messages, we display a little "2/5" text that tells the user how many messages there are in total and which
	// message is currently being displayed.
	const [done, setDone] = useState(0);

	const sendAlert = useCallback(
		(message: AlertMessage) => {
			setMessageQueue(queue => [...queue, message]);
		},
		[setMessageQueue]
	);
	const resolveCurrentAlert = useCallback(
		(message: AlertMessage) => {
			setMessageQueue(queue => {
				// some resolve calls might come in twice, so this check protects
				// against clearing messages that haven't been displayed yet.
				if (queue[0] === message) {
					setDone(d => d + 1);
					return queue.slice(1);
				}
				return queue;
			});
		},
		[setMessageQueue]
	);

	const currentMessage: Readonly<AlertMessage> | undefined = messageQueue[0];
	useEffect(() => {
		if (!currentMessage) {
			setDone(0);
		}
	}, [currentMessage]);

	let value: AlertActions = {
		sendAlert: sendAlert,
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	value = useMemo(() => value, Object.values(value));

	return (
		<AlertContext.Provider value={value}>
			{children}
			{currentMessage && (
				<AlertPopup
					message={currentMessage}
					resolve={resolveCurrentAlert}
					currentIndex={done}
					total={done + messageQueue.length}
				/>
			)}
		</AlertContext.Provider>
	);
}

export function useAlert(): AlertActions {
	return useContext(AlertContext);
}
