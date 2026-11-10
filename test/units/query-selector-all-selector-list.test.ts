import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("query selector all", () => {
  it("querySelectorAll-selector-list", () => {
    const doc = new DOMParser().parseFromString(
      `
      <a></a>
      <link>
    `,
      "text/html",
    );

    const docReverse = new DOMParser().parseFromString(
      `
      <link>
      <a></a>
    `,
      "text/html",
    );

    expect(Array.from(doc.querySelectorAll("a, link"), (n) => n.nodeName)).toStrictEqual([
      "A",
      "LINK",
    ]);

    expect(Array.from(docReverse.querySelectorAll("a, link"), (n) => n.nodeName)).toStrictEqual([
      "LINK",
      "A",
    ]);
  });
});
