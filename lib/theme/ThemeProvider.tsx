"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "mss-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always initialize as "light" during SSR to avoid hydration mismatches
  const [theme, setThemeState] = useState<Theme>("light");
  const [hasExplicitChoice, setHasExplicitChoice] = useState<boolean>(false);

  // Sync with document class on mount (inline head script set this before paint)
  useEffect(() => {
    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage may fail in restricted/incognito environments
    }

    if (storedTheme === "light" || storedTheme === "dark") {
      setHasExplicitChoice(true);
      setThemeState(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      setHasExplicitChoice(false);
      const isSystemDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(isSystemDark ? "dark" : "light");
      if (isSystemDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Follow system preference only when the user has not chosen a theme yet
  useEffect(() => {
    if (hasExplicitChoice) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Re-verify that user didn't set a choice in another tab
      try {
        if (localStorage.getItem(STORAGE_KEY)) {
          return;
        }
      } catch {
        // ignore
      }

      const newTheme: Theme = e.matches ? "dark" : "light";
      setThemeState(newTheme);
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [hasExplicitChoice]);

  const setTheme = useCallback((newTheme: Theme) => {
    setHasExplicitChoice(true);
    setThemeState(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage write failures in private browsing
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
