"use client";

import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioTriggerProps } from "../../types";

export const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, CambioTriggerProps>(
    function Trigger(props, ref) {
      const { layoutId, motionConfig } = useCambioContext();

      const {
        transition = {
          layout: motionConfig.enter,
          ...props.transition,
        },
      } = props;

      return (
        <MotionDialog.Trigger
          {...props}
          ref={ref}
          layoutId={layoutId}
          layoutCrossfade={false}
          transition={transition}
        />
      );
    },
  ),
);

Trigger.displayName = "Cambio.Trigger";
