import fs from "fs";
import path from "path";

interface SyncResults {
  [key: string]: "success" | "error";
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

function transformContent(content: string): string {
  let transformed = content.replace(/^---[\s\S]*?---\n*/, "# Cambio\n\n");
  transformed = transformed.replace(/<center>\s*[\s\S]*?\s*<\/center>\n*/g, "");
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
      } catch (error) {
        results[displayName] = "error";
        console.error(
          `Error writing ${displayName}:`,
          (error as Error).message,
        );
      }
    });

    formatTreeOutput(results);
  } catch (error) {
    console.error("❌ Error syncing documentation:", (error as Error).message);
    process.exit(1);
  }
}

syncDocumentation();
