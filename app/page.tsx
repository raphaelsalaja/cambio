import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page() {
  const page = source.getPage(["cambio"]);

  if (!page) {
    return <div>Not found</div>;
  }

  const { title, description, publishedAt } = page.data;

  const MDX = page.data.body;

  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {publishedAt && <time>{publishedAt}</time>}
      <article>
        <MDX components={getMDXComponents()} />
      </article>
    </div>
  );
}
