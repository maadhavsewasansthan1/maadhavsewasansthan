"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Fixed petal configurations with varied positions, durations, and sizes
const PETALS = [
  { id: 1, left: "8%", duration: 22, delay: 0, size: 20, color: "var(--marigold)", opacity: 0.22, sway: 16 },
  { id: 2, left: "24%", duration: 18, delay: 3, size: 16, color: "var(--lotus)", opacity: 0.18, sway: -18 },
  { id: 3, left: "42%", duration: 25, delay: 7, size: 24, color: "var(--marigold)", opacity: 0.2, sway: 22 },
  { id: 4, left: "58%", duration: 20, delay: 2, size: 18, color: "var(--lotus)", opacity: 0.22, sway: -15 },
  { id: 5, left: "74%", duration: 28, delay: 5, size: 22, color: "var(--marigold)", opacity: 0.24, sway: 20 },
  { id: 6, left: "88%", duration: 24, delay: 8, size: 16, color: "var(--lotus)", opacity: 0.18, sway: -22 },
  { id: 7, left: "34%", duration: 30, delay: 11, size: 20, color: "var(--marigold)", opacity: 0.2, sway: 14 },
];

export function KolamBackground() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(min-width: 640px)");
    setIsMobile(!mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const isStatic = reducedMotion || isMobile || !mounted;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <style>{`
        @keyframes kolamSlowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.6); opacity: 1; }
        }
        .kolam-rotating {
          animation: kolamSlowRotate 120s linear infinite;
          transform-origin: 250px 250px;
        }
        .kolam-pulse-1 {
          animation: pulseDot 4s ease-in-out infinite;
          transform-origin: center;
        }
        .kolam-pulse-2 {
          animation: pulseDot 4.5s ease-in-out infinite 2s;
          transform-origin: center;
        }
      `}</style>

      {/* Center Large Faint Kolam Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[720px] lg:h-[720px] flex items-center justify-center">
        <svg
          viewBox="0 0 500 500"
          className={`w-full h-full text-indigo opacity-[0.08] dark:opacity-[0.06] ${
            !isStatic ? "kolam-rotating" : ""
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Kolam Brahma-Mudi Intertwined Loops */}
          {/* Group 1: Cardinal Loop lines */}
          <motion.path
            d="M 250 50 C 350 50 350 150 350 250 C 350 350 250 350 250 450 C 250 350 150 350 150 250 C 150 150 250 150 250 50 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={isStatic ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M 50 250 C 50 150 150 150 250 150 C 350 150 350 250 450 250 C 350 250 350 350 250 350 C 150 350 150 250 50 250 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={isStatic ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Group 2: Diagonal loops (Lotus Kolam) */}
          <motion.path
            d="M 110 110 C 250 70 250 250 390 110 C 350 250 430 250 390 390 C 250 350 250 170 110 390 C 150 250 70 250 110 110 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={isStatic ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Concentric Circles & Grid of Kolam Dots (5x5 Puli lattice) */}
          <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" />
          <circle cx="250" cy="250" r="40" stroke="currentColor" strokeWidth="1" />

          {/* Lattice of Puli Dots */}
          {[130, 190, 250, 310, 370].map((x) =>
            [130, 190, 250, 310, 370].map((y) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={x === 250 && y === 250 ? 5 : (x === 250 || y === 250) ? 3.5 : 2.5}
                fill="currentColor"
              />
            ))
          )}

          {/* Pulsing Marigold Highlight Dots at Cardinal Points */}
          <g className={!isStatic ? "kolam-pulse-1" : ""}>
            <circle cx="250" cy="50" r="4.5" fill="var(--marigold)" />
            <circle cx="250" cy="450" r="4.5" fill="var(--marigold)" />
          </g>
          <g className={!isStatic ? "kolam-pulse-2" : ""}>
            <circle cx="50" cy="250" r="4.5" fill="var(--marigold)" />
            <circle cx="450" cy="250" r="4.5" fill="var(--marigold)" />
            <circle cx="250" cy="250" r="4" fill="var(--marigold)" />
          </g>
        </svg>
      </div>

      {/* Drifting Petals (Floating & Swaying upwards, desktop only) */}
      {!isStatic && (
        <div className="absolute inset-0 pointer-events-none">
          {PETALS.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute"
              style={{
                left: petal.left,
                bottom: "-40px",
                width: petal.size,
                height: petal.size * 1.4,
              }}
              animate={{
                y: [0, -900],
                x: [0, petal.sway, -petal.sway, petal.sway / 2, 0],
                rotate: [0, 45, -30, 60, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 24 34"
                className="w-full h-full"
                style={{ color: petal.color, opacity: petal.opacity }}
                fill="none"
              >
                {/* Organic Indian Lotus / Marigold petal outline */}
                <path
                  d="M 12 2 C 18 10 22 20 18 28 C 14 34 10 34 6 28 C 2 20 6 10 12 2 Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KolamBackground;
