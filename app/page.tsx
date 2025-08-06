import { getHomePage } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

export default async function Page() {
  const page = getHomePage();

  if (!page) {
    return <div>Not found</div>;
  }

  const { title } = page.data;
  const MDX = page.data.body;

  return (
    <div>
      <article>
        <header>
          <h1>{title}</h1>
        </header>
        <MDX components={getMDXComponents()} />
      </article>
    </div>
  );
}
