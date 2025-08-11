"use client";

import {
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useMemo, useState } from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioPopupProps } from "../../types";
import {
  getComponentMotionPreset,
  getMotionConfig,
  resolveDismissableConfig,
} from "../../utils";

const DEFAULT_DRAG_SPRING_CONFIG = {
  stiffness: 400,
  damping: 30,
  restDelta: 0.01,
};

const SCALE_DISTANCE_THRESHOLDS = [0, 50, 100];
const SCALE_OUTPUT_VALUES = [1, 0.98, 0.95];
const POPUP_OPACITY_DISTANCE_RANGE = [0, 80];
const POPUP_OPACITY_OUTPUT_RANGE = [1, 0.96];

const RESISTANCE_DISTANCE_DIVISOR = 20;
const RESISTANCE_LOG_DIVISOR = 4;

export const Popup = React.forwardRef<HTMLDivElement, CambioPopupProps>(
  function Popup({ motion: componentMotion, ...props }, ref) {
    const {
      layoutId,
      open,
      onOpenChange,
      motion: globalMotion,
      motionVariants,
      reduceMotion,
      dismissible: rootDismissable,
    } = useCambioContext();

    const [isDragging, setIsDragging] = useState(false);

    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);

    const resolvedMotion = getComponentMotionPreset(
      "popup",
      componentMotion,
      globalMotion,
      motionVariants,
      reduceMotion,
    );

    const componentMotionConfig = getMotionConfig(resolvedMotion, reduceMotion);

    const dismissableConfig = resolveDismissableConfig(rootDismissable);

    const dragSpringConfig =
      componentMotionConfig.drag || DEFAULT_DRAG_SPRING_CONFIG;

    const springX = useSpring(dragX, dragSpringConfig);
    const springY = useSpring(dragY, dragSpringConfig);

    const distance = useTransform(
      [springX, springY],
      ([x, y]: [number, number]) => Math.hypot(x, y),
    );

    const scale = useTransform(
      distance,
      SCALE_DISTANCE_THRESHOLDS,
      SCALE_OUTPUT_VALUES,
    );
    const opacity = useTransform(
      distance,
      POPUP_OPACITY_DISTANCE_RANGE,
      POPUP_OPACITY_OUTPUT_RANGE,
    );

    const resistance = useTransform(distance, (d) =>
      Math.max(
        0.1,
        1 -
          Math.log(d / RESISTANCE_DISTANCE_DIVISOR + 1) /
            RESISTANCE_LOG_DIVISOR,
      ),
    );

    const dragConfig = useMemo(() => {
      if (!dismissableConfig) return {};

      const { threshold = 60, velocity = 300 } = dismissableConfig;

      return {
        drag: true,
        dragElastic: 0,
        dragMomentum: false,
        dragSnapToOrigin: true,
        onDrag: (
          _e: MouseEvent | TouchEvent | PointerEvent,
          info: {
            offset: { x: number; y: number };
            velocity: { x: number; y: number };
          },
        ) => {
          if (!isDragging) {
            setIsDragging(true);
          }

          const resistanceValue = resistance.get();
          dragX.set(info.offset.x * resistanceValue);
          dragY.set(info.offset.y * resistanceValue);
        },
        onDragEnd: (
          _e: MouseEvent | TouchEvent | PointerEvent,
          info: {
            offset: { x: number; y: number };
            velocity: { x: number; y: number };
          },
        ) => {
          setIsDragging(false);
          const dist = Math.hypot(info.offset.x, info.offset.y);
          const speed = Math.hypot(info.velocity.x, info.velocity.y);

          const shouldDismiss = speed > velocity || dist > threshold;

          if (shouldDismiss && onOpenChange) {
            onOpenChange(false);
          } else {
            dragX.set(0);
            dragY.set(0);
          }
        },
      };
    }, [dismissableConfig, onOpenChange, dragX, dragY, isDragging, resistance]);

    const { transition = componentMotionConfig.transition } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            {...dragConfig}
            ref={ref}
            layoutId={layoutId}
            layoutCrossfade={false}
            layout
            transition={transition}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              touchAction: dismissableConfig ? "none" : "auto",
              cursor: isDragging
                ? "grabbing"
                : dismissableConfig
                  ? "grab"
                  : "default",
              userSelect: "none",
              WebkitUserSelect: "none",
              scale,
              opacity,
              x: springX,
              y: springY,
              ...props.style,
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

Popup.displayName = "Cambio.Popup";
