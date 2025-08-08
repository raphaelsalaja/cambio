import type { MDXComponents } from "mdx/types";
import { Basic, Dismissable } from "@/components/examples";

export function getMDXComponents(): MDXComponents {
  return {
    Basic,
    Dismissable,
  };
}
