"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";
import { useCambioContext } from "../../context";

const MotionBaseTrigger = motion.create(Dialog.Trigger);

export const Trigger = React.memo(
  React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof MotionBaseTrigger>
  >(function Trigger(props, ref) {
    const { layoutId } = useCambioContext();

    const {
      transition = {
        type: "spring",
        bounce: 0.2,
        duration: 0.4,
      },
    } = props;

    return (
      <MotionBaseTrigger
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
