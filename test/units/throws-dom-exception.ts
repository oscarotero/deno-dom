import { describe, it, expect } from "vitest";
import { DOMParser, HTMLDocument, NodeList } from "../../mod.ts";

Deno.test("Invalid querySelector query throws DOMException", () => {
  const doc = new DOMParser().parseFromString("<div></div>", "text/html");
  try {
    doc.querySelector("div]")!;
  } catch (e) {
    assert(e instanceof DOMException);
  }
});

Deno.test("Throws on invalid constructor key", () => {
  assertThrows(
    () => {
      new (HTMLDocument as any)(undefined);
    },
    TypeError,
    "Illegal constructor.",
  );
  assertThrows(
    () => {
      new (HTMLDocument as any)({});
    },
    TypeError,
    "Illegal constructor.",
  );
});
