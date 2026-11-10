import { describe, it, expect } from "vitest";
import { Comment, DOMParser, Node } from "../mod.ts";

describe("element append", () => {
  it("Element.append", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=parent>
          <div id=childA></div>
          <!-- some comment -->
          <div id=childB><img><span></span><b></b></div>
        </div>
      `,
      "text/html",
    );

    const parent = doc.querySelector("#parent")!;
    const childB = doc.querySelector("#childB")!;

    expect(parent.childNodes.length).toBe(7);
    expect(parent.children.length).toBe(2);

    parent.append(new Comment(), doc.createElement("img"), "beef");

    expect(parent.lastChild?.nodeValue, "beef");
    expect(parent.lastChild?.nodeType).toBe(Node.TEXT_NODE);
    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);

    parent.append(childB);

    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);
    expect(childB.parentNode).toBe(parent);

    parent.append();

    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);

    const otherChildren = (["foo"] as (Node | string)[])
      .concat(Array.from(parent.childNodes))
      .filter((node) => node !== childB);

    childB.append(...otherChildren);

    expect(parent.childNodes.length).toBe(1);
    expect(parent.children.length).toBe(1);
    expect(childB.childNodes.length).toBe(13);
    expect(childB.children.length).toBe(5);
  });
});
