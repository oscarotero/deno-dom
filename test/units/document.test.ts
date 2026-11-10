import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Document", () => {
  it("Document.title sets title element value", () => {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><title>foo</title></head><body></body></html>`,
      "text/html",
    );
    expect(doc.title).toBe("foo");
    doc.title = "bar";
    expect(doc.title).toBe("bar");
    expect(doc.querySelector("title")?.textContent).toBe("bar");
  });

  it("Document.title adds missing title element", () => {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head></head><body></body></html>`,
      "text/html",
    );
    expect(doc.title).toBe("");
    doc.title = "foo";
    expect(doc.title).toBe("foo");
    expect(doc.querySelector("title")?.textContent).toBe("foo");
  });

  it("Document.title does not add title missing head element", () => {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head></head><body></body></html>`,
      "text/html",
    );
    doc.head?.remove();
    expect(doc.title).toBe("");
    doc.title = "foo";
    expect(doc.title).toBe("");
    expect(doc.querySelector("title")).toBeNull();
  });
});
