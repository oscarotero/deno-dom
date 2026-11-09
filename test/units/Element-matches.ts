import { DOMParser } from "../../mod.ts";
import { assert } from "assert";

Deno.test("Element-matches", () => {
  const doc = new DOMParser().parseFromString(`<html/>`, "text/html");
  const a = doc.createElement("a");

  assert(a.matches("a"));
  assert(!a.matches("b"));
});
