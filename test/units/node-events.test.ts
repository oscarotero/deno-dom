import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Events", () => {
  it("Node.dispatchEvent", () => {
    const doc = new DOMParser().parseFromString(`<div></div>`, "text/html");
    const div = doc.querySelector("div")!;
    let called = false;
    div.addEventListener("click", () => {
      called = true;
    });
    div.dispatchEvent(new Event("click"));
    expect(called).toBeTruthy();
  });

  it("Node.removeEventListener removes the event listener", () => {
    const doc = new DOMParser().parseFromString(`<div></div>`, "text/html");
    const div = doc.querySelector("div")!;
    let callCount = 0;
    const handler = () => {
      callCount++;
    };
    div.addEventListener("click", handler);
    div.dispatchEvent(new Event("click"));
    expect(callCount).toBe(1);
    div.removeEventListener("click", handler);
    div.dispatchEvent(new Event("click"));
    expect(callCount).toBe(1);
  });
});
