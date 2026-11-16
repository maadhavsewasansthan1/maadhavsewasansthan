import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "marigold" | "saffron" | "terracotta" | "neutral" | "outline";
  children: React.ReactNode;
}

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    green:
      "bg-indigo/10 text-indigo border-indigo/20",
    marigold:
      "bg-marigold/15 text-marigold border-marigold/30",
    saffron:
      "bg-marigold/15 text-marigold border-marigold/30",
    terracotta:
      "bg-madder/15 text-madder border-madder/25",
    neutral:
      "bg-bg-sand text-ink-soft border-border",
    outline:
      "bg-transparent text-ink-soft border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
