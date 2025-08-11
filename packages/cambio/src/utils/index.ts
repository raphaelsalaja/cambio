import { useEffect, useState } from "react";
import type { MotionConfig, MotionPreset } from "../types";

export const MOTION_PRESETS: Record<MotionPreset, MotionConfig> = {
  snappy: {
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.24,
    },
  },
  smooth: {
    transition: {
      ease: [0.42, 0, 0.58, 1],
      duration: 0.3,
    },
  },
  bouncy: {
    transition: {
      type: "spring",
      stiffness: 1200,
      damping: 80,
      mass: 4,
    },
  },
  reduced: {
    transition: {
      ease: "linear",
      duration: 0.01,
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
 * @param motion - Override preset or undefined to use default
 * @param reduceMotion - Whether reduced motion is preferred
 * @returns The resolved motion preset
 */
export function resolveMotionPreset(
  motion?: MotionPreset,
  reduceMotion: boolean = false,
): MotionPreset {
  if (reduceMotion && !motion) {
    return "reduced";
  }

  return motion ?? "smooth";
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
