import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { Locales, SimpleString } from "../lib/localization";
import { useLocalization } from "../lib/use-localization";
import { dynamic } from "../lib/react-util";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { AddItem } from "../elements/add-item";
import { ItemTable } from "../elements/item-table";
import { StepActionBar } from "../elements/step-action-bar";
import { NextButton } from "../elements/step-buttons";
import { SessionState } from "../elements/session-creating-loading";
import { ItemProto } from "../lib/session/create-item";
import { getSessionUrn, Ready, useCreateSession } from "../lib/use-session";
import { FailedItem, optimisticallyAddItem, UploadedItem, UploadId, useUpload } from "../lib/use-upload";
import { useDropzone } from "react-dropzone";
import "./submit.scss";

export default function SubmitPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Submit />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

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

	const [state, update] = useCreateSession();

	const [failed, setFailed] = useState<readonly FailedItem[]>([]);
	const addFailed = useCallback((failed: FailedItem): void => setFailed(prev => [...prev, failed]), [setFailed]);
	const removeFailed = useCallback(
		(uploadId: UploadId): void => setFailed(prev => prev.filter(item => item.uploadId !== uploadId)),
		[setFailed]
	);

	const successfulUpload = useCallback(
		(uploadedItem: UploadedItem): void => {
			update(Promise.resolve(), optimisticallyAddItem(uploadedItem));
		},
		[update]
	);

	const [uploading, upload] = useUpload(successfulUpload, addFailed);

	const emptySession = useCallback((): boolean => {
		return (
			!(state.type === "Ready" && state.session.itemsList.length > 0) &&
			uploading.length === 0 &&
			failed.length === 0
		);
	}, [state, failed, uploading]);
	const [blank, setBlank] = useState(true);
	useEffect(() => {
		if (!emptySession()) {
			setBlank(false);
		}
	}, [emptySession, setBlank]);

	// file drop
	const sessionUrn = getSessionUrn(state);
	const dropFiles = useCallback(
		(files: readonly File[]) => {
			// TODO: Handle rejected files
			if (sessionUrn) {
				upload(files.map(ItemProto.fromFile), sessionUrn);
			}
		},
		[sessionUrn, upload]
	);

	const dropState = useDropzone({
		accept: ACCEPT,
		multiple: true,
		disabled: state.type !== "Ready",
		onDrop: dropFiles,
		noClick: true,
	});

	const onReady = ({ session }: Ready): JSX.Element => {
		const addItem = <AddItem onAdd={items => upload(items, session.urn)} accept={ACCEPT} />;

		return (
			<>
				<button
					onClick={() => upload([ItemProto.fromText(randomText())], session.urn)}
					style={{ position: "absolute", opacity: ".3", zIndex: 1000 }}>
					Random Text
				</button>

				{emptySession() && blank ? (
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
		<Page className="Submit" header="small" dropState={dropState}>
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

const locales: Locales<SimpleString<"instruction" | "addItemHint">> = {
	en: {
		instruction: "Add more files, or proceed",
		addItemHint: "Click here to upload documents.",
	},
	de: {
		instruction: "Es können weitere Dateien hinzugefügt werden",
		addItemHint: "Hier klicken, um Dokumente hochzuladen.",
	},
};
