import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Node normalize", () => {
  it("Normalize", () => {
    const dom = new DOMParser().parseFromString("", "text/html");
    const wrapper = dom.createElement("div");
    wrapper.appendChild(dom.createTextNode(""));
    wrapper.appendChild(dom.createTextNode("Part 1 "));
    wrapper.appendChild(dom.createTextNode("Part 2 "));

    let node = wrapper.firstChild;
    let result = "";
    while (node) {
      result += `${node.nodeName}: "${node.nodeValue}"`;
      node = node.nextSibling;
    }
    expect(result).toBe(`#text: ""#text: "Part 1 "#text: "Part 2 "`);

    wrapper.normalize();

    node = wrapper.firstChild;
    result = "";
    while (node) {
      result += `${node.nodeName}: "${node.nodeValue}"`;
      node = node.nextSibling;
    }
    expect(result).toBe(`#text: "#textPart 2 "`);
  });
});
