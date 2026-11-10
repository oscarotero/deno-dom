import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

// TODO: More comprehensive tests

Deno.test("Setting Node.nodeValue is ignored", () => {
  const doc = new DOMParser().parseFromString(
    `
      <div></div>
    `,
    "text/html",
  );

  const div = doc.querySelector("div")!;

  div.nodeValue = "";
  doc.nodeValue = "";

  assertEquals(div.nodeValue, null);
  assertEquals(doc.nodeValue, null);
});
