import { describe, it } from "vitest";
import { Document, Element, HTMLDocument, NodeList } from "../mod.ts";

// oxlint-disable no-unused-expressions
describe("Nodelist", () => {
  it("Using the public API types for NodeList works", () => {
    interface Queryable {
      querySelector(selectors: string): Element | null;
      querySelectorAll(selectors: string): NodeList;
    }

    // Note this test is a type assertion, so there are no actual assertions.
    // Type assertions
    (d: HTMLDocument): Queryable => d;
    (e: Document): Queryable => e;
    (e: Element): Queryable => e;
  });
});
