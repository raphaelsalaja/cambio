// source.config.ts
import { defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
      publishedAt: z.string().optional(),
      index: z.boolean().default(false),
    }),
  },
  meta: {},
});
export { docs };
