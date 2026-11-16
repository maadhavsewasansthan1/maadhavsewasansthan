"use client";

import { motion, useReducedMotion } from "framer-motion";
import { drawPath } from "@/lib/motion/variants";

interface KolamDividerProps {
  className?: string;
}

const DOT_XS = ["10%", "23%", "36%", "50%", "64%", "77%", "90%"];

export default function KolamDivider({ className = "" }: KolamDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Build diagonal connecting lines: each adjacent pair of dots forms an X
  // For dots at indices i and i+1, draw two crossing diagonals:
  //   line from (xi, 10) to (xi+1, 22)  and  (xi, 22) to (xi+1, 10)
  const lines: { d: string; key: string }[] = [];
  for (let i = 0; i < DOT_XS.length - 1; i++) {
    const x1 = DOT_XS[i];
    const x2 = DOT_XS[i + 1];
    lines.push({ d: `M ${x1} 10 L ${x2} 22`, key: `dn-${i}` });
    lines.push({ d: `M ${x1} 22 L ${x2} 10`, key: `up-${i}` });
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100% 32"
      width="100%"
      height="32"
      aria-hidden="true"
      className={`opacity-50 ${className}`}
      style={{ display: "block" }}
    >
      {/* Connecting lines */}
      {lines.map(({ d, key }) =>
        shouldReduceMotion ? (
          <path
            key={key}
            d={d}
            stroke="currentColor"
            strokeWidth={0.9}
            fill="none"
            opacity={1}
          />
        ) : (
          <motion.path
            key={key}
            d={d}
            stroke="currentColor"
            strokeWidth={0.9}
            fill="none"
            variants={drawPath}
            initial="hidden"
            animate="visible"
          />
        )
      )}

      {/* 7 dots */}
      {DOT_XS.map((cx, i) => (
        <circle
          key={`dot-${i}`}
          cx={cx}
          cy={16}
          r={2}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
