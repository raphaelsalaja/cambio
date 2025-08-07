"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";
import type { DragProps } from "../../types";

const MotionBasePopup = motion.create(Dialog.Popup);

export const Popup = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof MotionBasePopup>, "layoutId"> &
    DragProps
>(function Popup({ ...props }, ref) {
  const { layoutId, open, onOpenChange } = useCambioContext();

  const {
    transition = {
      type: "spring",
      bounce: 0.2,
      duration: 0.4,
    },
    dismissable = false,
    dragThreshold = 100,
    dragVelocityThreshold = 500,
    dragDirection = true,
    dragElastic = 0.2,
    onDragStart,
    onDrag,
    onDragEnd: onDragEndProp,
    ...restProps
  } = props;

  const handleDragStart = React.useCallback(() => {
    onDragStart?.();
  }, [onDragStart]);

  const handleDrag = React.useCallback(
    (
      _: unknown,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      },
    ) => {
      onDrag?.(info);
    },
    [onDrag],
  );

  const handleDragEnd = React.useCallback(
    (
      _: unknown,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      },
    ) => {
      // Call custom onDragEnd callback first
      onDragEndProp?.(info);

      // Simplified drag logic using hypot for distance and velocity calculation
      const distance = Math.hypot(info.offset.x, info.offset.y);
      const speed = Math.hypot(info.velocity.x, info.velocity.y);
      const shouldDismiss =
        distance > dragThreshold || speed > dragVelocityThreshold;

      if (shouldDismiss && onOpenChange) {
        onOpenChange(false);
      }
    },
    [onDragEndProp, dragThreshold, dragVelocityThreshold, onOpenChange],
  );

  const dragProps = dismissable
    ? {
        drag: dragDirection || true,
        dragSnapToOrigin: true,
        dragConstraints:
          dragDirection === "y"
            ? { top: 0 }
            : dragDirection === "x"
              ? { left: 0 }
              : {},
        dragElastic: dragElastic || 0.2,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        whileDrag: {
          scale: 0.95,
          transition: { duration: 0.2 },
        },
      }
    : {};

  return (
    <AnimatePresence>
      {open && (
        <MotionBasePopup
          {...dragProps}
          {...restProps}
          ref={ref}
          layoutId={layoutId}
          transformTemplate={(_, generated) =>
            `translate(-50%, -50%) ${generated}`
          }
          transition={transition}
          layoutCrossfade={false}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            touchAction: dismissable ? "none" : "auto",
            ...restProps.style,
          }}
        />
      )}
    </AnimatePresence>
  );
});

Popup.displayName = "Cambio.Popup";
