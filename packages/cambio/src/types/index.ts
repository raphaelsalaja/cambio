import type {
  MotionNodeDraggableOptions,
  MotionNodeDragHandlers,
  Transition,
} from "motion/react";
import type { MotionDialog } from "../motion";

export type MotionPreset = "snappy" | "smooth" | "bouncy" | "reduced";

export interface MotionConfig {
  transition: Transition;
  drag?: {
    stiffness: number;
    damping: number;
    restDelta: number;
  };
}

export interface MotionVariants {
  trigger?: MotionPreset;
  popup?: MotionPreset;
  backdrop?: MotionPreset;
}

export type MotionConfigValue = MotionPreset | MotionVariants;

export interface DismissableConfig {
  threshold?: number;
  velocity?: number;
}

export type DismissableValue = boolean | DismissableConfig;

export interface CambioContextProps {
  open: boolean;
  layoutId: string;
  onOpenChange?: (open: boolean) => void;
  reduceMotion: boolean;
  motion: MotionPreset;
  motionConfig: MotionConfig;
  motionVariants?: MotionVariants;
  dismissable?: DismissableValue;
}

export interface CambioRootProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Root> {
  layoutId?: string;
  onOpenChange?: (open: boolean) => void;
  reduceMotion?: boolean;
  motion?: MotionConfigValue;
  dismissable?: DismissableValue;
}

export interface CambioTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Trigger> {
  motion?: MotionPreset;
  transition?: Transition;
}

export interface CambioPortalProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Portal> {}

export interface CambioBackdropProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Backdrop> {
  motion?: MotionPreset;
}

export interface CambioPopupProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Popup> {
  motion?: MotionPreset;
}

export interface CambioTitleProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Title> {}

export interface CambioDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Description> {}

export interface CambioCloseProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Close> {}

export interface MotionDraggableProps
  extends MotionNodeDragHandlers,
    MotionNodeDraggableOptions {}
