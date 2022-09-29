import React, { useCallback, useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import { Locales } from "../lib/localization";
import { useOpenFileDialog } from "../lib/react-util";
import { ItemProto, ItemType } from "../lib/session/create-item";
import { useLocalization } from "../lib/use-localization";
import { isValidUrl } from "../lib/util";
import { Buttons } from "./buttons";
import { Icon, PicaIcon } from "./icon";
import "./add-item.scss";

export interface AddItemProps {
	readonly onAdd: (items: ItemProto[]) => void;
	readonly accept?: string;
}

const INPUT_KINDS = ["file", "url", "text"] as const;

export function AddItem({ onAdd, accept }: AddItemProps): JSX.Element {
	const l = useLocalization(locales);

	const [currentTab, setCurrentTab] = useState<ItemType>("file");

	const ref = useRef<PopupActions>(null);
	const openModal = useCallback(
		(tab: ItemType): void => {
			setCurrentTab(tab);
			ref.current?.open();
		},
		[ref, setCurrentTab]
	);
	const closeModal = useCallback((): void => ref.current?.close(), [ref]);

	const submit = useCallback(
		async (items: ItemProto[]): Promise<void> => {
			onAdd(items);
		},
		[onAdd]
	);

	const onSelect = useCallback(
		(files: File[]): void => {
			submit(files.map(ItemProto.fromFile)).then(() => {
				closeModal();
			});
		},
		[submit, closeModal]
	);

	useEffect(() => {
		const initial = consumeInitialAddItemState();
		if (initial) {
			openModal(initial);
		}
	}, [openModal]);

	const [openFiles, input] = useOpenFileDialog(onSelect, { multiple: true, accept });

	const modalContent: Record<ItemType, () => JSX.Element> = {
		file() {
			return <ModalFileInput close={closeModal} openFiles={openFiles} />;
		},
		url() {
			return <ModalUrlInput close={closeModal} submit={submit} />;
		},
		text() {
			return <ModalTextInput close={closeModal} submit={submit} />;
		},
	};

	return (
		<span className="AddItem">
			<button className={`${Buttons.BUTTON} green big-plus`} onClick={() => openModal(currentTab)}>
				<Icon kind="add-line" />
			</button>
			<span className="group">
				<span className={Buttons.BUTTON_GROUP}>
					<button className={`${Buttons.BUTTON} green`} onClick={openFiles}>
						<PicaIcon kind="file" />
						<span className="text">{l.file}</span>
					</button>
					<button className={`${Buttons.BUTTON} green`} onClick={() => openModal("url")}>
						<PicaIcon kind="url" />
						<span className="text">{l.url}</span>
					</button>
					<button className={`${Buttons.BUTTON} green`} onClick={() => openModal("text")}>
						<PicaIcon kind="text" />
						<span className="text">{l.text}</span>
					</button>
				</span>
			</span>

			{input}

			<Popup ref={ref} modal closeOnDocumentClick closeOnEscape className="AddItemModal">
				<div className="modal">
					<div className="tabs">
						{INPUT_KINDS.map(kind => {
							return (
								<button
									key={kind}
									className={`tab${currentTab === kind ? " active" : ""}`}
									onClick={() => setCurrentTab(kind)}>
									<PicaIcon kind={kind} />
									<span className="long">{l[`modal-tab-${kind}-long`]}</span>
									<span className="short">{l[`modal-tab-${kind}-short`]}</span>
								</button>
							);
						})}
						<button className="close" onClick={closeModal}>
							<Icon kind="close-line" />
						</button>
					</div>

					{modalContent[currentTab]()}
				</div>
			</Popup>
		</span>
	);
}

function consumeInitialAddItemState(): ItemType | undefined {
	const type = getInitialAddItemState();
	if (type) {
		location.hash = "";
	}
	return type;
}
function getInitialAddItemState(): ItemType | undefined {
	const hash = location.hash;
	switch (hash) {
		case "#file":
			return "file";
		case "#url":
			return "url";
		case "#text":
			return "text";
		default:
			return undefined;
	}
}

interface ClosableProps {
	readonly close: () => void;
}
interface SubmitProps {
	/**
	 * Tries to submit the given items.
	 *
	 * This might fail if some additional checks failed. The element calling this function is guaranteed to be
	 * non-interactable while the returned promise is pending.
	 */
	readonly submit: (items: ItemProto[]) => Promise<void>;
}
interface OpenFilesProps {
	/**
	 * Creates an open file dialog and closes the modal after selecting files.
	 */
	readonly openFiles: () => void;
}

function ModalFileInput({ close, openFiles }: OpenFilesProps & ClosableProps): JSX.Element {
	const l = useLocalization(locales);

	return (
		<>
			<div className="modal-content">
				<label>{l.file}</label>
				<button className={Buttons.BUTTON} onClick={openFiles}>
					{l.chooseFiles}
				</button>
				<p className="hint">{l.dragAndDropHint}</p>
			</div>
			<ModalFooter close={close} add={openFiles} />
		</>
	);
}

function ModalUrlInput({ close, submit }: SubmitProps & ClosableProps): JSX.Element {
	const l = useLocalization(locales);

	const [url, setUrl] = useState("");
	const [error, setError] = useState("");

	function trySubmit(): void {
		if (/^\s*$/.test(url)) {
			setError(l.emptyUrlError);
		} else if (!isValidUrl(url)) {
			setError(l.invalidUrlError);
		} else {
			setError("");

			submit([ItemProto.fromUrl(url)]).then(() => {
				setUrl("");
				close();
			});
		}
	}

	return (
		<>
			<div className="modal-content">
				<label htmlFor="urlInput">{l.url}</label>
				<input
					id="urlInput"
					type="url"
					value={url}
					placeholder="https://"
					autoFocus
					onChange={e => setUrl(e.target.value)}
					onKeyPress={e => {
						if (e.key === "Enter") {
							trySubmit();
						}
					}}
					spellCheck={false}
				/>
				{!!error && <p className="error">{error}</p>}
			</div>
			<ModalFooter close={close} add={trySubmit} />
		</>
	);
}

function ModalTextInput({ close, submit }: SubmitProps & ClosableProps): JSX.Element {
	const l = useLocalization(locales);

	const [text, setText] = useState("");
	const [error, setError] = useState("");

	function trySubmit(): void {
		if (/^\s*$/.test(text)) {
			setError(l.emptyTextError);
		} else {
			setError("");

			submit([ItemProto.fromText(text)]).then(() => {
				setText("");
				close();
			});
		}
	}

	return (
		<>
			<div className="modal-content">
				<label htmlFor="textInput">{l.text}</label>
				<textarea
					id="textInput"
					value={text}
					autoFocus
					onChange={e => setText(e.target.value)}
					spellCheck={false}></textarea>
				{!!error && <p className="error">{error}</p>}
			</div>
			<ModalFooter close={close} add={trySubmit} />
		</>
	);
}

function ModalFooter({ close, add }: { add?: () => void } & ClosableProps): JSX.Element {
	const l = useLocalization(locales);

	return (
		<div className="ModalFooter">
			<button className={`${Buttons.BUTTON}`} onClick={close}>
				{l.cancel}
			</button>
			{!!add && (
				<button className={`${Buttons.BUTTON} ${Buttons.GREEN}`} onClick={add}>
					<Icon kind="add-line" />
					{l.add}
				</button>
			)}
		</div>
	);
}

const locales: Locales<
	Record<
		| ItemType
		| `modal-tab-${ItemType}-long`
		| `modal-tab-${ItemType}-short`
		| "cancel"
		| "add"
		| "chooseFiles"
		| "dragAndDropHint"
		| "emptyTextError"
		| "emptyUrlError"
		| "invalidUrlError",
		string
	>
> = {
	en: {
		"file": "Files",
		"url": "URL",
		"text": "Text",

		"modal-tab-file-long": "Upload files",
		"modal-tab-url-long": "Submit URL",
		"modal-tab-text-long": "Paste text",
		"modal-tab-file-short": "Files",
		"modal-tab-url-short": "URL",
		"modal-tab-text-short": "Text",

		"cancel": "Cancel",
		"add": "Add",
		"chooseFiles": "Choose files",
		"dragAndDropHint": "Hint: You can also drag and drop files into this window to upload them.",

		"emptyTextError": "No text provided. Please paste some text.",
		"emptyUrlError": "No URL provided. Please enter a URL.",
		"invalidUrlError": "Invalid URL. Please enter a valid URL.",
	},
	de: {
		"file": "Dateien",
		"url": "URL",
		"text": "Text",

		"modal-tab-file-long": "Dateien hochladen",
		"modal-tab-url-long": "URL eingeben",
		"modal-tab-text-long": "Text einfügen",
		"modal-tab-file-short": "Dateien",
		"modal-tab-url-short": "URL",
		"modal-tab-text-short": "Text",

		"cancel": "Abbrechen",
		"add": "Hinzufügen",
		"chooseFiles": "Dateien auswählen",
		"dragAndDropHint": "Hinweis: Sie können Dateien auch in dieses Fenster ziehen, um sie hochzuladen.",

		"emptyTextError": "Kein Text. Bitte fügen Sie Text ein.",
		"emptyUrlError": "Keine URL. Bitte geben Sie eine URL ein.",
		"invalidUrlError": "Ungültige URL. Bitte Sie geben eine gültige URL ein.",
	},
};
