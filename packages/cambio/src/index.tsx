"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface CambioContextProps {
  open: boolean;
  layoutId: string;
}

export const CambioContext = React.createContext<CambioContextProps | null>(
  null,
);

export function useCambioContext() {
  const context = React.useContext(CambioContext);
  if (!context) {
    throw new Error("Cambio components must be used within a Cambio Root");
  }
  return context;
}

const MotionBaseRoot = motion.create(Dialog.Root);

const Root = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseRoot>
>(function Root(props, _ref) {
  const {
    children,
    layoutId,
    open,
    onOpenChange,
    defaultOpen = false,
    ...dialogProps
  } = props;

  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen);

  const reactId = React.useId();

  const uniqueLayoutId = React.useMemo(
    () => layoutId || `cambio-dialog-${reactId}`,
    [layoutId, reactId],
  );

  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = React.useCallback(
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
      <MotionBaseRoot
        {...dialogProps}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </MotionBaseRoot>
    </CambioContext.Provider>
  );
});

const MotionBaseTrigger = motion.create(Dialog.Trigger);

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseTrigger>
>(function Trigger(props, ref) {
  const { layoutId } = useCambioContext();

  const {
    transition = {
      type: "spring",
      bounce: 0.2,
      duration: 0.4,
    },
  } = props;

  return (
    <MotionBaseTrigger
      {...props}
      ref={ref}
      layoutId={layoutId}
      layoutCrossfade={false}
      transition={transition}
    />
  );
});

const MotionBasePortal = motion.create(Dialog.Portal);

const Portal = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MotionBasePortal>
>(function Portal(props, _ref) {
  return <MotionBasePortal keepMounted={true} {...props} />;
});

const MotionBaseBackdrop = motion.create(Dialog.Backdrop);

const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseBackdrop>
>(function Backdrop(props, ref) {
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
        <MotionBaseBackdrop
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
});

const MotionBasePopup = motion.create(Dialog.Popup);

const Popup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MotionBasePopup>
>(function Popup({ ...props }, ref) {
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
        <MotionBasePopup
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
});

const MotionBaseTitle = motion.create(Dialog.Title);

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseTitle>
>(function Title(props, ref) {
  return <MotionBaseTitle ref={ref} {...props} />;
});

const MotionBaseDescription = motion.create(Dialog.Description);

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseDescription>
>(function Description(props, ref) {
  return <MotionBaseDescription ref={ref} {...props} />;
});

const MotionBaseClose = motion.create(Dialog.Close);

const Close = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MotionBaseClose>
>(function Close(props, ref) {
  return <MotionBaseClose ref={ref} {...props} />;
});

export const Cambio = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
};
