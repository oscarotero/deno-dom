import { describe, it, expect } from "vitest";
import { Element, HTMLCollection, NodeList, nodesFromString } from "../mod.ts";

const basicHtml = `<!doctype html>
<html class="dark">
  <head>
    <title class="knives">Mary had a little lamb</title>
  </head>
  <body>
    <h1>His fleece as white as snow</h1>
    And wherever <b id="b">Mary</b> went
    <a href="./lost-sheep" class="forks and knives">He was sure to go</a>
    <a class="forks and knives">He was <span>sure</span> to <span>go</span></a>
    <a>He was sure to go</a>
  </body>
</html>
`;

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
