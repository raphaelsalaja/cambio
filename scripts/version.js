#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packagePath = path.join(__dirname, "../packages/cambio/package.json");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

const currentVersion = pkg.version;
const versionParts = currentVersion.split(".").map(Number);

const [major, minor, patch] = versionParts;

console.log(`Current version: ${currentVersion}`);
console.log("\nAvailable version bumps:");
console.log(`  patch: ${major}.${minor}.${patch + 1}`);
console.log(`  minor: ${major}.${minor + 1}.0`);
console.log(`  major: ${major + 1}.0.0`);

const type = process.argv[2];

if (!type) {
  console.log("\nUsage: node scripts/version.js [patch|minor|major]");
  process.exit(0);
}

let newVersion;
switch (type) {
  case "patch":
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
  case "minor":
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case "major":
    newVersion = `${major + 1}.0.0`;
    break;
  default:
    console.error("Invalid version type. Use: patch, minor, or major");
    process.exit(1);
}

pkg.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`\n✅ Version updated to ${newVersion}`);
console.log(`\nNext steps:`);
console.log(`  1. git add -A`);
console.log(`  2. git commit -m "chore: bump version to v${newVersion}"`);
console.log(`  3. git push`);
console.log(`  4. pnpm publish`);
console.log(`\nOr publish immediately:`);
console.log(`  pnpm publish`);
