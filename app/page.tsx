import { OutlineProvider } from "@/components/outline/provider";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page() {
  const page = source.getPage(["cambio"]);

  if (!page) {
    return <div>Not found</div>;
  }

  const { title, publishedAt } = page.data;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  const MDX = page.data.body;

  return (
    <div>
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <OutlineProvider>
          <MDX components={getMDXComponents()} />
        </OutlineProvider>
      </article>
    </div>
  );
}
