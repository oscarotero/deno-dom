import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Element local name", () => {
  it("Element.localName", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div></div>
        <article></article>
      `,
      "text/html",
    );

    const div = doc.querySelector("div")!;
    const article = doc.querySelector("article")!;

    expect(div.localName).toBe("div");
    expect(article.localName).toBe("article");
  });
});
