import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

export const defaultLocale = "en";
export const locales = ["en", "uz", "ru"] as const;

export type Locale = (typeof locales)[number];

type Dictionary = Record<string, unknown>;

type Translator = {
	text: (key: string, fallback?: string) => string;
	raw: <T>(key: string, fallback?: T) => T;
};

const dictionaries: Record<Locale, Dictionary> = { en, uz, ru };

export function isLocale(value: string | undefined): value is Locale {
	return Boolean(value && locales.includes(value as Locale));
}

export function normalizeLocale(value: string | undefined): Locale {
	return isLocale(value) ? value : defaultLocale;
}

export function useTranslations(locale: Locale): Translator {
	const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];

	return {
		text(key, fallback = key) {
			const value = resolveKey(dictionary, key);
			return typeof value === "string" ? value : fallback;
		},
		raw<T>(key: string, fallback?: T) {
			const value = resolveKey(dictionary, key);
			return (value ?? fallback) as T;
		},
	};
}

export function localizePath(locale: Locale, path = "/"): string {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const localePrefixPattern = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
	const cleanPath = normalizedPath.replace(localePrefixPattern, "") || "/";

	if (locale === defaultLocale) {
		return cleanPath;
	}

	return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function getAlternateLinks(path = "/") {
	return locales.map((locale) => ({
		locale,
		href: localizePath(locale, path),
	}));
}

function resolveKey(dictionary: Dictionary, key: string): unknown {
	return key.split(".").reduce<unknown>((current, part) => {
		if (current && typeof current === "object" && part in current) {
			return (current as Dictionary)[part];
		}

		return undefined;
	}, dictionary);
}
