import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Last element child", () => {
  it("Element.lastElementChild", () => {
    const doc = new DOMParser().parseFromString(
      `<div>Hello<p>Wonderful</p>and<h1>Amazing</h1>World</div>`,
      "text/html",
    );

    const parent = doc.querySelector("div")!;

    expect(parent.lastElementChild!.tagName).toBe("H1");
    expect(parent.lastElementChild!.textContent).toBe("Amazing");
  });
});
