import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema.extend({
      external: z.string().optional(),
      preview: z.string().optional(),
      disabled: z.boolean().optional(),
      timestamp: z.number().optional(),
      desktop: z.boolean().optional(),
      category: z
        .enum([
          "Experiments",
          "Experience",
          "Projects",
          "Animation",
          "Thoughts",
          "Craft",
          "Design",
          "Fashion",
        ])
        .optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkInstall],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? [])],
    },
    rehypePlugins: [rehypeCode],
  },
});

export type Frontmatter = z.infer<typeof docs.docs.schema>;
