"use client";

import { AnimatePresence } from "motion/react";
import React from "react";
import { useCambioContext } from "../..";
import { MotionDialog } from "../../motion";
import type { CambioPortalProps } from "../../types";

export const Portal = React.memo(
  React.forwardRef<HTMLDivElement, CambioPortalProps>(
    function Portal(props, _ref) {
      const { open } = useCambioContext();

      return (
        <AnimatePresence>
          {open && <MotionDialog.Portal keepMounted={true} {...props} />}
        </AnimatePresence>
      );
    },
  ),
);

Portal.displayName = "Cambio.Portal";
