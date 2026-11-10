import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Atribute node", () => {
  it("Element.getAttributeNode", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=foo data-test=value>some content</div>
      `,
      "text/html",
    );

    const div = doc.querySelector("div")!;
    const classAttrElementGetter = div.getAttributeNode("class");
    const classAttrNamedNodeMap = div.attributes.getNamedItem("class");
    const classAttrNamedNodeMapIndex = div.attributes[0];

    expect(classAttrElementGetter?.name).toBe("class");
    expect(classAttrElementGetter?.value).toBe("foo");
    expect(classAttrElementGetter).toBe(classAttrNamedNodeMap);
    expect(classAttrElementGetter).toBe(classAttrNamedNodeMapIndex);

    div.removeAttribute("class");
    const classAttrNull = div.getAttributeNode("class");

    expect(classAttrNull).toBeNull();

    const dataClassAttrElementGetter = div.getAttributeNode("data-test");
    const dataClassAttrNamedNodeMap = div.attributes.getNamedItem("data-test");

    expect(dataClassAttrElementGetter?.name).toBe("data-test");
    expect(dataClassAttrElementGetter?.value).toBe("value");

    expect(dataClassAttrElementGetter).toBe(dataClassAttrNamedNodeMap);

    const dataClassAttrNamedNodeMapIndex = div.attributes[0];

    expect(dataClassAttrElementGetter).toBe(dataClassAttrNamedNodeMapIndex);
  });

  it("Element.setAttributeNode", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=foo data-test=foo-value>some content</div>
        <div class=bar data-test=bar-value>other content</div>
      `,
      "text/html",
    );

    const divFoo = doc.querySelector(".foo")!;
    const divBar = doc.querySelector(".bar")!;
    const barAttr = divBar.getAttributeNode("class");

    const existingFooClassAttr = divFoo.getAttributeNode("class")!;
    const clonedFooClassAttr = existingFooClassAttr.cloneNode();
    const oldClassAttr = divBar.setAttributeNode(clonedFooClassAttr);

    expect(barAttr).toBe(oldClassAttr);
    expect(divBar.className).toBe("foo");

    divBar.removeAttribute("data-test");

    const clonedFooDataAttr = divFoo.getAttributeNode("data-test")!.cloneNode();
    const oldDataAttr = divBar.setAttributeNode(clonedFooDataAttr);

    expect(oldDataAttr).toBeNull();

    expect(() => {
      divBar.setAttributeNode(existingFooClassAttr);
    }).toThrow();
  });
});
