import { createContext, useContext } from "react";

import type { CambioProps } from "../types";

export const CambioContext = createContext<CambioProps.Context | null>(null);

export function useCambioContext() {
  const context = useContext(CambioContext);
  if (!context) {
    throw new Error("Cambio components must be used within a Cambio Root");
  }
  return context;
}
