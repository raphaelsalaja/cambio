"use client";

import { AnimatePresence } from "motion/react";
import React, { useMemo } from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioPopupProps, MotionDraggableProps } from "../../types";
import {
  getComponentMotionPreset,
  getMotionConfig,
  resolveDismissableConfig,
} from "../../utils";

export const Popup = React.forwardRef<HTMLDivElement, CambioPopupProps>(
  function Popup({ motion: componentMotion, ...props }, ref) {
    const {
      layoutId,
      open,
      onOpenChange,
      motion: globalMotion,
      motionVariants,
      reduceMotion,
      dismissable: rootDismissable,
    } = useCambioContext();

    // Resolve the motion preset for this component
    const resolvedMotion = getComponentMotionPreset(
      "popup",
      componentMotion,
      globalMotion,
      motionVariants,
      reduceMotion,
    );

    // Get the motion config for the resolved preset
    const componentMotionConfig = getMotionConfig(resolvedMotion, reduceMotion);

    // Resolve dismissable configuration from root
    const dismissableConfig = resolveDismissableConfig(rootDismissable);

    const dragging: MotionDraggableProps = useMemo(() => {
      if (!dismissableConfig) return {};

      const { threshold = 100, velocity = 500 } = dismissableConfig;

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
    }, [dismissableConfig, onOpenChange]);

    const { transition = componentMotionConfig.transition } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            {...dragging}
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
              touchAction: dismissableConfig ? "none" : "auto",
              ...props.style,
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

Popup.displayName = "Cambio.Popup";
