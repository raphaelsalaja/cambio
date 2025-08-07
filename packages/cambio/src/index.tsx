"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface CambioContextProps {
  open: boolean;
  layoutId: string;
  onOpenChange?: (open: boolean) => void;
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
        onOpenChange: handleOpenChange,
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
  React.ComponentPropsWithoutRef<typeof MotionBasePopup> & {
    dismissable?: boolean;
    dragThreshold?: number;
    dragVelocityThreshold?: number;
    dragDirection?: "x" | "y" | boolean;
    dragElastic?: number;
    onDragStart?: () => void;
    onDrag?: (info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }) => void;
    onDragEnd?: (info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }) => void;
  }
>(function Popup({ ...props }, ref) {
  const { layoutId, open, onOpenChange } = useCambioContext();

  const {
    transition = {
      type: "spring",
      bounce: 0.2,
      duration: 0.4,
    },
    dismissable = false,
    dragThreshold = 100,
    dragVelocityThreshold = 500,
    dragDirection = true,
    dragElastic = 0.2,
    onDragStart,
    onDrag,
    onDragEnd: onDragEndProp,
    ...restProps
  } = props;

  const handleDragStart = React.useCallback(() => {
    onDragStart?.();
  }, [onDragStart]);

  const handleDrag = React.useCallback(
    (
      _: unknown,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      },
    ) => {
      onDrag?.(info);
    },
    [onDrag],
  );

  const handleDragEnd = React.useCallback(
    (
      _: unknown,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      },
    ) => {
      // Call custom onDragEnd callback first
      onDragEndProp?.(info);

      // Determine dismiss condition based on drag direction
      let shouldDismiss = false;

      if (dragDirection === "y") {
        shouldDismiss =
          Math.abs(info.offset.y) > (dragThreshold || 100) ||
          Math.abs(info.velocity.y) > (dragVelocityThreshold || 500);
      } else if (dragDirection === "x") {
        shouldDismiss =
          Math.abs(info.offset.x) > (dragThreshold || 100) ||
          Math.abs(info.velocity.x) > (dragVelocityThreshold || 500);
      } else if (dragDirection === true) {
        // Allow dismissal in any direction when drag is true
        shouldDismiss =
          Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2) >
            (dragThreshold || 100) ||
          Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2) >
            (dragVelocityThreshold || 500);
      }

      if (shouldDismiss && onOpenChange) {
        onOpenChange(false);
      }
    },
    [
      onDragEndProp,
      dragDirection,
      dragThreshold,
      dragVelocityThreshold,
      onOpenChange,
    ],
  );

  const dragProps = dismissable
    ? {
        drag: dragDirection || true,
        dragSnapToOrigin: true,
        dragConstraints:
          dragDirection === "y"
            ? { top: 0 }
            : dragDirection === "x"
              ? { left: 0 }
              : {},
        dragElastic: dragElastic || 0.2,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        whileDrag: {
          scale: 0.95,
          transition: { duration: 0.2 },
        },
      }
    : {};

  return (
    <AnimatePresence>
      {open && (
        <MotionBasePopup
          {...dragProps}
          {...restProps}
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
            touchAction: dismissable ? "none" : "auto",
            ...restProps.style,
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
