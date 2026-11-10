import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Element matches", () => {
  it("Element-matches", () => {
    const doc = new DOMParser().parseFromString(`<html/>`, "text/html");
    const a = doc.createElement("a");

    expect(a.matches("a")).toBeTruthy();
    expect(a.matches("b")).toBeFalsy();
  });
});
