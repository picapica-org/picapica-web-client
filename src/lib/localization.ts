export const supportedLanguages: ReadonlySet<string> = new Set(["en", "de"]);
export type SupportedLanguage = "en" | "de";

export interface LocalizableProps {
	readonly lang: SupportedLanguage;
}

export type Locales<T> = { [K in SupportedLanguage]: T };
export type SimpleString<Keys extends string> = Record<Keys, string>;
export type SimpleElement<Keys extends string> = Record<Keys, () => JSX.Element>;

export function getLocalization<T>(props: LocalizableProps, locales: Locales<T>): Readonly<T> {
	return locales[props.lang];
}

const currentLangKey = "currentLang";

function detectCurrentLang(): SupportedLanguage | null {
	if (localStorage.getItem(currentLangKey)) {
		// stored
		return localStorage.getItem(currentLangKey) as SupportedLanguage;
	}

	// match against users languages
	for (let l of navigator.languages || []) {
		l = l.toLowerCase();
		if (supportedLanguages.has(l)) return l as SupportedLanguage;
		// reduce e.g. "en-US" to "en"
		l = (/^(\w+)-\w+$/.exec(l) || [])[1];
		if (supportedLanguages.has(l)) return l as SupportedLanguage;
	}

	return null;
}
export function getCurrentLang(): SupportedLanguage {
	const lang = detectCurrentLang();
	if (lang === null) {
		return "en";
	} else {
		return lang;
	}
}
export function setCurrentLang(lang: SupportedLanguage): void {
	localStorage.setItem(currentLangKey, lang);
}

const intlLocales: Record<SupportedLanguage, string> = {
	en: "en-GB",
	de: "de-DE",
};

export function getIntlLocales(props: LocalizableProps): string | string[] {
	return intlLocales[props.lang];
}
