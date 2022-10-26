import { useContext } from "react";
import { LocalizationContext } from "../context/localization";
import { getLocalization, Locales } from "./localization";

export function useLocalization<T>(locales: Locales<T>): Readonly<T> {
	const l = useContext(LocalizationContext);
	return getLocalization(l, locales);
}
