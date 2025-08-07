"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";

const MotionBaseDescription = motion.create(Dialog.Description);

export const Description = React.memo(
  React.forwardRef<
    HTMLParagraphElement,
    React.ComponentPropsWithoutRef<typeof MotionBaseDescription>
  >(function Description(props, ref) {
    return <MotionBaseDescription ref={ref} {...props} />;
  }),
);

Description.displayName = "Cambio.Description";
