import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Element, HTMLCollection, NodeList, nodesFromString } from "../../mod.ts";

const basicHtml = readFileSync(fileURLToPath(import.meta.resolve("./basic.html")), "utf-8");

describe("Instances", () => {
  it("Array instanceof Array", () => {
    expect([]).toBeInstanceOf(Array);
    expect(Array.isArray([])).toBeTruthy();
  });

  it("NodeList not instanceof Array", () => {
    const nodes = nodesFromString(basicHtml);
    expect(nodes).not.toBeInstanceOf(Array);
    expect(Array.isArray(nodes)).toBeFalsy();
  });

  it("HTMLCollection not instanceof Array", () => {
    const nodes = nodesFromString(basicHtml);
    expect((nodes as Element).children).not.toBeInstanceOf(Array);
    expect(Array.isArray((nodes as Element).children)).toBeFalsy();
  });

  it("Nullish not instanceof NodeList", () => {
    expect(null).not.toBeInstanceOf(NodeList);
    expect(undefined).not.toBeInstanceOf(NodeList);
  });

  it("Nullish not instanceof HTMLCollection", () => {
    expect(null).not.toBeInstanceOf(HTMLCollection);
    expect(undefined).not.toBeInstanceOf(HTMLCollection);
  });

  it("Subclass instanceof Array", () => {
    class Foo extends Array {}
    expect(new Foo()).toBeInstanceOf(Array);
    expect(Array.isArray(new Foo())).toBeTruthy();
  });

  it("Array not instanceof subclass", () => {
    class Foo extends Array {}
    expect([]).not.toBeInstanceOf(Foo);
  });
});
