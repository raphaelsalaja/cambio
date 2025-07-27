import type { Transition } from "motion/react";

export interface HeadingLink {
  id: string;
  title: string;
  tagName: string;
}

export interface OutlinePropsWithHeadings {
  headingLinks: HeadingLink[];
  contentIsActive: (id: string) => boolean;
  contentRef?: never;
  children?: never;
}

export interface OutlinePropsWithChildren {
  children: React.ReactNode;
  headingLinks?: never;
  contentIsActive?: never;
  contentRef?: React.RefObject<HTMLDivElement>;
}

export type OutlineProps = OutlinePropsWithHeadings | OutlinePropsWithChildren;

export type MotionTransition = Transition<any>;
