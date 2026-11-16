"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "terracotta";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.97] cursor-pointer";

  const variantClasses = {
    primary:
      "bg-indigo text-surface hover:bg-indigo-soft focus-visible:ring-indigo shadow-xs hover:shadow-sm",
    secondary:
      "bg-marigold text-surface hover:bg-marigold/90 focus-visible:ring-marigold shadow-xs",
    terracotta:
      "bg-madder text-surface hover:bg-madder/90 focus-visible:ring-madder shadow-xs",
    outline:
      "bg-transparent border border-border text-ink hover:bg-bg-sand focus-visible:ring-indigo",
    ghost:
      "bg-transparent text-ink hover:bg-bg-sand focus-visible:ring-indigo",
    dark:
      "bg-ink text-surface hover:bg-ink-soft focus-visible:ring-ink shadow-xs",
  };

  const sizeClasses = {
    sm: "text-xs px-3.5 py-2 min-h-[44px] gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2",
    lg: "text-base px-6 py-3.5 min-h-[48px] gap-2.5",
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const inner =
    variant === "primary" ? (
      <span className="border-b-2 border-transparent group-hover:border-marigold transition-colors duration-150 leading-none pb-px">
        {children}
      </span>
    ) : (
      children
    );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={combinedClasses}
      >
        {inner}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonAsButton;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {inner}
    </button>
  );
}

export default Button;
