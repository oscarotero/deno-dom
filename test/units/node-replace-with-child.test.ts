import { describe, it, expect } from "vitest";
import { DOMParser, Element } from "../../mod.ts";

describe("Replace node", () => {
  it("Node.replaceWith(childNode) correctly sets new childNode's parent", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=parent>
          <div id=child>
            <div id=grandchild></div>
          </div>
        </div>
      `,
      "text/html",
    );

    const child = doc.querySelector("#child")!;
    const grandchild = doc.querySelector("#grandchild")!;

    child.replaceWith(grandchild);
    expect((grandchild.parentNode as Element).id).toBe("parent");
  });
});
