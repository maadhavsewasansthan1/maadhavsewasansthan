"use client";

interface BlockPrintBorderProps {
  className?: string;
}

/**
 * A thin repeating block-print buti border.
 * Pattern: diamond ◇ flanked by two dots, tiled every 24px.
 * opacity-10 by default.
 */
export default function BlockPrintBorder({ className = "" }: BlockPrintBorderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="20"
      aria-hidden="true"
      className={`opacity-10 ${className}`}
      style={{ display: "block" }}
    >
      <defs>
        {/* One tile: 24px wide, 20px tall */}
        {/* diamond centered at x=12, y=10, half-size 4px */}
        {/* dots at x=3,y=10 and x=21,y=10 */}
        <pattern
          id="buti-pattern"
          x="0"
          y="0"
          width="24"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* left dot */}
          <circle cx="3" cy="10" r="1.5" fill="currentColor" />
          {/* diamond */}
          <polygon
            points="12,4 17,10 12,16 7,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* right dot */}
          <circle cx="21" cy="10" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill="url(#buti-pattern)" />
    </svg>
  );
}
