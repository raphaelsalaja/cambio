"use client";

import {
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useMemo } from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioPopupProps } from "../../types";

export const Popup = React.forwardRef<HTMLDivElement, CambioPopupProps>(
  function Popup({ dismissable, ...props }, ref) {
    const { layoutId, open, onOpenChange, motionConfig } = useCambioContext();

    const dragX = useMotionValue(0);

    const dragY = useMotionValue(0);

    const dragSpringConfig = motionConfig.drag || {
      stiffness: 400,
      damping: 30,
      restDelta: 0.01,
    };

    const springX = useSpring(dragX, dragSpringConfig);

    const springY = useSpring(dragY, dragSpringConfig);

    const distance = useTransform(
      [springX, springY],
      ([x, y]: [number, number]) => Math.hypot(x, y),
    );

    const scale = useTransform(distance, [0, 50, 100], [1, 0.98, 0.95]);

    const opacity = useTransform(distance, [0, 80], [1, 0.96]);

    const resistance = useTransform(distance, (d) =>
      Math.max(0.1, 1 - Math.log(d / 20 + 1) / 4),
    );

    const dragConfig = useMemo(() => {
      if (!dismissable) return {};

      const { threshold = 60, velocity = 300 } =
        typeof dismissable === "object" ? dismissable : {};

      return {
        drag: true,
        dragElastic: 0,
        dragMomentum: false,
        dragSnapToOrigin: true,
        onDrag: (
          _e: MouseEvent | TouchEvent | PointerEvent,
          info: {
            offset: { x: number; y: number };
            velocity: { x: number; y: number };
          },
        ) => {
          const resistanceValue = resistance.get();
          dragX.set(info.offset.x * resistanceValue);
          dragY.set(info.offset.y * resistanceValue);
        },
        onDragEnd: (
          _e: MouseEvent | TouchEvent | PointerEvent,
          info: {
            offset: { x: number; y: number };
            velocity: { x: number; y: number };
          },
        ) => {
          const dist = Math.hypot(info.offset.x, info.offset.y);
          const speed = Math.hypot(info.velocity.x, info.velocity.y);

          const shouldDismiss = speed > velocity || dist > threshold;

          if (shouldDismiss && onOpenChange) {
            onOpenChange(false);
          } else {
            dragX.set(0);
            dragY.set(0);
          }
        },
      };
    }, [dismissable, onOpenChange, dragX, dragY, resistance]);

    const { transition = motionConfig.transition } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            {...dragConfig}
            ref={ref}
            layoutId={layoutId}
            layoutCrossfade={false}
            layout
            transition={transition}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              touchAction: dismissable ? "none" : "auto",
              cursor: dismissable ? "grab" : "default",
              userSelect: "none",
              WebkitUserSelect: "none",
              scale,
              opacity,
              x: springX,
              y: springY,
              ...props.style,
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

Popup.displayName = "Cambio.Popup";
