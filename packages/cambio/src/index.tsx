"use client";

export { CambioContext, useCambioContext } from "./context";

export type { CambioContextProps } from "./types";

export { getReducedMotionState, useReducedMotion } from "./utils";

import * as Components from "./components";

export const Cambio = {
  Root: Components.Root,
  Trigger: Components.Trigger,
  Portal: Components.Portal,
  Backdrop: Components.Backdrop,
  Popup: Components.Popup,
  Title: Components.Title,
  Description: Components.Description,
  Close: Components.Close,
};
