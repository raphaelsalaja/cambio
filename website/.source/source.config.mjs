// source.config.ts
import {
  rehypeCode,
  rehypeCodeDefaultOptions
} from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkInstall],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [...rehypeCodeDefaultOptions.transformers ?? []]
    },
    rehypePlugins: [rehypeCode]
  }
});
export {
  source_config_default as default,
  docs
};
