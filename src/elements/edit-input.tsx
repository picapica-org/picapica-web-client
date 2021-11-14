import React, { useCallback, useRef, useState } from "react";
import { LocalizableProps } from "../lib/localization";
import { Buttons } from "./buttons";
import { Icon } from "./icon";
import "./edit-input.scss";
import Popup from "reactjs-popup";

export interface EditInputProps extends LocalizableProps {
	readonly text: string;
	readonly onSubmit: (newText: string) => void;
	readonly validate?: (newText: string) => false | string;
}

export function EditInput(props: EditInputProps): JSX.Element {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const toggleIsEditing = useCallback(() => setIsEditing(prev => !prev), [setIsEditing]);

	return (
		<span className="EditInput">
			{isEditing ? (
				<EditView {...props} toggleIsEditing={toggleIsEditing} />
			) : (
				<TextView {...props} toggleIsEditing={toggleIsEditing} />
			)}
		</span>
	);
}

type PopupActions = NonNullable<Extract<NonNullable<Parameters<typeof Popup>[0]["ref"]>, { current: any }>["current"]>;

function EditView(props: EditInputProps & { toggleIsEditing: () => void }): JSX.Element {
	const [text, setText] = useState(props.text);
	const [error, setError] = useState<string>();

	const ref = useRef<PopupActions>(null);
	const openTooltip = (): void => ref.current?.open();
	const closeTooltip = (): void => ref.current?.close();

	const isValid = (text: string): boolean => {
		if (props.validate) {
			const validationError = props.validate(text);
			if (validationError) {
				setError(validationError);
				openTooltip();
				return false;
			}
		}
		if (error) {
			setError(undefined);
			closeTooltip();
		}
		return true;
	};
	const submit = (): void => {
		if (isValid(text)) {
			props.toggleIsEditing();
			props.onSubmit(text);
		}
	};

	return (
		<span className={`EditView ${Buttons.BUTTON_GROUP}`}>
			<Popup
				position="top center"
				ref={ref}
				on={[]}
				trigger={
					<input
						className={`${Buttons.NON_BUTTON} ${Buttons.SMALL}${error ? " error" : ""}`}
						autoFocus
						type="text"
						value={text}
						onChange={e => {
							setText(e.target.value);
							if (error) {
								// validate to cleanup errors
								isValid(e.target.value);
							}
						}}
						onKeyPress={e => {
							if (e.key === "Enter") {
								submit();
							}
						}}
						onKeyUp={e => {
							if (e.key === "Escape") {
								props.toggleIsEditing();
							}
						}}
					/>
				}>
				<span>{error ?? ""}</span>
			</Popup>

			<button className={`accept ${Buttons.BUTTON} ${Buttons.SMALL}`} onClick={submit}>
				<Icon kind="check-line" />
			</button>
			<button className={`cancel ${Buttons.BUTTON} ${Buttons.SMALL}`} onClick={props.toggleIsEditing}>
				<Icon kind="close-line" />
			</button>
		</span>
	);
}

function TextView(props: EditInputProps & { toggleIsEditing: () => void }): JSX.Element {
	return (
		<span className="TextView">
			<span className="text">{props.text.replace(/[\r\n]+/g, " ")}</span>
			<button className={`edit ${Buttons.BUTTON} ${Buttons.SMALL}`} onClick={props.toggleIsEditing}>
				<Icon kind="pencil-line" />
			</button>
		</span>
	);
}
