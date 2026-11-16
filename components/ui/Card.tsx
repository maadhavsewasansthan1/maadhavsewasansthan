"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "muted" | "elevated" | "borderless" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-surface border border-border shadow-xs",
    muted: "bg-bg-sand/60 border border-border shadow-none",
    elevated: "bg-surface border border-border shadow-md",
    borderless: "bg-surface shadow-none",
    dark: "bg-indigo text-surface border border-white/10 shadow-md",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const interactiveClasses = interactive
    ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo/50 hover:shadow-md"
    : "";

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden relative",
        variantClasses[variant],
        paddingClasses[padding],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
