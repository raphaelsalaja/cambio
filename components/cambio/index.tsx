"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { nanoid } from "nanoid";
import * as React from "react";

interface CambioContextValue {
  layoutId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CambioContext = React.createContext<CambioContextValue | null>(null);

function useCambioContext() {
  const context = React.useContext(CambioContext);
  if (!context) {
    throw new Error("Cambio components must be used within a Cambio Root");
  }
  return context;
}

export const Root = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Dialog.Root> & {
    layoutId?: string;
    defaultOpen?: boolean;
  }
>(function Root(
  { children, layoutId, open, onOpenChange, defaultOpen = false, ...props },
  _ref,
) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const uniqueLayoutId = React.useMemo(
    () => layoutId || `cambio-dialog-${nanoid(8)}`,
    [layoutId],
  );

  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean, event?: Event, reason?: string) => {
      if (onOpenChange) {
        (onOpenChange as any)(newOpen, event, reason);
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
        onOpenChange: handleOpenChange,
      }}
    >
      <Dialog.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        data-cambio-root
        {...props}
      >
        {children}
      </Dialog.Root>
    </CambioContext.Provider>
  );
});

export const MotionTrigger = motion.create(Dialog.Trigger);
export const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<typeof MotionTrigger>
>(function Trigger(props, ref) {
  const { layoutId } = useCambioContext();
  return (
    <MotionTrigger
      ref={ref}
      layoutId={layoutId}
      key={`cambio-trigger-${layoutId}`}
      data-cambio-trigger
      layoutCrossfade={false}
      transition={{
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      }}
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 1,
      }}
      whileHover={{
        opacity: 0.8,
        scale: 1.05,
        boxShadow:
          "0 5px 15px 0 rgba(0, 0, 0, 0.08), 0 15px 35px -5px rgba(0, 0, 0, 0.20), 0 0 0 1px var(--color-Generated-Border, rgba(0, 0, 0, 0.06))",
      }}
      whileTap={{
        scale: 0.95,
      }}
      {...props}
    />
  );
});

const MotionPortal = motion.create(Dialog.Portal);
export const Portal = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Dialog.Portal>
>(function Portal(props, _ref) {
  return <MotionPortal keepMounted={true} data-cambio-portal {...props} />;
});

export const MotionBackdrop = motion.create(Dialog.Backdrop);
export const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof MotionBackdrop>
>(function Backdrop(props, ref) {
  const { open, layoutId } = useCambioContext();
  return (
    <MotionBackdrop
      ref={ref}
      key={`cambio-backdrop-${layoutId}`}
      data-cambio-backdrop
      {...props}
      transition={{
        ease: [0.19, 1, 0.22, 1],
        duration: 1,
      }}
      initial={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      animate={{
        opacity: open ? 1 : 0,
        backdropFilter: open ? "blur(10px)" : "blur(0px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
    />
  );
});

export const MotionPopup = motion.create(Dialog.Popup);
export const Popup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof MotionPopup>
>(function Popup({ ...props }, ref) {
  const { open, layoutId } = useCambioContext();

  return (
    <AnimatePresence>
      {open && (
        <MotionPopup
          ref={ref}
          layoutId={layoutId}
          data-cambio-popup
          transformTemplate={(_, generated) => {
            return `translate(-50%, -50%) ${generated}`;
          }}
          layoutCrossfade={false}
          transition={{
            ease: [0.19, 1, 0.22, 1],
            duration: 0.4,
          }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          key={`cambio-popup-${layoutId}`}
          {...props}
        />
      )}
    </AnimatePresence>
  );
});

export const Title = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<typeof Dialog.Title>
>(function Title(props, ref) {
  return <Dialog.Title ref={ref} data-cambio-title {...props} />;
});

export const Description = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithRef<typeof Dialog.Description>
>(function Description(props, ref) {
  return <Dialog.Description ref={ref} data-cambio-description {...props} />;
});

export const Close = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<typeof Dialog.Close>
>(function Close(props, ref) {
  return <Dialog.Close ref={ref} data-cambio-close {...props} />;
});
