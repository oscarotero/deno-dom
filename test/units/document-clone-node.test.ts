import { describe, it, expect } from "vitest";
import { Document, DOMParser } from "../../mod.ts";

describe("Document clone", () => {
  it("Document.cloneNode has non-null .body & .head when they exist", () => {
    const doc = new DOMParser().parseFromString(`<div></div>`, "text/html");
    const docClone = doc.cloneNode(true);

    expect(docClone.body?.localName).toBe("body");
    expect(docClone.head?.localName).toBe("head");

    const emptyDoc = new Document();
    const emptyDocClone = emptyDoc.cloneNode(true);

    expect(emptyDocClone.body).toBe(null);
    expect(emptyDocClone.head).toBe(null);
  });
});
