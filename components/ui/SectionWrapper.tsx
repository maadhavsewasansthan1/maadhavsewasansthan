"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, viewportOnce } from "@/lib/animations";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "primary" | "secondary" | "dark" | "transparent";
  spacing?: "default" | "compact" | "spacious" | "none";
  animate?: boolean;
  children: React.ReactNode;
}

export function SectionWrapper({
  id,
  variant = "primary",
  spacing = "default",
  animate = true,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const variantClasses = {
    primary: "bg-[#FAF9F5] text-[#262820]",
    secondary: "bg-[#F1EFE7] text-[#262820]",
    dark: "bg-[#355C43] text-[#FAF9F5]",
    transparent: "bg-transparent",
  };

  const spacingClasses = {
    default: "py-16 md:py-24 lg:py-32",
    compact: "py-12 md:py-16 lg:py-20",
    spacious: "py-20 md:py-32 lg:py-40",
    none: "py-0",
  };

  const content = (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden transition-colors",
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );

  if (animate && !prefersReducedMotion) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
