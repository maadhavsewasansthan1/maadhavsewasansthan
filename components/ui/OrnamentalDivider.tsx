import React from "react";
import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
}

/**
 * A full-width horizontal ornamental divider using a repeating block-print
 * vine/paisley motif inspired by Indian textile border patterns.
 * Uses currentColor so it adapts to dark mode via CSS inheritance.
 */
export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "w-full block opacity-40 my-10 md:my-14",
        className
      )}
      style={{ height: "48px" }}
      // viewBox is wide enough for the pattern to tile; we use a fixed height
      viewBox="0 0 400 48"
    >
      <defs>
        {/*
          The base motif: a central diamond with two curling tendrils on each
          side, plus tiny leaf tips — a simplified block-print vine unit.
          Unit width = 40px, height = 48px, centred at (20, 24).
        */}
        <g id="motif">
          {/* Centre diamond */}
          <path
            d="M20 10 L26 24 L20 38 L14 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Inner diamond dot */}
          <circle cx="20" cy="24" r="2" fill="currentColor" />

          {/* Left tendril — S-curve outward */}
          <path
            d="M14 24 C10 20 4 20 2 24 C4 28 10 28 14 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {/* Left leaf tip */}
          <path
            d="M2 24 C0 21 -1 23 0 24 C-1 25 0 27 2 24"
            fill="currentColor"
            stroke="none"
          />

          {/* Right tendril — S-curve outward */}
          <path
            d="M26 24 C30 20 36 20 38 24 C36 28 30 28 26 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {/* Right leaf tip */}
          <path
            d="M38 24 C40 21 41 23 40 24 C41 25 40 27 38 24"
            fill="currentColor"
            stroke="none"
          />

          {/* Top curl from diamond apex */}
          <path
            d="M20 10 C18 6 16 4 20 2 C24 4 22 6 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Top leaf dot */}
          <circle cx="20" cy="2" r="1.2" fill="currentColor" />

          {/* Bottom curl from diamond nadir */}
          <path
            d="M20 38 C18 42 16 44 20 46 C24 44 22 42 20 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Bottom leaf dot */}
          <circle cx="20" cy="46" r="1.2" fill="currentColor" />

          {/* Small accent dots on the tendrils */}
          <circle cx="8" cy="20" r="0.9" fill="currentColor" />
          <circle cx="8" cy="28" r="0.9" fill="currentColor" />
          <circle cx="32" cy="20" r="0.9" fill="currentColor" />
          <circle cx="32" cy="28" r="0.9" fill="currentColor" />
        </g>

        {/*
          Pattern tile: each motif unit is 40px wide × 48px tall.
          The thin connector lines are drawn inside the tile (at x=0 and x=40)
          so adjacent tiles join seamlessly.
        */}
        <pattern
          id="vinePattern"
          x="0"
          y="0"
          width="40"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal spine line spanning the full tile width */}
          <line
            x1="0"
            y1="24"
            x2="40"
            y2="24"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <use href="#motif" />
        </pattern>
      </defs>

      {/* Fill entire SVG with the repeating pattern */}
      <rect width="400" height="48" fill="url(#vinePattern)" />
    </svg>
  );
}
