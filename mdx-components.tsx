import type { MDXComponents } from "mdx/types";
import { Examples } from "@/components/examples";
import { Tabs } from "@/components/tabs";

export function getMDXComponents(): MDXComponents {
  return {
    Tabs,
    ...Examples,
  };
}
