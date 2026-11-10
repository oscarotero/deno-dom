import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Element children sync", () => {
  it("Element.children stays in sync with Node.childNodes", () => {
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
    const childA = doc.querySelector("#childA")!;
    const childB = doc.querySelector("#childB")!;
    const childBSpan = childB.querySelector("span")!;
    const childComment = parent.childNodes[2];

    const children = parent.children;
    const childBChildren = childB.children;

    // Removing comment node shouldn't affect
    // .children
    parent.removeChild(childComment);

    expect(children.length).toBe(2);

    childA.remove();
    expect(children.length).toBe(1);

    expect(childBChildren[1].tagName).toBe("SPAN");

    childBSpan.remove();
    expect(childBChildren[1].tagName).toBe("B");

    parent.innerHTML = "";
    expect(children.length).toBe(0);

    parent.appendChild(doc.createComment());
    expect(children.length).toBe(0);

    parent.appendChild(doc.createElement("p"));
    expect(children[0].tagName).toBe("P");
  });
});
