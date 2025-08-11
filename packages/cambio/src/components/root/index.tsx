"use client";

// biome-ignore lint/correctness/noUnusedImports: React
import React, { forwardRef, useCallback, useId, useState } from "react";
import { CambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioRootProps } from "../../types";
import {
  getMotionConfig,
  getReducedMotionState,
  parseMotionConfig,
  resolveMotionPreset,
} from "../../utils";

export const Root = forwardRef<HTMLDivElement, CambioRootProps>(
  function Root(props, _ref) {
    const generatedId = useId();

    const {
      open,
      onOpenChange,
      defaultOpen = false,
      layoutId = `cambio-dialog-${generatedId}`,
      reduceMotion,
      motion,
      dismissable,
      ...rest
    } = props;

    const [openState, setOpenState] = useState(defaultOpen);

    const isOpen = open ?? openState;
    const shouldReduceMotion = getReducedMotionState(reduceMotion);

    // Parse motion configuration into preset and variants
    const { preset, variants } = parseMotionConfig(motion);
    const resolvedMotionPreset = resolveMotionPreset(
      preset,
      shouldReduceMotion,
    );
    const motionConfig = getMotionConfig(
      resolvedMotionPreset,
      shouldReduceMotion,
    );

    const handleChange = useCallback(
      (next: boolean, _e?: Event, _reason?: unknown) => {
        if (onOpenChange) {
          onOpenChange(next);
        } else {
          setOpenState(next);
        }
      },
      [onOpenChange],
    );

    return (
      <CambioContext.Provider
        value={{
          layoutId,
          open: isOpen,
          onOpenChange: (next) => handleChange(next),
          reduceMotion: shouldReduceMotion,
          motion: resolvedMotionPreset,
          motionConfig,
          motionVariants: variants,
          dismissable,
        }}
      >
        <MotionDialog.Root
          {...rest}
          open={isOpen}
          onOpenChange={handleChange}
        />
      </CambioContext.Provider>
    );
  },
);

Root.displayName = "Cambio.Root";
