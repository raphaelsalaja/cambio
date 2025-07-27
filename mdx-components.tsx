import type { MDXComponents } from "mdx/types";
import { Image } from "@/components/image";

export function getMDXComponents(): MDXComponents {
  return {
    img: (props) => <Image {...props} />,
  };
}
