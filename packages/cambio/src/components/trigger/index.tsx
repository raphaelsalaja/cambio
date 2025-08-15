"use client";

import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioTriggerProps } from "../../types";

const TRIGGER_Z_INDEX = 1000;

export const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, CambioTriggerProps>(function Trigger(
    { motion: componentMotion, ...props },
    ref,
  ) {
    const { open, layoutId } = useCambioContext();

    const [z, setZ] = React.useState<number>(open ? TRIGGER_Z_INDEX : 0);

    React.useEffect(() => {
      if (open) {
        setZ(TRIGGER_Z_INDEX);
      }
    }, [open]);

    const handleLayoutAnimationComplete = React.useCallback(() => {
      if (!open) {
        setZ(0);
      }
    }, [open]);

    return (
      <MotionDialog.Trigger
        {...props}
        ref={ref}
        layoutId={layoutId}
        layoutCrossfade={false}
        onLayoutAnimationComplete={handleLayoutAnimationComplete}
        style={{
          position: "relative",
          zIndex: z,
          ...props.style,
        }}
      />
    );
  }),
);

Trigger.displayName = "Cambio.Trigger";
