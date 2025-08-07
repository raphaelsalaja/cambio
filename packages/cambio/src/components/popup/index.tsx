"use client";

import { AnimatePresence } from "motion/react";
import React, { useMemo } from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioPopupProps, MotionDraggableProps } from "../../types";

export const Popup = React.forwardRef<HTMLDivElement, CambioPopupProps>(
  function Popup({ dismissable, ...props }, ref) {
    const { layoutId, open, onOpenChange } = useCambioContext();

    const dragging: MotionDraggableProps = useMemo(() => {
      if (!dismissable) return {};

      const { threshold = 100, velocity = 500 } =
        typeof dismissable === "object" ? dismissable : {};

      return {
        drag: true,
        dragElastic: 0.3,
        dragMomentum: true,
        dragSnapToOrigin: true,
        dragTransition: { bounceStiffness: 800, bounceDamping: 40 },
        dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
        onDragEnd: (_e, info) => {
          const dist = Math.hypot(info.offset.x, info.offset.y);
          const speed = Math.hypot(info.velocity.x, info.velocity.y);
          if ((dist > threshold || speed > velocity) && onOpenChange) {
            onOpenChange(false);
          }
        },
      };
    }, [dismissable, onOpenChange]);

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            {...dragging}
            ref={ref}
            layoutId={layoutId}
            layoutCrossfade={false}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              touchAction: dismissable ? "none" : "auto",
              ...props.style,
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

Popup.displayName = "Cambio.Popup";
