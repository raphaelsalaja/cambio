"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";

const MotionBaseBackdrop = motion.create(Dialog.Backdrop);

export const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseBackdrop>
>(function Backdrop(props, ref) {
  const { layoutId, open } = useCambioContext();
  const {
    transition = { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    exit = { opacity: 0 },
  } = props;

  return (
    <AnimatePresence>
      {open && (
        <MotionBaseBackdrop
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
});

Backdrop.displayName = "Cambio.Backdrop";
