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

export interface CambioContextProps {
  open: boolean;
  layoutId: string;
  onOpenChange?: (open: boolean) => void;
  reduceMotion: boolean;
  motion: MotionPreset | MotionConfig;
  motionConfig: MotionConfig;
}

export interface CambioRootProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Root> {
  layoutId?: string;
  onOpenChange?: (open: boolean) => void;
  reduceMotion?: boolean;
  motion?: MotionPreset | MotionConfig;
}

export interface CambioTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Trigger> {}

export interface CambioPortalProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Portal> {}

export interface CambioBackdropProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Backdrop> {}

export interface CambioPopupProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Popup> {
  dismissable?:
    | boolean
    | {
        threshold?: number;
        velocity?: number;
      };
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
