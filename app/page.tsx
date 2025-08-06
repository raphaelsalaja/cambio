import { getHomePage } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

export default async function Page() {
  const page = getHomePage();

  if (!page) {
    return <div>Not found</div>;
  }

  const { title, description } = page.data;

  const MDX = page.data.body;

  return (
    <div>
      <article>
        <header>
          <h1>{title}</h1>
          <h2>{description}</h2>
        </header>
        <MDX components={getMDXComponents()} />
      </article>
    </div>
  );
}
