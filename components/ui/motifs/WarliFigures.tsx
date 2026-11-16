"use client";

import { motion, useReducedMotion } from "framer-motion";
import { drawPath } from "@/lib/motion/variants";

interface FigureProps {
  className?: string;
}

const sharedProps = {
  stroke: "currentColor" as const,
  fill: "none" as const,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Woman figure with a pot balanced on her head.
 * Circle head, triangle body, stick arms, oval pot on top.
 */
export function WomWithPot({ className = "" }: FigureProps) {
  const reduced = useReducedMotion();

  const paths = [
    // pot (oval above head)
    "M 32 14 Q 32 8 40 8 Q 48 8 48 14 Q 48 18 40 18 Q 32 18 32 14 Z",
    // head circle
    "M 36 24 Q 36 18 40 18 Q 44 18 44 24 Q 44 28 40 28 Q 36 28 36 24 Z",
    // body triangle
    "M 32 50 L 40 28 L 48 50 Z",
    // left arm
    "M 36 36 L 26 32",
    // right arm
    "M 44 36 L 54 32",
    // left leg
    "M 32 50 L 28 65",
    // right leg
    "M 48 50 L 52 65",
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) =>
        reduced ? (
          <path key={i} d={d} {...sharedProps} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...sharedProps}
            variants={drawPath}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          />
        )
      )}
    </svg>
  );
}

/**
 * Elder figure leaning on a walking stick.
 * Smaller circle head, hunched body, stick beside.
 */
export function ElderWithStick({ className = "" }: FigureProps) {
  const reduced = useReducedMotion();

  const paths = [
    // head (smaller)
    "M 34 22 Q 34 17 39 17 Q 44 17 44 22 Q 44 27 39 27 Q 34 27 34 22 Z",
    // hunched spine/body
    "M 39 27 Q 44 38 42 50",
    // left shoulder/arm
    "M 39 32 L 28 38",
    // right arm reaching to stick
    "M 39 32 L 50 44",
    // left leg
    "M 42 50 L 36 65",
    // right leg
    "M 42 50 L 48 65",
    // walking stick
    "M 54 28 L 50 65",
    // stick handle (small curve at top)
    "M 54 28 Q 56 24 58 26",
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) =>
        reduced ? (
          <path key={i} d={d} {...sharedProps} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...sharedProps}
            variants={drawPath}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          />
        )
      )}
    </svg>
  );
}

/**
 * Person beside a small four-legged animal (cow/dog).
 */
export function PersonWithAnimal({ className = "" }: FigureProps) {
  const reduced = useReducedMotion();

  const paths = [
    // Person: head
    "M 14 22 Q 14 17 19 17 Q 24 17 24 22 Q 24 27 19 27 Q 14 27 24 22",
    // Person: body
    "M 19 27 L 19 48",
    // Person: arms
    "M 19 34 L 10 30",
    "M 19 34 L 28 30",
    // Person: left leg
    "M 19 48 L 14 63",
    // Person: right leg
    "M 19 48 L 24 63",
    // Animal: oval body
    "M 42 44 Q 42 36 54 36 Q 66 36 66 44 Q 66 52 54 52 Q 42 52 42 44 Z",
    // Animal: head circle
    "M 62 32 Q 62 28 66 28 Q 70 28 70 32 Q 70 36 66 36 Q 62 36 62 32 Z",
    // Animal: neck
    "M 62 32 L 62 36",
    // Animal: front left leg
    "M 46 52 L 44 63",
    // Animal: front right leg
    "M 50 52 L 50 63",
    // Animal: back left leg
    "M 58 52 L 58 63",
    // Animal: back right leg
    "M 62 52 L 64 63",
    // Animal: tail
    "M 42 44 Q 36 40 34 36",
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) =>
        reduced ? (
          <path key={i} d={d} {...sharedProps} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...sharedProps}
            variants={drawPath}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          />
        )
      )}
    </svg>
  );
}

/**
 * Cupped hands offering a bowl.
 */
export function HandWithBowl({ className = "" }: FigureProps) {
  const reduced = useReducedMotion();

  const paths = [
    // bowl (circle/oval)
    "M 28 30 Q 28 22 40 22 Q 52 22 52 30 Q 52 38 40 38 Q 28 38 28 30 Z",
    // left hand/arm cupped under bowl (left side)
    "M 20 50 Q 20 42 28 38",
    // right hand/arm cupped under bowl (right side)
    "M 60 50 Q 60 42 52 38",
    // left wrist/arm going down
    "M 20 50 L 16 62",
    // right wrist/arm going down
    "M 60 50 L 64 62",
    // connecting bottom of cupped hands
    "M 20 50 Q 40 56 60 50",
    // small dot in bowl center representing offering
    "M 37 30 Q 37 27 40 27 Q 43 27 43 30 Q 43 33 40 33 Q 37 33 37 30 Z",
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) =>
        reduced ? (
          <path key={i} d={d} {...sharedProps} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...sharedProps}
            variants={drawPath}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          />
        )
      )}
    </svg>
  );
}
