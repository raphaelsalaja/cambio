"use client";

import React from "react";
import { MotionDialog } from "../../motion";
import type { CambioTitleProps } from "../../types";

export const Title = React.memo(
  React.forwardRef<HTMLHeadingElement, CambioTitleProps>(
    function Title(props, ref) {
      return <MotionDialog.Title ref={ref} {...props} />;
    },
  ),
);

Title.displayName = "Cambio.Title";
