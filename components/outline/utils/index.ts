import type { MotionTransition } from "../types";

export function getScale(length: number) {
  const minScale = 0.5;
  const maxScale = 0.8;
  const minLinks = 50;
  const maxLinks = 80;
  const clamped = Math.min(Math.max(length, minLinks), maxLinks);
  return (
    minScale +
    (maxScale - minScale) * ((clamped - minLinks) / (maxLinks - minLinks))
  );
}

export const defaultTransition: MotionTransition = {
  default: {
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.2,
  },
  opacity: {
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.1,
  },
};
