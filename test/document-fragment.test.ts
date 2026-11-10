import { describe, it, expect } from "vitest";
import { Comment, DocumentFragment, DOMParser, Element, Node, Text } from "../mod.ts";

describe("Document fragment", () => {
  it("DocumentFragment", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=parent></div>
      `,
      "text/html",
    );

    const parent = doc.querySelector("#parent")!;
    const frag = new DocumentFragment();
    const frag2 = doc.createDocumentFragment();
    frag.append("foo", new Comment("bar"), doc.createElement("img"));

    expect(frag.childNodes.length).toBe(3);
    expect(frag.children.length).toBe(1);
    expect(frag.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
    expect(frag.childNodes[1].nodeValue).toBe("bar");

    parent.appendChild(frag);

    expect(frag.parentNode).toBe(null);
    expect(frag.parentElement).toBe(null);
    expect(frag.childNodes.length).toBe(0);
    expect(parent.childNodes.length).toBe(3);
    expect(parent.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
    expect(parent.childNodes[1].nodeValue).toBe("bar");

    frag2.appendChild(doc.createElement("aside"));
    frag2.append(doc.createElement("p"), doc.createElement("button"), new Text("fizz"));
    frag2.prepend(doc.createElement("div"));

    const newChildrenHtml = `
      <div class=a>
        <div class=b></div>
        <p>
          <img class="this-img" foo=bar />
        </p>
      </div>
    `;

    expect(frag2.lastElementChild).toBeTruthy();
    frag2.lastElementChild!.innerHTML = newChildrenHtml;

    expect(frag2.childNodes.length).toBe(5);
    expect((frag2.childNodes[0] as Element).tagName).toBe("DIV");
    expect(frag2.children.length).toBe(4);
    expect(frag2.querySelector(".a .this-img[foo=bar]")?.tagName).toBe("IMG");

    frag.insertBefore(frag2, null);

    expect(frag2.parentNode).toBe(null);
    expect(frag2.parentElement).toBe(null);
    expect(frag2.childNodes.length).toBe(0);
    expect(frag2.querySelector(".a .this-img")).toBe(null);
    expect(frag.childNodes.length).toBe(5);
    expect(frag.children.length).toBe(4);

    parent.children[0].before(frag);

    expect(parent.childNodes.length).toBe(8);
    expect((parent.childNodes[2] as Element).tagName).toBe("DIV");
    expect((parent.childNodes[3] as Element).tagName).toBe("ASIDE");
    expect(parent.querySelector(".a .this-img")?.tagName).toBe("IMG");

    parent.after(frag);
    parent.after(frag2);

    expect(frag.parentNode).toBe(null);
    expect(frag.parentElement).toBe(null);
    expect(frag2.parentNode).toBe(null);
    expect(frag2.parentElement).toBe(null);
    expect(doc.body?.childNodes.length).toBe(2);

    parent.replaceWith(frag);

    expect(doc.body?.childNodes.length).toBe(1);
    expect(doc.body?.children.length).toBe(0);

    const div = doc.createElement("div");
    const video = doc.createElement("video");
    doc.body?.append(div);
    frag2.prepend(video);

    doc.body?.replaceChild(frag2, div);

    expect(doc.body?.lastElementChild).toBe(video);
    expect(frag2.childNodes.length).toBe(0);
    expect(frag2.parentNode).toBeNull();
    expect(frag2.parentElement).toBeNull();
  });

  it("DocumentFragment.cloneNode", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div>foo <b>bar</b></div>
      `,
      "text/html",
    );
    const frag = doc.createDocumentFragment()!;
    const div = doc.querySelector("div")!;
    frag.append(div);

    const shallowFragClone = frag.cloneNode() as DocumentFragment;

    expect(shallowFragClone.childNodes.length).toBe(0);
    expect(shallowFragClone.children.length).toBe(0);
    expect(shallowFragClone.querySelectorAll("*").length).toBe(0);
    expect(frag).not.toBe(shallowFragClone);

    const deepFragClone = frag.cloneNode(true) as DocumentFragment;

    expect(deepFragClone.childNodes.length).toBe(1);
    expect(deepFragClone.children.length).toBe(1);
    expect(deepFragClone.children[0].outerHTML).toBe(`<div>foo <b>bar</b></div>`);
    expect(deepFragClone.querySelectorAll("*").length).toBe(2);
    expect(frag).not.toBe(deepFragClone);
    expect(shallowFragClone).not.toBe(deepFragClone);
    expect(div).not.toBe(deepFragClone.children[0]);
  });
});
