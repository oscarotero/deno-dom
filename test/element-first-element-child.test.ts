import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("First element child", () => {
  it("Element.firstElementChild", () => {
    const doc = new DOMParser().parseFromString(
      `<div>Hello<p>Wonderful</p>and<h1>Amazing</h1>World</div>`,
      "text/html",
    );

    const parent = doc.querySelector("div")!;

    expect(parent.firstElementChild!.tagName).toBe("P");
    expect(parent.firstElementChild!.textContent).toBe("Wonderful");
  });
});
