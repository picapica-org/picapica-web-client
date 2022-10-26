import React, { useCallback, useRef } from "react";

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

function fileListToArray(fileList: FileList): File[] {
	const files: File[] = [];
	for (let i = 0; i < fileList.length; i++) {
		files.push(fileList[i]);
	}
	return files;
}
