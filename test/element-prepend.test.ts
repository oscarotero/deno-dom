import { describe, it, expect } from "vitest";
import { Comment, DOMParser, Element, Node } from "../mod.ts";

describe("Prepend", () => {
  it("Element.prepend", () => {
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

    parent.prepend(new Comment(), doc.createElement("img"), "beef");

    expect(parent.childNodes[2].nodeValue).toBe("beef");
    expect(parent.childNodes[2].nodeType).toBe(Node.TEXT_NODE);
    expect((parent.childNodes[1] as Element).tagName).toBe("IMG");
    expect(parent.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);

    parent.prepend(childB);

    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);
    expect(childB.parentNode).toBe(parent);
    expect(parent.childNodes[0]).toBe(childB);

    parent.prepend();

    expect(parent.childNodes.length).toBe(10);
    expect(parent.children.length).toBe(3);

    const otherChildren = (["foo"] as (Node | string)[])
      .concat(Array.from(parent.childNodes))
      .filter((node) => node !== childB);

    childB.prepend(...otherChildren);

    expect(parent.childNodes.length).toBe(1);
    expect(parent.children.length).toBe(1);
    expect(childB.childNodes.length).toBe(13);
    expect(childB.children.length).toBe(5);
  });
});
