import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("noscript", () => {
  it("Noscript has a DOM tree", () => {
    const doc = new DOMParser().parseFromString(
      // `<body>` required otherwise `<noscript>`
      // is assumed in `<head>` by the parser
      `<body><noscript><div></div></noscript></body>`,
      "text/html",
    );
    const noscript = doc.querySelector("noscript")!;
    expect(noscript.children[0]?.tagName).toBe("DIV");
  });
});
