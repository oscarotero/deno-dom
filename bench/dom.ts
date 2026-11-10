import { Bench } from "tinybench";
import { DOMParser } from "../mod.ts";
import { parse } from "../api/parser.ts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { nodesFromArray } from "../api/deserialize.ts";

const bench = new Bench();
const code = readFileSync(fileURLToPath(import.meta.resolve("./code.html")), "utf-8");
const parser = new DOMParser();
const parsedCode = JSON.parse(parse(code));

bench.add("Only parse", () => {
  parse(code);
});

bench.add("Only deserialize", () => {
  nodesFromArray(parsedCode);
});

bench.add("Full DOM parse", () => {
  parser.parseFromString(code, "text/html");
});

await bench.run();

console.log(bench.name);
console.table(bench.table());
