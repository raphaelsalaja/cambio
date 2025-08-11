/**
 * Hook to detect user's preference for reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
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

  if (typeof window === "undefined") {
    return false;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
}
