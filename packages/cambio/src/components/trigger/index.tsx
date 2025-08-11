"use client";

import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioTriggerProps } from "../../types";
import { getComponentMotionPreset, getMotionConfig } from "../../utils";

export const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, CambioTriggerProps>(function Trigger(
    { motion: componentMotion, ...props },
    ref,
  ) {
    const {
      layoutId,
      motion: globalMotion,
      motionVariants,
      reduceMotion,
    } = useCambioContext();

    // Resolve the motion preset for this component
    const resolvedMotion = getComponentMotionPreset(
      "trigger",
      componentMotion,
      globalMotion,
      motionVariants,
      reduceMotion,
    );

    // Get the motion config for the resolved preset
    const componentMotionConfig = getMotionConfig(resolvedMotion, reduceMotion);

    const { transition = componentMotionConfig.transition } = props;

    return (
      <MotionDialog.Trigger
        {...props}
        ref={ref}
        layoutId={layoutId}
        layoutCrossfade={false}
        transition={transition}
      />
    );
  }),
);

Trigger.displayName = "Cambio.Trigger";
