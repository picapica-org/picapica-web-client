import React, { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentLang, setCurrentLang, SupportedLanguage } from "../lib/localization";
import { noop } from "../lib/util";

export interface LocalizationSettings {
	readonly lang: SupportedLanguage;
	readonly setLang: (lang: SupportedLanguage) => void;
}

export const LocalizationContext = createContext<LocalizationSettings>({ lang: "en", setLang: noop });

export function LocalizationProvider({ children }: React.PropsWithChildren<unknown>): JSX.Element {
	const [lang, setLang] = useState<SupportedLanguage>(() => {
		if (typeof window === undefined) {
			// SSR
			return "en";
		} else {
			return getCurrentLang();
		}
	});

	let value: LocalizationSettings = {
		lang,
		setLang: useCallback(l => {
			setCurrentLang(l);
			setLang(l);
		}, []),
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	value = useMemo(() => value, Object.values(value));

	return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
