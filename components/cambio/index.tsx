"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion } from "motion/react";
import * as React from "react";

export function Root({
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Root>) {
  return <Dialog.Root data-cambio-root {...props} />;
}

export const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<typeof Dialog.Trigger>
>(function Trigger(props, ref) {
  return <Dialog.Trigger ref={ref} data-cambio-trigger {...props} />;
});

export const Portal = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Dialog.Portal>
>(function Portal(props, _ref) {
  return <Dialog.Portal data-cambio-portal {...props} />;
});

export const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Dialog.Backdrop>
>(function Backdrop(props, ref) {
  return <Dialog.Backdrop ref={ref} data-cambio-backdrop {...props} />;
});

export const Popup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Dialog.Popup>
>(function Popup(props, ref) {
  return <Dialog.Popup ref={ref} data-cambio-popup {...props} />;
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

export const MotionTrigger = motion.create(Trigger);

export const MotionBackdrop = motion.create(Backdrop);

export const MotionPopup = motion.create(Popup);

export const MotionClose = motion.create(Close);
