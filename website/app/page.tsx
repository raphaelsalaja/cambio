import { Menu } from "@/components/menu";
import { getHomePage, getHomePageContent } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

export default function Page() {
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
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1>{title}</h1>
            </div>
            <Menu content={getHomePageContent()} />
          </div>
        </header>
        <MDX components={getMDXComponents()} />
      </article>
    </div>
  );
}
