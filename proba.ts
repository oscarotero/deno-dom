import { DOMParser } from "./mod.ts";

const code = `
<html>
  <p>Ola</p>
</html>
`;

const parser = new DOMParser();

const dom = parser.parseFromString(code, "text/html");

console.log(dom.documentElement?.querySelector("p")?.innerHTML);
