import type {
  MotionNodeDraggableOptions,
  MotionNodeDragHandlers,
  Transition,
} from "motion/react";
import type { MotionDialog } from "../motion";

/**
 * Predefined motion presets that define the animation behavior and timing.
 *
 * - `snappy`: Fast, immediate animations (~200ms) for responsive interactions
 * - `smooth`: Balanced animations (~400ms) for general use cases
 * - `bouncy`: Spring-based animations with elastic bounce effects
 * - `reduced`: Minimal animations for accessibility compliance (respects prefers-reduced-motion)
 */
export type MotionPreset = "snappy" | "smooth" | "bouncy" | "reduced";

/**
 * Advanced configuration for motion animations and drag interactions.
 *
 * @property transition - Motion transition configuration from Framer Motion
 * @property drag - Optional drag physics configuration
 * @property drag.stiffness - Spring stiffness for drag interactions (higher = snappier)
 * @property drag.damping - Drag damping factor (higher = less oscillation)
 * @property drag.restDelta - Distance threshold for animation completion
 */
export interface MotionConfig {
  transition: Transition;
  drag?: {
    stiffness: number;
    damping: number;
    restDelta: number;
  };
}

/**
 * Fine-grained motion control allowing different presets for individual dialog components.
 *
 * Use this when you need different animation behaviors for different parts of the dialog.
 * For example, a snappy trigger with a smooth popup and reduced backdrop.
 *
 * @property trigger - Motion preset for the trigger button
 * @property popup - Motion preset for the dialog content
 * @property backdrop - Motion preset for the overlay backdrop
 */
export interface MotionVariants {
  trigger?: MotionPreset;
  popup?: MotionPreset;
  backdrop?: MotionPreset;
}

/**
 * Union type for motion configuration - either a single preset for all components
 * or individual variants for granular control.
 */
export type MotionConfigValue = MotionPreset | MotionVariants;

/**
 * Configuration for dismissible dialog behavior via drag gestures.
 *
 * @property threshold - Distance threshold (0-1) before dismissing the dialog
 * @property velocity - Velocity threshold for quick dismissal gestures
 */
export interface DismissableConfig {
  threshold?: number;
  velocity?: number;
}

/**
 * Dismissible dialog configuration - either a boolean toggle or detailed config object.
 */
export type DismissableValue = boolean | DismissableConfig;

/**
 * Internal context state passed down through the Cambio component tree.
 *
 * This interface is used internally by the library and is not meant to be used directly
 * by consumers. It contains the resolved configuration and state that gets shared
 * between all dialog components.
 *
 * @internal
 */
export interface CambioContextProps {
  open: boolean;
  layoutId: string;
  onOpenChange?: (open: boolean) => void;
  reduceMotion: boolean;
  motion: MotionPreset;
  motionConfig: MotionConfig;
  motionVariants?: MotionVariants;
  dismissible?: DismissableValue;
}

/**
 * Props for the root dialog component that wraps all other dialog elements.
 *
 * The root component manages the dialog's open state, animations, and accessibility features.
 * It provides context to all child components and handles the overall dialog behavior.
 *
 * @extends Motion and Base UI Dialog Root
 * @see https://base-ui.com/react/components/dialog#root - Base UI Dialog Root documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioRootProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof MotionDialog.Root>,
    "dismissible"
  > {
  /** Unique layout ID for shared element transitions between dialogs */
  layoutId?: string;
  /** Callback fired when the dialog open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether to reduce motion for accessibility (overrides user preference) */
  reduceMotion?: boolean;
  /** Motion configuration - preset string or detailed variants object */
  motion?: MotionConfigValue;
  /** Dismissible behavior configuration via drag gestures */
  dismissible?: DismissableValue;
}

/**
 * Props for the dialog trigger button that opens the dialog.
 *
 * The trigger is typically a button that users click to open the dialog.
 * It automatically handles accessibility attributes and focus management.
 *
 * @extends Motion and Base UI Dialog Trigger
 * @see https://base-ui.com/react/components/dialog#trigger - Base UI Dialog Trigger documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 *
 */
export interface CambioTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Trigger> {
  /** Motion preset override for this specific trigger */
  motion?: MotionPreset;
  /** Custom transition configuration for advanced animations */
  transition?: Transition;
}

/**
 * Props for the dialog portal that renders dialog content outside the normal DOM tree.
 *
 * The portal ensures the dialog appears above other content and is not clipped by
 * parent containers with overflow hidden. Usually renders to document.body by default.
 *
 * @extends Motion and Base UI Dialog Portal
 * @see https://base-ui.com/react/components/dialog#portal - Base UI Dialog Portal documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioPortalProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Portal> {}

/**
 * Props for the dialog backdrop overlay that appears behind the dialog content.
 *
 * The backdrop typically darkens the background content and can be clicked to close
 * the dialog. It helps focus user attention on the dialog content.
 *
 * @extends Motion and Base UI Dialog Backdrop
 * @see https://base-ui.com/react/components/dialog#backdrop - Base UI Dialog Backdrop documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioBackdropProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Backdrop> {
  /** Motion preset override for backdrop animations */
  motion?: MotionPreset;
}

/**
 * Props for the main dialog popup content container.
 *
 * The popup contains the actual dialog content like title, description, form fields,
 * and action buttons. It's the main interactive area of the dialog.
 *
 * @extends Motion and Base UI Dialog Popup
 * @see https://base-ui.com/react/components/dialog#popup - Base UI Dialog Popup documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioPopupProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Popup> {
  /** Motion preset override for popup animations */
  motion?: MotionPreset;
}

/**
 * Props for the dialog title element.
 *
 * The title provides an accessible name for the dialog and is announced by screen readers.
 * It should clearly describe the purpose or content of the dialog.
 *
 * @extends Motion and Base UI Dialog Title
 * @see https://base-ui.com/react/components/dialog#title - Base UI Dialog Title documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioTitleProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Title> {}

/**
 * Props for the dialog description element.
 *
 * The description provides additional context about the dialog content and is
 * associated with the dialog for screen readers via aria-describedby.
 *
 * @extends Motion and Base UI Dialog Description
 * @see https://base-ui.com/react/components/dialog#description - Base UI Dialog Description documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Description> {}

/**
 * Props for the dialog close button that dismisses the dialog.
 *
 * The close button provides an explicit way to dismiss the dialog and automatically
 * handles accessibility attributes and focus management.
 *
 * @extends Motion and Base UI Dialog Close
 * @see https://base-ui.com/react/components/dialog#close - Base UI Dialog Close documentation
 * @see https://motion.dev/docs/react-motion-component - Motion component documentation
 */
export interface CambioCloseProps
  extends React.ComponentPropsWithoutRef<typeof MotionDialog.Close> {}

/**
 * Props for components that support drag interactions and gestures.
 *
 * Provides comprehensive drag event handlers and configuration options for creating
 * draggable UI elements with motion physics and constraints.
 *
 * @extends Motion drag handlers and draggable options
 * @see https://motion.dev/docs/react-gestures-drag - Motion drag gestures documentation
 */
export interface MotionDraggableProps
  extends MotionNodeDragHandlers,
    MotionNodeDraggableOptions {}
