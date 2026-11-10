import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

Deno.test("Noscript has a DOM tree", () => {
  const doc = new DOMParser().parseFromString(
    // `<body>` required otherwise `<noscript>`
    // is assumed in `<head>` by the parser
    `<body><noscript><div></div></noscript></body>`,
    "text/html",
  );
  const noscript = doc.querySelector("noscript")!;
  assertEquals(noscript.children[0]?.tagName, "DIV");
});
