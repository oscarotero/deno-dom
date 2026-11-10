import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

Deno.test("Element.lastElementChild", () => {
  const doc = new DOMParser().parseFromString(
    `<div>Hello<p>Wonderful</p>and<h1>Amazing</h1>World</div>`,
    "text/html",
  );

  const parent = doc.querySelector("div")!;

  assertEquals(parent.lastElementChild!.tagName, "H1");
  assertEquals(parent.lastElementChild!.textContent, "Amazing");
});
