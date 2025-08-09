import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
});

export const getHomePage = () => {
  return source.getPage(["documentation"]);
};

export const getHomePageContent = () => {
  return source.getPage(["documentation"])?.data.content || "";
};

export type Page = ReturnType<typeof source.getPages>[number];
