export interface CambioContextProps {
  open: boolean;
  layoutId: string;
  onOpenChange?: (open: boolean) => void;
}

export interface DragProps {
  dismissable?: boolean;
  dragThreshold?: number;
  dragVelocityThreshold?: number;
  dragDirection?: "x" | "y" | boolean;
  dragElastic?: number;
  onDragStart?: () => void;
  onDrag?: (info: {
    offset: { x: number; y: number };
    velocity: { x: number; y: number };
  }) => void;
  onDragEnd?: (info: {
    offset: { x: number; y: number };
    velocity: { x: number; y: number };
  }) => void;
}
