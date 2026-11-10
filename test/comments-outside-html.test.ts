import { describe, it, expect } from "vitest";
import { Comment, Document, DocumentType, DOMParser, Element, Node } from "../mod.ts";

const src = `<!-- A popular English-language nursery rhyme. -->
<!doctype html>
<!-- TODO: Bells and whistles -->
<html class="dark">
  <head>
    <title class="knives">Mary had a little lamb</title>
  </head>
  <body>
    <h1>His fleece as white as snow</h1>
    And wherever <b id="b">Mary</b> went
    <a href="./lost-sheep" class="forks and knives">He was sure to go</a>
    <a class="forks and knives">He was <span>sure</span> to <span>go</span></a>
    <a>He was sure to go</a>
  </body>
</html>
<!-- Copyright: public domain -->
`;

describe("Comments outside HTML", () => {
  it("Comment before <html>", async () => {
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
