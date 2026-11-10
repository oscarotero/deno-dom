import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

// FIXME: should be HTMLElement but it's not implemented yet
describe("Inner text", () => {
  it("Element#innerText", () => {
    const doc = new DOMParser().parseFromString(`<div>foo <strong>bar</strong></div>`, "text/html");
    const div = doc.querySelector("div")!;

    expect(div.innerText).toBe(div.textContent);
    div.innerHTML = "<em>qux</em> fizz";
    expect(div.innerText).toBe("qux fizz");
    div.innerText = "42 divs";
    expect(div.textContent).toBe("42 divs");
  });
});
