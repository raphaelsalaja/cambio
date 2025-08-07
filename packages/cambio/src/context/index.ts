import React from "react";
import type { CambioContextProps } from "../types";

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
