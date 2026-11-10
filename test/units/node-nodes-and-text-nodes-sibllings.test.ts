import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Node siblings", () => {
  it("Element.before with siblings", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const a = doc.querySelector("a")!;
    const b = doc.querySelector("b")!;
    const c = doc.querySelector("c")!;
    b.before(c, a);
    expect(parent.innerHTML).toBe("<c></c><a></a><b></b>");
  });

  it("Element.before with current node", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const b = doc.querySelector("b")!;
    const c = doc.querySelector("c")!;
    b.before(b, c);
    expect(parent.innerHTML).toBe("<a></a><b></b><c></c>");
  });

  it("Element.after with siblings", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const a = doc.querySelector("a")!;
    const b = doc.querySelector("b")!;
    const c = doc.querySelector("c")!;
    b.after(c, a);
    expect(parent.innerHTML).toBe("<b></b><c></c><a></a>");
  });

  it("Element.after with current node", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const b = doc.querySelector("b")!;
    const c = doc.querySelector("c")!;
    b.after(c, b);
    expect(parent.innerHTML).toBe("<a></a><c></c><b></b>");
  });

  it("Element.replaceWith with siblings", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const a = doc.querySelector("a")!;
    const b = doc.querySelector("b")!;
    b.replaceWith(a);
    expect(parent.innerHTML).toBe("<a></a><c></c>");
  });

  it("Element.replaceWith with current node", () => {
    const doc = new DOMParser().parseFromString(
      `<div id="parent"><a></a><b></b><c></c></div>`,
      "text/html",
    );
    const parent = doc.getElementById("parent")!;
    const a = doc.querySelector("a")!;
    const b = doc.querySelector("b")!;
    b.replaceWith(b, a);
    expect(parent.innerHTML).toBe("<b></b><a></a><c></c>");
  });
});
