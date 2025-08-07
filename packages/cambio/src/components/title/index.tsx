"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";

const MotionBaseTitle = motion.create(Dialog.Title);

export const Title = React.memo(
  React.forwardRef<
    HTMLHeadingElement,
    React.ComponentPropsWithoutRef<typeof MotionBaseTitle>
  >(function Title(props, ref) {
    return <MotionBaseTitle ref={ref} {...props} />;
  }),
);

Title.displayName = "Cambio.Title";
