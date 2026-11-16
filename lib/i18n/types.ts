// Type definitions for bilingual English/Hindi localization

export type Locale = "en" | "hi";

export type Localized<T = string> = {
  en: T;
  hi: T;
};

export type LocalizedString = Localized<string>;

export type LocalizedArray = Localized<string[]>;

export type StringOrLocalized = string | LocalizedString;

export interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: <T>(item: Localized<T> | T | undefined | null) => T;
}

/**
 * Universal helper that resolves either a plain string or a localized { en, hi } object
 * Safe to use in both Server Components and Client Components
 */
export function getLocalizedText(
  item: StringOrLocalized | undefined | null,
  locale: Locale = "en"
): string {
  if (item === undefined || item === null) return "";
  if (typeof item === "string") return item;
  if (typeof item === "object" && "en" in item && "hi" in item) {
    return (item as LocalizedString)[locale] ?? (item as LocalizedString).en ?? "";
  }
  return String(item);
}
