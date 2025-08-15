"use client";

import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioTriggerProps } from "../../types";

export const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, CambioTriggerProps>(function Trigger(
    { motion: componentMotion, ...props },
    ref,
  ) {
    const { open, layoutId } = useCambioContext();

    const [z, setZ] = React.useState<number>(open ? 1000 : 0);

    React.useEffect(() => {
      if (open) {
        setZ(1000);
      }
    }, [open]);

    const handleAnimationComplete = React.useCallback(() => {
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
        onAnimationComplete={handleAnimationComplete}
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
