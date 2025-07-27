"use client";

import { useCallback } from "react";

/**
 * Custom hook for smooth scrolling to elements with offset
 */
export function useSmoothScroll(offset = 0) {
  /**
   * Smoothly scrolls to the element with the given ID
   */
  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id);

      if (!element) return;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [offset],
  );

  /**
   * Handle click event for anchor links
   */
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToId(id);

      // Update URL without scrolling
      window.history.pushState(null, "", `#${id}`);
    },
    [scrollToId],
  );

  return { scrollToId, handleLinkClick };
}
