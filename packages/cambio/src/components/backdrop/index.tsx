"use client";

import { AnimatePresence } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioBackdropProps } from "../../types";
import { getComponentMotionPreset, getMotionConfig } from "../../utils";

export const Backdrop = React.forwardRef<HTMLDivElement, CambioBackdropProps>(
  function Backdrop({ motion: componentMotion, ...props }, ref) {
    const {
      layoutId,
      open,
      motion: globalMotion,
      motionVariants,
      reduceMotion,
    } = useCambioContext();

    // Resolve the motion preset for this component
    const resolvedMotion = getComponentMotionPreset(
      "backdrop",
      componentMotion,
      globalMotion,
      motionVariants,
      reduceMotion,
    );

    // Get the motion config for the resolved preset
    const componentMotionConfig = getMotionConfig(resolvedMotion, reduceMotion);

    const {
      transition = componentMotionConfig.transition,
      initial = { opacity: 0 },
      animate = { opacity: 1 },
      exit = { opacity: 0 },
    } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Backdrop
            {...props}
            ref={ref}
            key={`cambio-backdrop-${layoutId}`}
            transition={transition}
            initial={initial}
            animate={animate}
            exit={exit}
          />
        )}
      </AnimatePresence>
    );
  },
);

Backdrop.displayName = "Cambio.Backdrop";
