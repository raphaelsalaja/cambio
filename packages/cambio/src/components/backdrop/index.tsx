"use client";

import { AnimatePresence } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioBackdropProps } from "../../types";

export const Backdrop = React.forwardRef<HTMLDivElement, CambioBackdropProps>(
  function Backdrop(props, ref) {
    const { layoutId, open, motionConfig } = useCambioContext();
    const {
      transition = motionConfig.transition,
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
