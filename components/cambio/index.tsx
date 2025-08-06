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

    const {
      transition = {
        type: "spring",
        bounce: 0.2,
        duration: 0.4,
      },
    } = props;

    return (
      <MotionDialog.Trigger
        {...props}
        ref={ref}
        layoutId={layoutId}
        layoutCrossfade={false}
        transition={transition}
      />
    );
  },
);

export const Portal = forwardRef<HTMLDivElement, CambioProps.Portal>(
  function Portal(props, _ref) {
    return <MotionDialog.Portal keepMounted={true} {...props} />;
  },
);

export const Backdrop = forwardRef<HTMLDivElement, CambioProps.Backdrop>(
  function Backdrop(props, ref) {
    const { layoutId, open } = useCambioContext();
    const {
      transition = { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
      initial = { opacity: 0 },
      animate = { opacity: 1 },
      exit = { opacity: 0 },
    } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Backdrop
            {...props}
            ref={ref}
            key={`cambio-backdrop-${layoutId}`}
            transition={transition}
            initial={initial}
            animate={animate}
            exit={exit}
          />
        )}
      </AnimatePresence>
    );
  },
);

export const Popup = forwardRef<HTMLDivElement, CambioProps.Popup>(
  function Popup({ ...props }, ref) {
    const { layoutId, open } = useCambioContext();

    const {
      transition = {
        type: "spring",
        bounce: 0.2,
        duration: 0.4,
      },
    } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            ref={ref}
            layoutId={layoutId}
            transformTemplate={(_, generated) =>
              `translate(-50%, -50%) ${generated}`
            }
            transition={transition}
            layoutCrossfade={false}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

export const Title = forwardRef<HTMLHeadingElement, CambioProps.Title>(
  function Title(props, ref) {
    return <MotionDialog.Title ref={ref} {...props} />;
  },
);

export const Description = forwardRef<
  HTMLParagraphElement,
  CambioProps.Description
>(function Description(props, ref) {
  return <MotionDialog.Description ref={ref} {...props} />;
});

export const Close = forwardRef<HTMLButtonElement, CambioProps.Close>(
  function Close(props, ref) {
    return <MotionDialog.Close ref={ref} {...props} />;
  },
);
