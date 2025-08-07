"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";

const MotionBasePortal = motion.create(Dialog.Portal);

export const Portal = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof MotionBasePortal>
  >(function Portal(props, _ref) {
    return <MotionBasePortal keepMounted={true} {...props} />;
  }),
);

Portal.displayName = "Cambio.Portal";
