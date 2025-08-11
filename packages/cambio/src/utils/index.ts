import { useEffect, useState } from "react";
import type {
  DismissableConfig,
  DismissableValue,
  MotionConfig,
  MotionConfigValue,
  MotionPreset,
  MotionVariants,
} from "../types";

export const MOTION_PRESETS: Record<MotionPreset, MotionConfig> = {
  snappy: {
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.24,
    },
    drag: {
      stiffness: 600,
      damping: 40,
      restDelta: 0.01,
    },
  },
  smooth: {
    transition: {
      ease: [0.42, 0, 0.58, 1],
      duration: 0.3,
    },
    drag: {
      stiffness: 350,
      damping: 25,
      restDelta: 0.01,
    },
  },
  bouncy: {
    transition: {
      type: "spring",
      stiffness: 1200,
      damping: 80,
      mass: 4,
    },
    drag: {
      stiffness: 400,
      damping: 30,
      restDelta: 0.01,
    },
  },
  reduced: {
    transition: {
      ease: "linear",
      duration: 0.01,
    },
    drag: {
      stiffness: 1000,
      damping: 50,
      restDelta: 0.1,
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
 * Parse motion config value into preset and variants
 * @param motion - The motion configuration value
 * @returns Object with preset and variants
 */
export function parseMotionConfig(motion?: MotionConfigValue): {
  preset: MotionPreset;
  variants?: MotionVariants;
} {
  if (typeof motion === "string") {
    return { preset: motion };
  }

  if (typeof motion === "object") {
    return {
      preset: "smooth", // Default preset when using variants
      variants: motion,
    };
  }

  return { preset: "smooth" };
}

/**
 * Get motion preset for a specific component, considering variants and overrides
 * @param componentType - The type of component (trigger, popup, backdrop)
 * @param componentMotion - Component-level motion override
 * @param globalMotion - Global motion configuration from Root
 * @param variants - Motion variants from Root
 * @param reduceMotion - Whether to force reduced motion
 * @returns The resolved motion preset for the component
 */
export function getComponentMotionPreset(
  componentType: keyof MotionVariants,
  componentMotion?: MotionPreset,
  globalMotion?: MotionPreset,
  variants?: MotionVariants,
  reduceMotion: boolean = false,
): MotionPreset {
  if (reduceMotion) {
    return "reduced";
  }

  // Component-level override takes highest priority
  if (componentMotion) {
    return componentMotion;
  }

  // Then check if there's a variant for this component type
  if (variants?.[componentType]) {
    return variants[componentType] as MotionPreset;
  }

  // Fall back to global motion preset
  return globalMotion ?? "smooth";
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

/**
 * Resolve dismissible configuration with proper defaults
 * @param dismissible - The dismissible configuration value
 * @returns Resolved dismissible config with defaults
 */
export function resolveDismissableConfig(
  dismissible?: DismissableValue,
): DismissableConfig | null {
  if (!dismissible) {
    return null;
  }

  if (typeof dismissible === "boolean") {
    return dismissible ? { threshold: 100, velocity: 500 } : null;
  }

  return {
    threshold: 100,
    velocity: 500,
    ...dismissible,
  };
}
