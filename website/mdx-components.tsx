import type { MDXComponents } from "mdx/types";
import { Basic, Dismissable, ReducedMotion } from "@/components/examples";

export function getMDXComponents(): MDXComponents {
  return {
    Basic,
    Dismissable,
    ReducedMotion,
  };
}
