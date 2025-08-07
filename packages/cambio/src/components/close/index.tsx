"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";

const MotionBaseClose = motion.create(Dialog.Close);

export const Close = React.memo(
  React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof MotionBaseClose>
  >(function Close(props, ref) {
    return <MotionBaseClose ref={ref} {...props} />;
  }),
);

Close.displayName = "Cambio.Close";
