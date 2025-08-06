import type { MotionDialog } from "../motion";

export namespace CambioProps {
  export interface Context {
    open: boolean;
    layoutId: string;
  }

  export interface Root
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Root> {}

  export interface Trigger
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Trigger> {}

  export interface Portal
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Portal> {}

  export interface Backdrop
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Backdrop> {}

  export interface Popup
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Popup> {}

  export interface Title
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Title> {}

  export interface Description
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Description> {}

  export interface Close
    extends React.ComponentPropsWithoutRef<typeof MotionDialog.Close> {}
}
