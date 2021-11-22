import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { getCurrentLang, getLocalization, Locales, LocalizableProps, SimpleString } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { getLinkToStep, StepSelectorGroup } from "../elements/step-selector";
import { AddItem } from "../elements/add-item";
import { ItemTable } from "../elements/item-table";
import { StepActionBar } from "../elements/step-action-bar";
import { NextButton } from "../elements/step-buttons";
import { SessionCreating, SessionLoading } from "../elements/session-creating-loading";
import { ItemProto, toItemResourceType } from "../lib/session/create-item";
import { CreateState, getSessionId, useCreateSession, visitState } from "../lib/use-session";
import { FailedItem, UploadedItem, UploadingItem, useUpload } from "../lib/use-upload";
import { Icon, ItemTypeIcon } from "../elements/icon";
import { cloneSession } from "../lib/session/util";
import { useDropzone } from "react-dropzone";
import "./submit.scss";

export default function SubmitPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Submit lang={getCurrentLang()} />
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

function Submit(props: LocalizableProps): JSX.Element {
	const l = getLocalization(props, locales);

	const [state, update] = useCreateSession();

	const [failed, setFailed] = useState<readonly FailedItem[]>([]);
	const addFailed = useCallback((failed: FailedItem): void => setFailed(prev => [...prev, failed]), [setFailed]);

	const successfulUpload = useCallback(
		({ item, itemUrn }: UploadedItem): void => {
			update(Promise.resolve(), oldSession => {
				const session = cloneSession(oldSession);
				session.itemsList.push({
					urn: itemUrn,
					meta: { name: item.name },
					resource: {
						id: "",
						type: toItemResourceType(item.type),
						properties: { contentMd5: "fake", length: 0, rawMd5: "fake", size: item.size },
					},
				});
				return session;
			});
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
	const sessionId = getSessionId(state);
	const dropFiles = useCallback(
		(files: readonly File[]) => {
			// TODO: Handle rejected files
			if (sessionId) {
				upload(files.map(ItemProto.fromFile), sessionId);
			}
		},
		[sessionId, upload]
	);

	const dropState = useDropzone({
		accept: ACCEPT,
		multiple: true,
		disabled: state.type !== "Ready",
		onDrop: dropFiles,
		noClick: true,
	});

	// visible state
	const content = visitState<CreateState, JSX.Element>(state, {
		Creating(state) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={""} current="submit">
					<SessionCreating {...props} state={state} />
				</StepSelectorGroup>
			);
		},
		Loading(state) {
			return (
				<StepSelectorGroup lang={props.lang} sessionId={state.sessionId} current="submit">
					<SessionLoading {...props} state={state} />
				</StepSelectorGroup>
			);
		},
		Ready({ session }) {
			const addItem = <AddItem {...props} onAdd={items => upload(items, session.id)} accept={ACCEPT} />;

			return (
				<StepSelectorGroup lang={props.lang} sessionId={session.id} current="submit">
					<button
						onClick={() => upload([ItemProto.fromText(randomText())], session.id)}
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
								right={<NextButton {...props} to={getLinkToStep("analysis", session.id)} />}
								instruction={l.instruction}
							/>

							<UploadingList uploading={uploading} />

							<ItemTable {...props} session={session} update={update} />
						</>
					)}
				</StepSelectorGroup>
			);
		},
	});

	return (
		<Page {...props} className="Submit" header="small" dropState={dropState}>
			{content}
		</Page>
	);
}

function UploadingList(props: { uploading: readonly UploadingItem[] }): JSX.Element {
	return (
		<div className="UploadingList">
			{props.uploading.map(({ uploadId, item }) => {
				return (
					<div key={uploadId} className="uploading-item">
						<span className="loading">
							<Icon kind="loader-5-line" />
						</span>
						<span className="icon">
							<ItemTypeIcon type={item.type} />
						</span>
						<span className="name">{item.name}</span>
					</div>
				);
			})}
		</div>
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
