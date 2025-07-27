"use client";

import { Fragment, useEffect, useState } from "react";
import { useOutline } from "@/hooks/useOutline";
import type { OutlineProps } from "../types";
import { ExpandedOutline } from "./expanded";
import { MinimizedOutline } from "./minimized";

export const OutlineProvider: React.FC<OutlineProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const contentRef = props.contentRef;

  useEffect(() => {
    if (contentRef?.current) setRootElement(contentRef.current);
  }, [contentRef]);

  const providedLinks =
    "headingLinks" in props ? props.headingLinks : undefined;
  const providedActive =
    "contentIsActive" in props ? props.contentIsActive : undefined;

  const { headingLinks: calcLinks, contentIsActive: calcActive } = useOutline(
    rootElement ? { rootElement, offset: 120 } : undefined,
  );

  const headingLinks = providedLinks ?? calcLinks;
  const contentIsActive = providedActive ?? calcActive;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fragment>
      <MinimizedOutline
        headingLinks={headingLinks}
        contentIsActive={contentIsActive}
        isHovered={isHovered}
      />

      <ExpandedOutline
        headingLinks={headingLinks}
        contentIsActive={contentIsActive}
        isHovered={isHovered}
        onHoverChange={setIsHovered}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
        }}
        ref={props.contentRef}
      >
        {props.children}
      </div>
    </Fragment>
  );
};
