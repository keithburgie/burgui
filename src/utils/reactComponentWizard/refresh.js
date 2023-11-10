import { fileURLToPath } from "url";
import * as fs from "fs";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Get componentsDir from a config file

const componentsDir = path.join(__dirname, "..", "..", "components");
const exportFile = path.join(componentsDir, "index.ts");
const dirs = fs.readdirSync(componentsDir).filter((file) => {
  const stat = fs.statSync(path.join(componentsDir, file));
  return stat.isDirectory();
});

const exportStatements = dirs
  .map((dir) => `export * from './${dir}';`)
  .join("\n");

fs.writeFileSync(exportFile, exportStatements);
