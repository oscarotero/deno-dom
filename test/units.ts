import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const unitDir = fileURLToPath(import.meta.resolve("./units"));
const units = readdirSync(unitDir, { withFileTypes: true })
  .filter((file) => file.isFile() && file.name.endsWith(".ts"))
  .map((file) => join("units", file.name));

console.log(units);

// // Import all unit files
// for (const file of units) {
//   await import("./" + file);
// }
