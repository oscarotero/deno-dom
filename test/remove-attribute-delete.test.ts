import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Remove attribute", () => {
  it("removeAttribute attributes don't show in HTML", () => {
    const doc = new DOMParser().parseFromString("<div><br foo></div>", "text/html");
    const br = doc.querySelector("br")!;
    br.removeAttribute("foo");

    expect(br.parentElement!.outerHTML).toBe("<div><br></div>");
  });

  it("removeAttribute attributes are null", () => {
    const doc = new DOMParser().parseFromString("<div><br foo></div>", "text/html");
    const br = doc.querySelector("br")!;
    br.removeAttribute("foo");

    expect(br.attributes.length).toBe(0);
    expect(br.attributes.getNamedItem("foo")).toBeNull();
  });
});
