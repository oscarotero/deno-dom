import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Element id", () => {
  it("Element.id", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=parent />
      `,
      "text/html",
    );

    const parent = doc.querySelector("#parent");

    if (!parent) throw new Error("Expected parent");

    expect(parent.children.length).toBe(0);
    expect(parent.id).toBe("parent");
    expect(parent.getAttribute("id")).toBe("parent");

    let nextId = `parent${Math.random()}`;

    parent.id = nextId;

    expect(parent.id).toBe(nextId);
    expect(parent.getAttribute("id")).toBe(nextId);

    nextId = `parent${Math.random()}`;

    parent.setAttribute("id", nextId);

    expect(parent.id).toBe(nextId);
    expect(parent.getAttribute("id")).toBe(nextId);
  });
});
