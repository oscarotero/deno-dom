import { describe, it, expect } from "vitest";
import { Comment, DOMParser, NodeType, Text } from "../../mod.ts";

describe("Charater data", () => {
  it("CharacterData.nodeValue/data", () => {
    const doc = new DOMParser().parseFromString(`foo<!--bar-->`, "text/html");

    const text = doc.body?.childNodes[0] as Text;
    const comment = doc.body?.childNodes[1] as Comment;

    expect(text.nodeValue).toBe("foo");
    expect(text.nodeValue).toBe(text.data);
    expect(text.nodeValue).toBe(text.textContent);
    expect(comment.data).toBe("bar");
    expect(comment.nodeValue).toBe(comment.data);
    expect(comment.nodeValue).toBe(comment.textContent);

    text.data += " fizz";
    expect(text.nodeValue).toBe("foo fizz");
    expect(text.data).toBe("foo fizz");
    expect(text.textContent).toBe("foo fizz");

    expect(doc.body?.outerHTML).toBe("<body>foo fizz<!--bar--></body>");

    comment.nodeValue = null;
    expect(comment.nodeValue).toBe("");
    expect(comment.data).toBe("");
    expect(comment.textContent).toBe("");
    expect(doc.body?.outerHTML).toBe("<body>foo fizz<!----></body>");

    comment.nodeValue = {};
    expect(doc.body?.outerHTML).toBe("<body>foo fizz<!--[object Object]--></body>");

    text.nodeValue = "";
    expect(text.data).toBe("");
    expect(doc.body?.outerHTML).toBe("<body><!--[object Object]--></body>");
  });

  it("Text/Comment constructors with non-strings", () => {
    const textNull = new Text(null as any);
    const commentNull = new Comment(null as any);
    const textObject = new Text({} as any);
    const commentObject = new Comment({} as any);
    const textZero = new Text(0 as any);
    const commentZero = new Comment(0 as any);

    expect(textNull.nodeValue).toBe("null");
    expect(textNull.data).toBe("null");
    expect(textNull.textContent).toBe("null");
    expect(commentNull.nodeValue).toBe("null");
    expect(commentNull.data).toBe("null");
    expect(commentNull.textContent).toBe("null");

    expect(textObject.nodeValue).toBe("[object Object]");
    expect(textObject.data).toBe("[object Object]");
    expect(textObject.textContent).toBe("[object Object]");
    expect(commentObject.nodeValue).toBe("[object Object]");
    expect(commentObject.data).toBe("[object Object]");
    expect(commentObject.textContent).toBe("[object Object]");

    expect(textZero.nodeValue).toBe("0");
    expect(textZero.data).toBe("0");
    expect(textZero.textContent).toBe("0");
    expect(commentZero.nodeValue).toBe("0");
    expect(commentZero.data).toBe("0");
    expect(commentZero.textContent).toBe("0");
  });

  it("CharacterData.after/before/remove/replaceWith", () => {
    const doc = new DOMParser().parseFromString(`foo<!--bar-->`, "text/html");

    const text = doc.body?.childNodes[0] as Text;
    const comment = doc.body?.childNodes[1] as Comment;

    expect(doc.body?.childNodes.length).toBe(2);
    expect((text as any).previousSibling).toBe(null);

    text.before(new Comment("fizz"));

    expect(doc.body?.childNodes[0].nodeValue).toBe("fizz");
    expect(doc.body?.childNodes.length).toBe(3);
    expect(text.previousSibling?.nodeValue).toBe("fizz");
    expect(text.previousSibling?.nodeType).toBe(NodeType.COMMENT_NODE);
    expect(text.nextSibling?.nodeValue).toBe("bar");
    expect(text.nextSibling?.nodeType).toBe(NodeType.COMMENT_NODE);

    text.after(new Text(" extra"));

    expect(doc.body?.childNodes[2].nodeValue).toBe(" extra");
    expect(doc.body?.childNodes.length).toBe(4);
    expect(doc.body?.outerHTML).toBe(`<body><!--fizz-->foo extra<!--bar--></body>`);
    expect(text.nextSibling?.nodeValue).toBe(" extra");
    expect(text.nextSibling?.nodeType).toBe(NodeType.TEXT_NODE);

    const div = doc.createElement("div");
    div.innerHTML = "html";
    text.replaceWith("stuff", div);

    expect(doc.body?.childNodes.length).toBe(5);
    expect(doc.body?.outerHTML).toBe(
      `<body><!--fizz-->stuff<div>html</div> extra<!--bar--></body>`,
    );
    expect(div.nextSibling?.nodeValue).toBe(" extra");
    expect(text.parentNode).toBe(null);
    expect(text.parentElement).toBe(null);
    expect(div.previousSibling?.nodeValue).toBe("stuff");
    expect(div.nextSibling?.nodeValue).toBe(" extra");
    expect(div.nextSibling?.nextSibling).toBe(comment);

    comment.remove();

    expect(doc.body?.childNodes.length).toBe(4);
    expect(div.nextSibling?.nextSibling).toBe(null);
    expect(comment.parentNode).toBe(null);
    expect(comment.parentElement).toBe(null);
    expect(comment.previousSibling).toBe(null);
    expect(comment.nextSibling).toBe(null);
  });

  it("CharacterData.textContent", () => {
    const doc = new DOMParser().parseFromString(`<body>foo</body>`, "text/html");
    const text = doc.body!.childNodes[0];
    expect(text.textContent).toBe("foo");
    text.textContent = "bar";
    expect(text.textContent).toBe("bar");
  });
});
