"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import React from "react";
import { CambioContext } from "../../context";

const MotionBaseRoot = motion.create(Dialog.Root);

export const Root = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof MotionBaseRoot>, "layoutId"> & {
    layoutId?: string;
    onOpenChange?: (open: boolean) => void;
  }
>(function Root(props, _ref) {
  const {
    children,
    layoutId: layoutIdProp,
    open,
    onOpenChange,
    defaultOpen = false,
    ...dialogProps
  } = props;

  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen);

  const reactId = React.useId();

  // Simplified layoutId generation without useMemo
  const layoutId = layoutIdProp ?? `cambio-dialog-${reactId}`;

  const isOpen = open !== undefined ? open : internalOpen;

  // Handle Base UI's onOpenChange signature but expose simplified version
  const handleBaseUIOpenChange = React.useCallback(
    (newOpen: boolean, _event?: Event, _reason?: unknown) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [onOpenChange],
  );

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [onOpenChange],
  );

  return (
    <CambioContext.Provider
      value={{
        layoutId,
        open: isOpen,
        onOpenChange: handleOpenChange,
      }}
    >
      <MotionBaseRoot
        {...dialogProps}
        open={isOpen}
        onOpenChange={handleBaseUIOpenChange}
      >
        {children}
      </MotionBaseRoot>
    </CambioContext.Provider>
  );
});

Root.displayName = "Cambio.Root";
