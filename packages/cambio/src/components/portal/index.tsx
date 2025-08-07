"use client";

import React from "react";
import { MotionDialog } from "../../motion";
import type { CambioPortalProps } from "../../types";

export const Portal = React.memo(
  React.forwardRef<HTMLDivElement, CambioPortalProps>(
    function Portal(props, _ref) {
      return <MotionDialog.Portal keepMounted={true} {...props} />;
    },
  ),
);

Portal.displayName = "Cambio.Portal";
