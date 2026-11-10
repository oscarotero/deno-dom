import { describe, it, expect } from "vitest";
import { DOMParser, Node } from "../../mod.ts";

describe("Remove child", () => {
  it("Node.removeChild", () => {
    const doc = new DOMParser().parseFromString(
      `<div class=parent><div class=child></div></div>`,
      "text/html",
    );
    const parent = doc.querySelector(".parent")!;
    const child = doc.querySelector(".child")!;

    const removedChild = parent.removeChild(child);
    expect(child.parentNode).toBeNull();
    expect(removedChild).toBe(child);
    expect(parent.outerHTML).toBe(`<div class="parent"></div>`);
  });

  it("Node.removeChild throws", () => {
    const doc = new DOMParser().parseFromString(
      `<div class=parent><div class=child></div></div>`,
      "text/html",
    );
    const parent = doc.querySelector(".parent")!;
    const child = doc.querySelector(".child")!;
    parent.removeChild(child);

    expect(() => {
      parent.removeChild(child);
    }).toThrow(DOMException);
    expect(() => {
      parent.removeChild(null as any as Node);
    }).toThrow(TypeError);
  });
});
