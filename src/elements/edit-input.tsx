import React, { useCallback, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import { Buttons } from "./buttons";
import { Icon, PicaIcon } from "./icon";
import "./edit-input.scss";

export interface EditInputProps {
	readonly text: string;
	readonly onSubmit: (newText: string) => void;
	readonly validate?: (newText: string) => false | string;
}

export function EditInput(props: EditInputProps): JSX.Element {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const toggleIsEditing = useCallback(() => setIsEditing(prev => !prev), [setIsEditing]);

	return (
		<div className="EditInput">
			{isEditing ? (
				<EditView {...props} toggleIsEditing={toggleIsEditing} />
			) : (
				<TextView text={props.text} toggleIsEditing={toggleIsEditing} />
			)}
		</div>
	);
}

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
		<div className={`EditView ${Buttons.BUTTON_GROUP}`}>
			<Popup
				position="top center"
				ref={ref}
				className="error-popup"
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
		</div>
	);
}

export interface TextViewProps {
	readonly text: string;
	toggleIsEditing?: () => void;
}
export function TextView({ text, toggleIsEditing }: TextViewProps): JSX.Element {
	return (
		<div className="TextView">
			<span className="text">
				<span>{text.replace(/[\r\n]+/g, " ")}</span>
			</span>
			{toggleIsEditing && (
				<button className={`edit ${Buttons.BUTTON} ${Buttons.SMALL}`} onClick={toggleIsEditing}>
					<PicaIcon kind="rename" />
				</button>
			)}
		</div>
	);
}
