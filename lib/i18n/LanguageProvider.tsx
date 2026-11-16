"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Locale, Localized, LanguageContextType } from "./types";

const STORAGE_KEY = "mss_locale_preference";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always default to "en" on initial server/client render to prevent hydration mismatches
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read stored preference safely after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "hi") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // localStorage disabled or unavailable
      document.documentElement.lang = "en";
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore localStorage errors in private browsing
      document.documentElement.lang = newLocale;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "hi" : "en");
  }, [locale, setLocale]);

  const t = useCallback(
    <T,>(item: Localized<T> | T | undefined | null): T => {
      if (item === undefined || item === null) {
        return "" as unknown as T;
      }
      if (typeof item === "object" && item !== null && "en" in item && "hi" in item) {
        const localized = item as Localized<T>;
        return (localized[locale] ?? localized.en) as T;
      }
      return item as T;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
