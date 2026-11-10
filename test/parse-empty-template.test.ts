import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Empty template", () => {
  it("parse empty template", () => {
    const doc = new DOMParser().parseFromString("<body><template></template></body>", "text/html");
    const template = doc.body?.children[0];
    expect(template?.tagName).toBe("TEMPLATE");
  });
});
