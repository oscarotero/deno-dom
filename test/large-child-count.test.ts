import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Large child count", () => {
  it("Deserialize and query large child count", () => {
    const doc = new DOMParser().parseFromString(`<div id="parent"></div>`, "text/html");

    // Arbitrarily large number that causes a stack overflow on
    // my machine. Probably not a good test, but it works for now.
    const length = 0x22222;
    const childHtml = `<div class="foo">bar</div>`;
    const parent = doc.querySelector("#parent")!;
    parent.innerHTML = Array.from({ length }).fill(childHtml).join("");
    const childrenDoc = doc.querySelectorAll(".foo");
    const childrenParent = parent.querySelectorAll(".foo");
    expect(childrenDoc.length).toBe(length);
    expect(childrenParent.length).toBe(length);
  });
});
