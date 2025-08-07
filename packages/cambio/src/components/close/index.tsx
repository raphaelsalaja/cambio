"use client";

import React from "react";
import { MotionDialog } from "../../motion";
import type { CambioCloseProps } from "../../types";

export const Close = React.memo(
  React.forwardRef<HTMLButtonElement, CambioCloseProps>(
    function Close(props, ref) {
      return <MotionDialog.Close ref={ref} {...props} />;
    },
  ),
);

Close.displayName = "Cambio.Close";
