import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("comments in outerHTML", () => {
  it("Comments show in outerHTML", () => {
    const doc = new DOMParser().parseFromString("<div><!-- foo --></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(div.outerHTML).toBe("<div><!-- foo --></div>");
  });

  it("Comments show in innerHTML", () => {
    const doc = new DOMParser().parseFromString("<div><!-- foo --></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(div.innerHTML).toBe("<!-- foo -->");
  });

  it("Dynamically inserted comments show in outerHTML", () => {
    const doc = new DOMParser().parseFromString("<div></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(div.outerHTML).toBe("<div></div>");
    div.innerHTML = "foo <!-- bar -->";
    // @ts-ignore
    expect(div.outerHTML).toBe("<div>foo <!-- bar --></div>");
  });
});
