import { DOMParser } from "../../mod.ts";
import { describe, it, expect } from "vitest";

describe("Case insensitive attributes", () => {
  const doc = new DOMParser().parseFromString(
    `<div FooBar=baz foobar=qux fOObAR="42"></div>`,
    "text/html",
  );
  const div = doc.querySelector("div")!;

  it("Check case insensitive", () => {
    expect(div.getAttribute("foobar")).toBe("baz");
    expect(div.getAttribute("FooBar")).toBe("baz");
    div.setAttribute("fOObAR", "fizz");
    expect(
      div.getAttribute("FooBar")).toBe("fizz",
    );
    expect(
      div.getAttribute("foobar")).toBe("fizz",
    );
  })
});
