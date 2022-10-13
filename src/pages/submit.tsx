import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAlert } from "../context/alert";
import { AddItem } from "../elements/add-item";
import { ItemTable } from "../elements/item-table";
import { Page } from "../elements/page";
import { SessionState } from "../elements/session-creating-loading";
import { SharedHead } from "../elements/shared-header";
import { StepActionBar } from "../elements/step-action-bar";
import { NextButton } from "../elements/step-buttons";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { Locales, SimpleString } from "../lib/localization";
import { dynamicComponent } from "../lib/react-util";
import { ItemProto } from "../lib/session/create-item";
import { useLocalization } from "../lib/use-localization";
import { getSessionUrn, Ready, useCreateSession } from "../lib/use-session";
import { optimisticallyAddItem, UploadedItem, useUpload } from "../lib/use-upload";
import "./submit.scss";

export const Head = (): JSX.Element => (
	<>
		<title>Picapica</title>
		<meta name="robots" content="noindex"></meta>
		<SharedHead />
	</>
);

export default dynamicComponent(Submit);

const ACCEPT = [
	// PDF
	".pdf",
	"application/pdf",
	// Word doc
	".doc",
	".docx",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

function Submit(): JSX.Element {
	const l = useLocalization(locales);
	const { sendAlert } = useAlert();

	const [state, update] = useCreateSession();
	const isReady = state.type === "Ready";

	const successfulUpload = useCallback(
		(uploadedItem: UploadedItem): void => {
			update(Promise.resolve(), optimisticallyAddItem(uploadedItem));
		},
		[update]
	);

	const { uploading, upload, failed, removeFailed } = useUpload(successfulUpload);

	const emptySession =
		!(isReady && state.session.itemsList.length > 0) && uploading.length === 0 && failed.length === 0;

	const [blank, setBlank] = useState(true);
	useEffect(() => {
		if (!emptySession) {
			setBlank(false);
		}
	}, [emptySession, setBlank]);

	// file drop
	const sessionUrn = getSessionUrn(state);
	const dropFiles = useCallback(
		(files: readonly File[]) => {
			if (sessionUrn && isReady) {
				upload(files.map(ItemProto.fromFile), sessionUrn);
			} else {
				sendAlert({ type: "error", message: l.cannotDropUntilReady });
			}
		},
		[sessionUrn, isReady, upload, sendAlert, l]
	);

	const dropState = useDropzone({
		accept: ACCEPT,
		multiple: true,
		disabled: !isReady,
		onDrop: dropFiles,
		noClick: true,
	});

	const onReady = ({ session }: Ready): JSX.Element => {
		const addItem = <AddItem onAdd={items => upload(items, session.urn)} accept={ACCEPT} />;

		const showRandomTextButton = false;

		return (
			<>
				<button
					onClick={() => upload([ItemProto.fromText(randomText())], session.urn)}
					style={{
						display: showRandomTextButton ? undefined : "none",
						position: "absolute",
						opacity: ".4",
						zIndex: 1000,
					}}>
					Random Text
				</button>

				{emptySession && blank ? (
					<>
						<div className="blank-session">
							{addItem}
							<div className="spacer"></div>
							<span className="pseudo-tooltip">{l.addItemHint}</span>
						</div>
					</>
				) : (
					<>
						<StepActionBar
							left={addItem}
							right={<NextButton to={getLinkToStep("analysis", session.urn)} />}
							instruction={l.instruction}
						/>

						<ItemTable
							session={session}
							uploading={uploading}
							failed={failed}
							removeFailed={removeFailed}
							update={update}
						/>
					</>
				)}
			</>
		);
	};

	return (
		<Page className="Submit" title={l.title} header="small" dropState={dropState}>
			<StepSelectorGroup
				sessionUrn={getSessionUrn(state) ?? ""}
				current="submit"
				disableOthers={state.type !== "Ready" || state.session.itemsList.length === 0}>
				<SessionState state={state} onReady={onReady} />
			</StepSelectorGroup>
		</Page>
	);
}

function randomText(): string {
	const len = 10 ** (Math.random() * 6.5);

	let s = String.fromCodePoint(65 + Math.floor(Math.random() * 26));
	let space = false;

	for (let i = 0; i < len; i++) {
		if (!space && Math.random() < 1 / 100) {
			s += "\n";
			space = true;
		} else if (!space && Math.random() < 1 / 4) {
			s += " ";
			space = true;
		} else {
			s += String.fromCodePoint(65 + Math.floor(Math.random() * 26));
			space = false;
		}
	}

	return s;
}

const locales: Locales<SimpleString<"title" | "instruction" | "addItemHint" | "cannotDropUntilReady">> = {
	en: {
		title: "Upload - Picapica",

		instruction: "Add more files, or proceed",
		addItemHint: "Click here to upload documents.",
		cannotDropUntilReady:
			"You cannot upload files until the session is fully loaded. Please wait until the session is loaded and try again.",
	},
	de: {
		title: "Hochladen - Picapica",

		instruction: "Es können weitere Dateien hinzugefügt werden",
		addItemHint: "Hier klicken, um Dokumente hochzuladen.",
		cannotDropUntilReady:
			"Sie können keine Dateien hochladen bis die Seite vollständig geladen ist. Bitte warten Sie bis die Seite geladen ist und versuchen Sie es erneut.",
	},
};
