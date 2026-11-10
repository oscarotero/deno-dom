import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Collections to string", () => {
  it("collections-toString", () => {
    const doc = new DOMParser().parseFromString(`<div></div>`, "text/html");
    const div = doc.querySelector("div")!;
    expect(div.childNodes.toString()).toBe("[object NodeList]");
    expect(div.children.toString()).toBe("[object HTMLCollection]");
  });
});
