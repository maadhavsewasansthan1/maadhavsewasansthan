"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const isDark = theme === "dark";
  const ariaLabel = isDark
    ? "Switch to light mode (लाइट मोड चुनें)"
    : "Switch to dark mode (डार्क मोड चुनें)";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 active:scale-95 cursor-pointer shadow-xs",
        "bg-surface border-border text-ink hover:bg-bg-sand hover:border-indigo/40",
        className
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
      aria-pressed={isDark}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 180 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center text-marigold"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 180 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center text-indigo"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
