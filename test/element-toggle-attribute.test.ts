import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Toogle attributes", () => {
  it("Element.toggleAttribute toggles attribute", () => {
    const doc = new DOMParser().parseFromString(`<input>`, "text/html");

    const input = doc.querySelector("input")!;
    expect(input.hasAttribute("disabled")).toBeFalsy();

    for (const _ of [1, 2]) {
      expect(input.toggleAttribute("disabled", true)).toBeTruthy();
      expect(input.outerHTML).toBe(`<input disabled="">`);
    }

    for (const _ of [1, 2]) {
      expect(input.toggleAttribute("disabled", false)).toBeFalsy();
      expect(input.outerHTML).toBe(`<input>`);
    }

    for (const _ of [1, 2]) {
      input.toggleAttribute("disabled", true);
      expect(input.outerHTML).toBe(`<input disabled="">`);
      input.toggleAttribute("disabled", false);
      expect(input.outerHTML).toBe(`<input>`);
    }
  });

  it("Element.toggleAttribute does not override value when forced", () => {
    const doc = new DOMParser().parseFromString(`<input disabled="disabled">`, "text/html");

    const input = doc.querySelector("input")!;
    input.toggleAttribute("disabled", true);
    expect(input.hasAttribute("disabled")).toBeTruthy();
    expect(input.outerHTML).toBe(`<input disabled="disabled">`);
  });
});
