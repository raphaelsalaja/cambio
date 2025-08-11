import { useEffect, useState } from "react";
import type { MotionConfig, MotionPreset } from "../types";

/**
 * Motion preset configurations
 */
export const MOTION_PRESETS: Record<MotionPreset, MotionConfig> = {
  snappy: {
    enter: {
      type: "tween",
      duration: 0.18,
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out
    },
    exit: {
      type: "tween",
      duration: 0.15,
      ease: [0.55, 0.06, 0.68, 0.19], // ease-in
    },
  },
  smooth: {
    enter: {
      type: "tween",
      duration: 0.24,
      ease: [0.42, 0, 0.58, 1], // ease-in-out
    },
    exit: {
      type: "tween",
      duration: 0.2,
      ease: [0.42, 0, 0.58, 1], // ease-in-out
    },
  },
  bouncy: {
    enter: {
      type: "spring",
      bounce: 0.2,
      duration: 0.4,
    },
    exit: {
      type: "tween",
      duration: 0.2,
      ease: [0.42, 0, 0.58, 1], // ease-in-out for exit
    },
  },
  reduced: {
    enter: {
      type: "tween",
      duration: 0.01,
      ease: "linear",
    },
    exit: {
      type: "tween",
      duration: 0.01,
      ease: "linear",
    },
  },
};

/**
 * Get motion configuration for a given preset
 * @param preset - The motion preset to use
 * @param forceReduced - Whether to force reduced motion regardless of preset
 * @returns MotionConfig with enter and exit transitions
 */
export function getMotionConfig(
  preset: MotionPreset,
  forceReduced: boolean = false,
): MotionConfig {
  if (forceReduced) {
    return MOTION_PRESETS.reduced;
  }
  return MOTION_PRESETS[preset];
}

/**
 * Resolve the motion preset based on user preference and system settings
 * @param motionPreset - Override preset or undefined to use default
 * @param reduceMotion - Whether reduced motion is preferred
 * @returns The resolved motion preset
 */
export function resolveMotionPreset(
  motionPreset?: MotionPreset,
  reduceMotion: boolean = false,
): MotionPreset {
  // If reduced motion is preferred and no explicit preset override, use reduced
  if (reduceMotion && !motionPreset) {
    return "reduced";
  }

  // Return explicit preset or default to smooth
  return motionPreset ?? "smooth";
}

/**
 * Helper function to check if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
function getReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
}

/**
 * React hook to detect user's preference for reduced motion with reactive updates
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => getReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    // Support both modern and legacy browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return reducedMotion;
}

/**
 * Resolves the final reduced motion state based on user preference and override
 * @param reduceMotion - Override value (true/false) or undefined to use system preference
 * @returns boolean indicating if motion should be reduced
 */
export function getReducedMotionState(reduceMotion?: boolean): boolean {
  if (typeof reduceMotion === "boolean") {
    return reduceMotion;
  }

  return getReducedMotion();
}
