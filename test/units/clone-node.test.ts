import { describe, it, expect } from "vitest";
import { DOMParser, Element, Node } from "../../mod.ts";

describe("Clone node", () => {
  it("cloneNode", () => {
    const doc = new DOMParser().parseFromString(
      `
        a
        <p>b</p>
        <ul><li>c</li></ul>
        <!-- d -->
        <a id="e">e</a>
      `,
      "text/html",
    );

    checkClone(doc, doc.cloneNode(true));

    function checkClone(node: Node, clone: Node) {
      expect(clone).toBeInstanceOf(Node);
      expect(node).not.toBe(clone);
      if (node instanceof Element) {
        expect((node as Element).outerHTML).toBe((clone as Element).outerHTML);
      } else {
        expect(node.nodeName).toBe(clone.nodeName);
        expect(node.nodeValue).toBe(clone.nodeValue);
      }
      expect(node.childNodes.length).toBe(clone.childNodes.length);
      for (let index = 0; index < node.childNodes.length; index++) {
        checkClone(node.childNodes[index], clone.childNodes[index]);
      }
    }
  });

  it("cloneNode works with uninitialized NamedNodeMap", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=foo id=bar></div>
        <div id=baz class=qux></div>
        <div id=fizz data-foo class=some-class></div>
      `,
      "text/html",
    );

    const div1 = doc.querySelector("#bar")!;
    const div2 = doc.querySelector("#baz")!;
    const div3 = doc.querySelector("#fizz")!;

    expect(div1.getAttributeNames()).toStrictEqual(
      (div1.cloneNode() as Element).getAttributeNames(),
    );
    expect(div2.getAttributeNames()).toStrictEqual(
      (div2.cloneNode() as Element).getAttributeNames(),
    );
    expect(div3.getAttributeNames()).toStrictEqual(
      (div3.cloneNode() as Element).getAttributeNames(),
    );
  });
});
