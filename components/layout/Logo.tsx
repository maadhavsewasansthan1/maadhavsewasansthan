import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "light",
  showText = false,
  className,
  size,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-full",
        className
      )}
      aria-label="Maadhav Sewa Sansthan (माधव सेवा संस्थान)"
    >
      {/* 
        Official Maadhav Sewa Sansthan Emblem:
        Rendered with natural dimensions (243x243) and fixed responsive height:
        44px on mobile and 56px on desktop (w-auto).
        Ivory rounded backing ensures dark circular text remains legible across dark/light themes.
      */}
      <div className="relative rounded-full bg-[#FAF9F5] shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Maadhav Sewa Sansthan logo"
          width={243}
          height={243}
          priority
          className="h-[44px] md:h-[56px] w-auto object-contain rounded-full"
        />
      </div>
    </Link>
  );
}
