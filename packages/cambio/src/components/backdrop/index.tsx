"use client";

import { AnimatePresence } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioBackdropProps } from "../../types";

export const Backdrop = React.forwardRef<HTMLDivElement, CambioBackdropProps>(
  function Backdrop(props, ref) {
    const { layoutId, open } = useCambioContext();
    const {
      transition = { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
      initial = { opacity: 0, transition: { delay: 0.1 } },
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
