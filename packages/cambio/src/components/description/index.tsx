"use client";

import React from "react";
import { MotionDialog } from "../../motion";
import type { CambioDescriptionProps } from "../../types";

export const Description = React.memo(
  React.forwardRef<HTMLParagraphElement, CambioDescriptionProps>(
    function Description(props, ref) {
      return <MotionDialog.Description ref={ref} {...props} />;
    },
  ),
);

Description.displayName = "Cambio.Description";
