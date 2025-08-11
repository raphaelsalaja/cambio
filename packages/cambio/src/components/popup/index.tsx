"use client";

import { AnimatePresence } from "motion/react";
import React, { useMemo } from "react";
import { useCambioContext } from "../../context";
import { MotionDialog } from "../../motion";
import type { CambioPopupProps, MotionDraggableProps } from "../../types";

export const Popup = React.forwardRef<HTMLDivElement, CambioPopupProps>(
  function Popup({ dismissable, ...props }, ref) {
    const { layoutId, open, onOpenChange, motionConfig } = useCambioContext();

    const dragging: MotionDraggableProps = useMemo(() => {
      if (!dismissable) return {};

      const { threshold = 50, velocity = 350 } =
        typeof dismissable === "object" ? dismissable : {};

      return {
        drag: true,
        dragElastic: 0.08, // Very low elastic for Apple-like resistance
        dragMomentum: false, // Disable momentum for precise control
        dragSnapToOrigin: true,
        dragTransition: { 
          power: 0.25, // Lower power for gentler deceleration
          timeConstant: 180, // Faster snap back
        },
        // Constrain drag distance for Apple-like behavior
        dragConstraints: {
          top: -100,
          bottom: 100,
          left: -100,
          right: 100,
        },
        whileDrag: {
          scale: 0.97, // Subtle scale down like iOS
          opacity: 0.94, // Slight transparency
          filter: "blur(0.3px)", // Very subtle blur for depth
          cursor: "grabbing", // Change cursor during drag
          transition: { duration: 0.1 }, // Quick transition to drag state
        },
        onDrag: (_e, info) => {
          // Apply Apple-style resistance using natural logarithmic curve
          const distance = Math.hypot(info.offset.x, info.offset.y);
          const resistance = Math.max(0.15, 1 - Math.log(distance / 30 + 1) / 3);
          
          // Scale the element with resistance for visual feedback
          const scale = 0.97 - (distance / 1000) * 0.03; // Subtle scale reduction
          const element = _e.target as HTMLElement;
          element.style.transform = 
            `translate(-50%, -50%) translate(${info.offset.x * resistance}px, ${info.offset.y * resistance}px) scale(${Math.max(scale, 0.92)})`;
        },
        onDragEnd: (_e, info) => {
          // Reset element transform
          const element = _e.target as HTMLElement;
          element.style.transform = `translate(-50%, -50%)`;
          
          const dist = Math.hypot(info.offset.x, info.offset.y);
          const speed = Math.hypot(info.velocity.x, info.velocity.y);
          
          // Apple-style dismissal logic
          const isQuickFlick = speed > velocity; // Prioritize velocity
          const isDraggedFar = dist > threshold && speed > velocity * 0.25; // Distance with minimum velocity
          
          if ((isQuickFlick || isDraggedFar) && onOpenChange) {
            onOpenChange(false);
          }
        },
      };
    }, [dismissable, onOpenChange]);

    const { transition = motionConfig.transition } = props;

    return (
      <AnimatePresence>
        {open && (
          <MotionDialog.Popup
            {...props}
            {...dragging}
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
              touchAction: dismissable ? "none" : "auto",
              // Apple-like styling for better interaction feel
              cursor: dismissable ? "grab" : "default",
              userSelect: "none",
              WebkitUserSelect: "none",
              ...props.style,
            }}
          />
        )}
      </AnimatePresence>
    );
  },
);

Popup.displayName = "Cambio.Popup";
