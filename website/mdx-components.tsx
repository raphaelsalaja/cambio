import type { MDXComponents } from "mdx/types";
import { Examples } from "@/components/examples";

export function getMDXComponents(): MDXComponents {
	return {
		...Examples,
	};
}
