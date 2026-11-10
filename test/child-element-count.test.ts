import { describe, it, expect } from "vitest";
import { Comment, Document } from "../mod.ts";

describe("Child element count", () => {
  it("Element.childElementCount with three children", () => {
    const document = new Document();
    const list = document.createElement("ul");
    for (let i = 0; i < 3; i++) {
      list.appendChild(document.createElement("li"));
    }
    expect(list.childElementCount).toBe(3);
  });

  it("Element.childElementCount with non-node", () => {
    const document = new Document();
    const divider = document.createElement("div");
    divider.appendChild(document.createElement("p"));
    divider.appendChild(new Comment());
    expect(divider.childElementCount).toBe(1);
  });

  it("Document.childElementCount with three children", () => {
    const document = new Document();
    for (let i = 0; i < 3; i++) {
      document.appendChild(document.createElement("ul"));
    }
    expect(document.childElementCount).toBe(3);
  });

  it("Element.childElementCount with non-node", () => {
    const document = new Document();
    document.appendChild(document.createElement("p"));
    document.appendChild(new Comment());
    expect(document.childElementCount).toBe(1);
  });
});
