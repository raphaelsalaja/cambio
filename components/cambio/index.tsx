"use client";

import { AnimatePresence } from "motion/react";
import { forwardRef, useCallback, useId, useMemo, useState } from "react";
import { CambioContext, useCambioContext } from "./context";
import { MotionDialog } from "./motion";
import type { CambioProps } from "./types";

export const Root = forwardRef<HTMLDivElement, CambioProps.Root>(
  function Root(props, _ref) {
    const {
      children,
      layoutId,
      open,
      onOpenChange,
      defaultOpen = false,
      ...dialogProps
    } = props;

    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);

    const reactId = useId();

    const uniqueLayoutId = useMemo(
      () => layoutId || `cambio-dialog-${reactId}`,
      [layoutId, reactId],
    );

    const isOpen = open !== undefined ? open : internalOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean, event?: Event, reason?: unknown) => {
        if (onOpenChange) {
          onOpenChange(
            newOpen,
            event,
            reason as Parameters<typeof onOpenChange>[2],
          );
        } else {
          setInternalOpen(newOpen);
        }
      },
      [onOpenChange],
    );

    return (
      <CambioContext.Provider
        value={{
          layoutId: uniqueLayoutId,
          open: isOpen,
        }}
      >
        <MotionDialog.Root
          {...dialogProps}
          open={isOpen}
          onOpenChange={handleOpenChange}
          data-cambio-root
        >
          {children}
        </MotionDialog.Root>
      </CambioContext.Provider>
    );
  },
);

export const Trigger = forwardRef<HTMLButtonElement, CambioProps.Trigger>(
  function Trigger(props, ref) {
    const { layoutId } = useCambioContext();

    return (
      <MotionDialog.Trigger
        {...props}
        ref={ref}
        layoutId={layoutId}
        key={`cambio-trigger-${layoutId}`}
        data-cambio-trigger
        // layoutCrossfade={false}
      />
    );
  },
);

export const Portal = forwardRef<HTMLDivElement, CambioProps.Portal>(
  function Portal(props, _ref) {
    return (
      <MotionDialog.Portal keepMounted={true} data-cambio-portal {...props} />
    );
  },
);

export const Backdrop = forwardRef<HTMLDivElement, CambioProps.Backdrop>(
  function Backdrop(props, ref) {
    const { layoutId, open } = useCambioContext();

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Backdrop
            {...props}
            ref={ref}
            key={`cambio-backdrop-${layoutId}`}
            data-cambio-backdrop
          />
        )}
      </AnimatePresence>
    );
  },
);

export const Popup = forwardRef<HTMLDivElement, CambioProps.Popup>(
  function Popup({ ...props }, ref) {
    const { layoutId, open } = useCambioContext();

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            ref={ref}
            layoutId={layoutId}
            data-cambio-popup
            transformTemplate={(_, generated) => {
              return `translate(-50%, -50%) ${generated}`;
            }}
            // layoutCrossfade={false}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
            }}
            key={`cambio-popup-${layoutId}`}
          />
        )}
      </AnimatePresence>
    );
  },
);

export const Title = forwardRef<HTMLHeadingElement, CambioProps.Title>(
  function Title(props, ref) {
    return <MotionDialog.Title ref={ref} data-cambio-title {...props} />;
  },
);

export const Description = forwardRef<
  HTMLParagraphElement,
  CambioProps.Description
>(function Description(props, ref) {
  return (
    <MotionDialog.Description ref={ref} data-cambio-description {...props} />
  );
});

export const Close = forwardRef<HTMLButtonElement, CambioProps.Close>(
  function Close(props, ref) {
    return <MotionDialog.Close ref={ref} data-cambio-close {...props} />;
  },
);
