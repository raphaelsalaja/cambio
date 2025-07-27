"use client";

import { useCallback, useEffect, useState } from "react";

export interface HeadingLink {
  id: string;
  title: string;
  tagName: string;
  element: HTMLHeadingElement;
}

type UseOutlineOptions = {
  /**
   * CSS selector for the headings to include in the table of contents
   * @default 'h1, h2, h3'
   */
  selectors?: string;

  /**
   * Root element to search for headings within
   * @default document
   */
  rootElement?: HTMLElement | null;

  /**
   * Offset for determining when a heading is active
   * @default 100
   */
  offset?: number;
};

/**
 * Custom hook to generate a table of contents from headings in the document
 */
export function useOutline(options?: UseOutlineOptions) {
  const {
    selectors = "h1, h2, h3",
    rootElement = typeof document !== "undefined" ? document : null,
    offset = 100,
  } = options || {};

  const [headingLinks, setHeadingLinks] = useState<HeadingLink[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Function to gather headings
  const gatherHeadings = useCallback(() => {
    if (!rootElement) return;

    const headingElements = rootElement.querySelectorAll(selectors);

    const links: HeadingLink[] = Array.from(headingElements)
      // Filter out headings without IDs or content
      .filter((heading) => heading.id && heading.textContent)
      .map((heading) => ({
        id: heading.id,
        title: heading.textContent || "",
        tagName: heading.tagName,
        element: heading as HTMLHeadingElement,
      }));

    setHeadingLinks(links);
  }, [rootElement, selectors]);

  // Set up listeners and gather headings
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window === "undefined" || !rootElement) return;

    // Gather headings when component mounts
    gatherHeadings();
  }, [gatherHeadings, rootElement]);

  // Separate effect for scroll handling that depends on headingLinks
  useEffect(() => {
    if (
      headingLinks.length === 0 ||
      typeof window === "undefined" ||
      !rootElement
    )
      return;

    // Function to check which heading is active
    const determineActiveHeading = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY;

      // Find the last heading that is above the current scroll position plus offset
      for (let i = headingLinks.length - 1; i >= 0; i--) {
        const heading = headingLinks[i];

        // Get element position
        const rect = heading.element.getBoundingClientRect();
        const elemTop = rect.top + scrollPosition;

        if (scrollPosition >= elemTop - offset) {
          setActiveId(heading.id);
          return;
        }
      }

      // If no heading is found, set the first one as active
      if (headingLinks.length > 0) {
        setActiveId(headingLinks[0].id);
      }
    };

    // Set up scroll event listener
    const handleScroll = () => {
      window.requestAnimationFrame(determineActiveHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check for active heading
    determineActiveHeading();

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headingLinks, offset, rootElement]);

  // Re-gather headings when elements might have changed
  useEffect(() => {
    if (!rootElement) return;

    const observer = new MutationObserver(gatherHeadings);

    observer.observe(rootElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [rootElement, gatherHeadings]);

  // Function to check if a heading is active
  const contentIsActive = useCallback(
    (id: string) => {
      return activeId === id;
    },
    [activeId],
  );

  return {
    headingLinks,
    contentIsActive,
    activeId,
  };
}
