/** biome-ignore-all lint/style/useNodejsImportProtocol: Not necessary for this script */

import fs from "fs";
import path from "path";

interface SyncResults {
  [key: string]: "success" | "error";
}

interface FrontmatterData {
  title?: string;
  [key: string]: string | undefined;
}

const sourceFile = path.join(__dirname, "../website/content/documentation.mdx");
const targetFiles: Record<string, string> = {
  "README.md": path.join(__dirname, "../README.md"),
  "website/public/llms.txt": path.join(__dirname, "../website/public/llms.txt"),
  "packages/cambio/README.md": path.join(
    __dirname,
    "../packages/cambio/README.md",
  ),
};

function extractFrontmatter(content: string): {
  frontmatter: FrontmatterData;
  content: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n*/);
  if (!frontmatterMatch) {
    return { frontmatter: {}, content };
  }

  const frontmatterYaml = frontmatterMatch[1];
  const remainingContent = content.slice(frontmatterMatch[0].length);

  const titleMatch = frontmatterYaml.match(/title:\s*["']?(.*?)["']?\s*$/m);
  const frontmatter: FrontmatterData = {};
  if (titleMatch) {
    frontmatter.title = titleMatch[1];
  }

  return { frontmatter, content: remainingContent };
}

function transformContent(content: string): string {
  const { frontmatter, content: bodyContent } = extractFrontmatter(content);
  const title = frontmatter.title || "Cambio";

  let transformed = `# ${title}\n\n${bodyContent}`;

  transformed = transformed.replace(
    /<center[^>]*>\s*[\s\S]*?\s*<\/center>(\s*\n)*/g,
    "",
  );
  transformed = transformed.replace(/\n{3,}/g, "\n\n");
  return `${transformed.trim()}\n`;
}

function formatTreeOutput(results: SyncResults): void {
  console.log("○ Syncing Documentation");

  const entries = Object.entries(results);
  entries.forEach(([file, status], index) => {
    const isLast = index === entries.length - 1;
    const prefix = isLast ? "└" : "├";
    const statusIcon = status === "success" ? "○" : "✗";
    console.log(`${prefix} ${statusIcon} ${file}`);
  });
}

function syncDocumentation(): void {
  const results: SyncResults = {};
  const updatedFiles: string[] = [];

  try {
    const sourceContent = fs.readFileSync(sourceFile, "utf8");

    const transformedContent = transformContent(sourceContent);

    Object.entries(targetFiles).forEach(([displayName, filePath]) => {
      try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, transformedContent);
        results[displayName] = "success";

        const relativePath = path.relative(
          path.join(__dirname, ".."),
          filePath,
        );
        updatedFiles.push(relativePath);
      } catch (error) {
        results[displayName] = "error";
        console.error(
          `Error writing ${displayName}:`,
          (error as Error).message,
        );
      }
    });

    formatTreeOutput(results);

    if (updatedFiles.length > 0) {
      console.log(updatedFiles.join(" "));
    }
  } catch (error) {
    console.error("❌ Error syncing documentation:", (error as Error).message);
    process.exit(1);
  }
}

syncDocumentation();
