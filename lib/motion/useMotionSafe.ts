"use client";
import { useReducedMotion } from "framer-motion";
import * as full from "./variants";

export function useMotionSafe() {
  const reduced = useReducedMotion();
  return {
    fadeUp: reduced ? full.reducedFadeUp : full.fadeUp,
    fadeIn: reduced ? full.reducedFadeIn : full.fadeIn,
    scaleIn: reduced ? full.reducedFadeIn : full.scaleIn,
    staggerContainer: reduced ? {} : full.staggerContainer,
    drawPath: reduced ? full.reducedFadeIn : full.drawPath,
    slideInFromRight: reduced ? full.reducedFadeUp : full.slideInFromRight,
    clipWipeLeft: reduced ? full.reducedFadeIn : full.clipWipeLeft,
    reduced,
  };
}
