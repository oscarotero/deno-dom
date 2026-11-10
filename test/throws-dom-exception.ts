import { describe, it, expect } from "vitest";
import { DOMParser, HTMLDocument } from "../mod.ts";

describe("Dom exceptions", () => {
  it("Invalid querySelector query throws DOMException", () => {
    const doc = new DOMParser().parseFromString("<div></div>", "text/html");
    try {
      doc.querySelector("div]")!;
    } catch (e) {
      expect(e).toBeInstanceOf(DOMException);
    }
  });

  it("Throws on invalid constructor key", () => {
    expect(() => {
      new (HTMLDocument as any)(undefined);
    }).toThrow(TypeError);
    expect(() => {
      new (HTMLDocument as any)({});
    }).toThrow(TypeError);
  });
});
