"use client";

import React from "react";
import { Languages } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "pill" | "segmented";
}

export function LanguageToggle({
  className,
  variant = "pill",
}: LanguageToggleProps) {
  const { locale, toggleLocale, setLocale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-full border min-h-[44px] bg-bg-sand/70 border-border",
          className
        )}
        role="group"
        aria-label="Language selection"
      >
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo cursor-pointer",
            locale === "en"
              ? "bg-indigo text-surface shadow-xs font-semibold"
              : "text-ink-soft hover:text-ink"
          )}
          aria-pressed={locale === "en"}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLocale("hi")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo cursor-pointer",
            locale === "hi"
              ? "bg-indigo text-surface shadow-xs font-semibold"
              : "text-ink-soft hover:text-ink"
          )}
          aria-pressed={locale === "hi"}
        >
          हिन्दी
        </button>
      </div>
    );
  }

  // Pill toggle — icon swaps with a 180ms rotate and fade, label crossfades
  const label = locale === "en" ? "हिन्दी" : "English";
  const ariaLabel =
    locale === "en"
      ? "Switch to Hindi language (भाषा बदलें: हिन्दी)"
      : "Switch to English language (भाषा बदलें: English)";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-full min-h-[44px] min-w-[44px] text-xs font-semibold tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 select-none active:scale-95 cursor-pointer shadow-xs",
        "bg-surface border-border text-ink hover:bg-bg-sand hover:border-indigo/40",
        className
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <Languages className="w-4 h-4 text-indigo shrink-0" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 180 }}
          transition={{ duration: 0.18 }}
          className="leading-none pt-0.5"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default LanguageToggle;
