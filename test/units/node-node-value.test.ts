import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Node value", () => {
  it("Setting Node.nodeValue is ignored", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div></div>
      `,
      "text/html",
    );

    const div = doc.querySelector("div")!;

    div.nodeValue = "";
    doc.nodeValue = "";

    expect(div.nodeValue).toBeNull();
    expect(doc.nodeValue).toBeNull();
  });
});
