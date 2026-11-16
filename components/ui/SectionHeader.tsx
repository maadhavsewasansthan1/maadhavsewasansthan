"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import LotusMark from "@/components/ui/motifs/LotusMark";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "green" | "marigold" | "terracotta" | "neutral" | "outline";
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  isDark?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
  isDark = false,
  className,
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-10 md:mb-14",
        alignClasses[align],
        className
      )}
    >
      {badge && (
        <div className="mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest",
              isDark ? "text-surface/80" : "text-ink-soft"
            )}
          >
            <LotusMark width={16} height={16} className="text-marigold" />
            {badge}
          </span>
        </div>
      )}

      {/* Section heading with clip-path wipe from left to right when entering viewport */}
      <motion.h2
        className={cn(
          "font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight whitespace-pre-line leading-[1.2]",
          isDark ? "text-white" : "text-ink"
        )}
        initial={reduced ? undefined : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        whileInView={reduced ? undefined : { clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed max-w-2xl",
            isDark ? "text-surface/80" : "text-ink-soft"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
