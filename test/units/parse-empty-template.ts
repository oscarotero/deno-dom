import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

Deno.test("parse empty template", () => {
  const doc = new DOMParser().parseFromString("<body><template></template></body>", "text/html");
  const template = doc.body.children[0];
  assertStrictEquals(template?.tagName, "TEMPLATE");
});
