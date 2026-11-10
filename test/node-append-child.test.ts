import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Append child", () => {
  it("Node.appendChild", () => {
    const doc = new DOMParser().parseFromString(`<div class=parent></div>`, "text/html");
    const parent = doc.querySelector(".parent")!;
    const child = doc.createElement("div");

    parent.appendChild(child);

    expect(child.parentNode).toBe(parent);
    expect(parent.outerHTML).toBe(`<div class="parent"><div></div></div>`);
  });

  it("Node.appendChild throws", () => {
    const doc = new DOMParser().parseFromString(
      `<div class=parent><div class=child></div></div>`,
      "text/html",
    );
    const parent = doc.querySelector(".parent")!;
    const child = doc.querySelector(".child")!;

    expect(() => {
      child.appendChild(parent);
    }).toThrow(DOMException);
  });

  it("Node.appendChild throws with new parent & grandchild", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=parent>
          <div class=child>
            <div class=grandchild></div>
          </div>
        </div>
        <div class=newparent></div>
      `,
      "text/html",
    );
    const newParent = doc.querySelector(".newparent")!;
    const child = doc.querySelector(".child")!;
    const grandChild = doc.querySelector(".grandchild")!;

    // Change parents
    newParent.appendChild(child);

    expect(() => {
      child.appendChild(newParent);
    }).toThrow(DOMException);

    expect(() => {
      grandChild.appendChild(newParent);
    }).toThrow(DOMException);
  });
});
