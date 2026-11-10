import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { Comment, Document, DocumentType, DOMParser, Element, Node } from "../../mod.ts";

describe("Comments outside HTML", () => {
  it("Comment before <html>", async () => {
    const src = readFileSync(
      fileURLToPath(import.meta.resolve("./comments-outside-html.html")),
      "utf-8",
    );
    const document = new DOMParser().parseFromString(src, "text/html");

    expect(document).toBeInstanceOf(Document);
    expect(document.childNodes.length).toBe(5);
    expect(document.childNodes[0]).toBeInstanceOf(Comment);
    expect((document.childNodes[0] as Comment).data).toBe(
      " A popular English-language nursery rhyme. ",
    );
    expect(document.childNodes[1]).toBeInstanceOf(DocumentType);
    expect(document.childNodes[2]).toBeInstanceOf(Comment);
    expect((document.childNodes[2] as Comment).data).toBe(" TODO: Bells and whistles ");
    expect(document.childNodes[3]).toBeInstanceOf(Element);
    expect(document.documentElement as Node | null).toBe(document.childNodes[3]);
    expect(document.childNodes[4]).toBeInstanceOf(Comment);
    expect((document.childNodes[4] as Comment).data).toBe(" Copyright: public domain ");
  });
});
