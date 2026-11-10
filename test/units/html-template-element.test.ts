import { describe, it, expect } from "vitest";
import { DocumentFragment, DOMParser, HTMLTemplateElement, NodeType } from "../../mod.ts";

describe("template element", () => {
  it("HTMLTemplateElement", () => {
    const doc = new DOMParser().parseFromString(
      `
        <!DOCTYPE html>
        <html>
          <head>
            <title>testing <template></title>
          </head>
          <body>
            <h1>hello, world!</h1>
            <template class=templ-a>
              <button>click me!</button>
              <p>some things here</p>
              <article>stuff</article>
            </template>
            <template class=templ-b><b>foo <i>bar</i></b></template>
            <article>other stuff</article>
          </body>
        </html>
      `,
      "text/html",
    );

    const templA = doc.querySelector(".templ-a")! as HTMLTemplateElement;
    const templB = doc.querySelector(".templ-b")! as HTMLTemplateElement;
    const articles = doc.querySelectorAll("article")!;
    const paragraph = doc.querySelector("p");

    expect(articles.length).toBe(1);
    expect(templA.childNodes.length + templB.childNodes.length).toBe(0);
    expect(templA.constructor).toBe(HTMLTemplateElement);
    expect(templB.constructor).toBe(HTMLTemplateElement);
    expect(templA.content.constructor).toBe(DocumentFragment);
    expect(templB.content.constructor).toBe(DocumentFragment);
    expect(paragraph).toBeNull();
    expect(templB.outerHTML).toBe(`<template class="templ-b"><b>foo <i>bar</i></b></template>`);

    templB.append(doc.createElement("div"), "Hello!");
    expect(templB.childNodes.length).toBe(2);

    // Make sure <template>'s outerHTML is unchanged
    expect(templB.outerHTML).toBe(`<template class="templ-b"><b>foo <i>bar</i></b></template>`);

    const innerContentA = templA.content;
    const innerContentB = templB.content;

    expect(innerContentA.children.length).toBe(3);
    expect(innerContentB.children.length).toBe(1);

    const innerParagraph = innerContentA.querySelector("p");

    expect(innerParagraph?.textContent).toBe("some things here");
    expect(templB.content.querySelector("b")?.tagName).toBe("B");

    // Clear contents, not template.childNodes
    templB.innerHTML = "";

    // Make sure .contents was emptied
    expect(templB.outerHTML).toBe(`<template class="templ-b"></template>`);
    expect(templB.content.querySelector("b")).toBeNull();

    // Make sure the actual (not .contents) child nodes are still there
    expect(templB.childNodes.length).toBe(2);

    templB.innerHTML = `<aside>Some foo things</aside>`;

    // Make sure the actual (not .contents) child nodes haven't changed
    expect(templB.childNodes.length).toBe(2);

    // Check that our new <aside> is there by checking for its chlld text node
    expect(templB.content.querySelector("aside")?.childNodes[0].nodeType).toBe(NodeType.TEXT_NODE);

    // Remove all children
    for (const node of templB.childNodes) {
      templB.removeChild(node);
    }

    expect(templB.childNodes.length).toBe(1);
    expect(templB.outerHTML).toBe(
      `<template class="templ-b"><aside>Some foo things</aside></template>`,
    );
  });

  it('document.createElement("template")', () => {
    const doc = new DOMParser().parseFromString("", "text/html");
    const templ = doc.createElement("template") as HTMLTemplateElement;

    expect(templ.constructor).toBe(HTMLTemplateElement);
    expect(templ.content?.constructor).toBe(DocumentFragment);
    expect(templ.content.childNodes.length).toBe(0);
  });

  it("HTMLTemplateElement.cloneNode", () => {
    const doc = new DOMParser().parseFromString(
      `
        <template id=first data-thing=something>
          <h1>foo</h1>
          <div>bar</div>
        </template>
  
        <template id=outer>
          <article>fizz</article>
          <p>important</p>
          <template id=inner>
            <aside>qux</aside>
          </template>
        </template>
      `,
      "text/html",
    );

    const templ = doc.querySelector("template#first") as HTMLTemplateElement;
    const templShallowClone = templ.cloneNode();
    const templDeepClone = templ.cloneNode(true);

    expect(templShallowClone.constructor).toBe(HTMLTemplateElement);
    expect(templDeepClone.constructor).toBe(HTMLTemplateElement);
    expect(templShallowClone.content?.constructor).toBe(DocumentFragment);
    expect(templDeepClone.content?.constructor).toBe(DocumentFragment);

    expect(templ.getAttribute("data-thing")).toBe("something");
    expect(templShallowClone.getAttribute("data-thing")).toBe("something");
    expect(templDeepClone.getAttribute("data-thing")).toBe("something");

    expect(templShallowClone.content.childNodes.length).toBe(0);
    expect(templDeepClone.content.childNodes.length).toBe(5);
    expect(templShallowClone.content).not.toBe(templ.content);
    expect(templDeepClone.content).not.toBe(templ.content);

    expect(templDeepClone.content.childNodes[0]).not.toBe(templ.content.childNodes[0]);
    expect(templDeepClone.content.childNodes[1]).not.toBe(templ.content.childNodes[1]);
    expect(templDeepClone.content.childNodes[0].nodeName).toBe("#text");
    expect(templDeepClone.content.childNodes[1].nodeName).toBe("H1");
    expect(templDeepClone.content.childNodes[0].nodeName).toBe(
      templ.content.childNodes[0].nodeName,
    );
    expect(templDeepClone.content.childNodes[1].nodeName).toBe(
      templ.content.childNodes[1].nodeName,
    );
    expect(templDeepClone.content.childNodes[0].textContent).toBe(
      templ.content.childNodes[0].textContent,
    );
    expect(templDeepClone.content.childNodes[1].textContent).toBe(
      templ.content.childNodes[1].textContent,
    );

    expect(templ.querySelector("h1")).toBeNull();
    expect(templDeepClone.querySelector("h1")).toBeNull();
    expect(templ.content.querySelector("h1")?.textContent).toBe("foo");
    expect(templDeepClone.content.querySelector("h1")?.textContent).toBe("foo");
    expect(templDeepClone.content.querySelector("h1")).not.toBe(templ.content.querySelector("h1"));

    const outer = doc.querySelector("#outer") as HTMLTemplateElement;
    const wrongInner = doc.querySelector("#inner") as HTMLTemplateElement | null;
    const inner = outer.content.querySelector("#inner") as HTMLTemplateElement;

    expect(wrongInner).toBeNull();
    expect(outer.constructor).toBe(HTMLTemplateElement);
    expect(inner.constructor).toBe(HTMLTemplateElement);

    expect(outer.content.querySelector("article")?.textContent).toBe("fizz");
    expect(outer.content.querySelector("aside")?.textContent).toBeUndefined();
    expect(inner.content.querySelector("aside")?.textContent).toBe("qux");

    const outerShallowClone = outer.cloneNode();
    const outerDeepClone = outer.cloneNode(true);

    expect(outer).not.toBe(outerShallowClone);
    expect(outer).not.toBe(outerDeepClone);
    expect(outer.content).not.toBe(outerShallowClone.content);
    expect(outer.content).not.toBe(outerDeepClone.content);
    expect(outerShallowClone.content).not.toBe(outerDeepClone.content);

    const outerDeepCloneInner = outerDeepClone.content.querySelector(
      "#inner",
    ) as HTMLTemplateElement;

    expect(outerShallowClone.content.childNodes.length).toBe(0);
    expect(outerDeepClone.content.childNodes.length).toBe(7);
    expect(outerShallowClone.querySelector("#inner")).toBeNull();
    expect(outerShallowClone.content.querySelector("#inner")).toBeNull();
    expect(outerDeepClone.querySelector("#inner")).toBeNull();
    expect(outerDeepCloneInner.constructor).toBe(HTMLTemplateElement);

    expect(outerDeepCloneInner).not.toBe(inner);
    expect(outerDeepCloneInner.content).not.toBe(inner.content);
    expect(outerDeepCloneInner.childNodes.length).toBe(0);
    expect(outerDeepCloneInner.content.childNodes.length).toBe(inner.content.childNodes.length);
    expect(outerDeepCloneInner.content.children[0].textContent).toBe("qux");
    expect(outerDeepCloneInner.content.children[0].textContent).toBe(
      inner.content.children[0].textContent,
    );
    expect(outerDeepCloneInner.content.children[0].tagName).toBe(inner.content.children[0].tagName);
    expect(outerDeepCloneInner.content.children[0]).not.toBe(inner.content.children[0]);

    outer.innerHTML = "";
    const emptyOuterShallowClone = outer.cloneNode();
    const emptyOuterDeepClone = outer.cloneNode(true);

    expect(emptyOuterShallowClone.content.childNodes.length).toBe(0);
    expect(emptyOuterDeepClone.content.childNodes.length).toBe(0);
    expect(emptyOuterShallowClone.content).not.toBe(outer.content);
    expect(emptyOuterDeepClone.content).not.toBe(outer.content);
    expect(outer.querySelector("template")).toBeNull();
    expect(emptyOuterDeepClone.querySelector("template")).toBeNull();

    outer.innerHTML = `<span>spanning</span><template id=other-inner><figure>pretty</figure></template>`;

    const replacedOuterShallowClone = outer.cloneNode();
    const replacedOuterDeepClone = outer.cloneNode(true);

    expect(replacedOuterShallowClone.content.childNodes.length).toBe(0);
    expect(replacedOuterDeepClone.content.childNodes.length).toBe(2);
    expect(replacedOuterShallowClone.querySelector("span")).toBeNull();
    expect(replacedOuterDeepClone.querySelector("span")).toBeNull();
    expect(replacedOuterShallowClone.content.querySelector("span")).toBeNull();
    expect(replacedOuterDeepClone.content.querySelector("span")?.tagName, "SPAN");
    expect(replacedOuterDeepClone.content.querySelector("figure")).toBeNull();

    const replacedOuterDeepCloneInner = replacedOuterDeepClone.content.querySelector(
      "template",
    ) as HTMLTemplateElement;

    expect(replacedOuterDeepCloneInner?.constructor).toBe(HTMLTemplateElement);
    expect(replacedOuterDeepCloneInner.querySelector("figure")).toBeNull();
    expect(replacedOuterDeepCloneInner.content.querySelector("figure")?.tagName).toBe("FIGURE");

    replacedOuterDeepCloneInner.textContent = "";
    expect(replacedOuterDeepCloneInner.content.querySelector("figure")?.tagName).toBe("FIGURE");

    replacedOuterDeepCloneInner.innerHTML = "";
    expect(replacedOuterDeepCloneInner.content.querySelector("figure")?.tagName).toBeUndefined();
  });

  it("HTMLTemplateElement parent will properly print its innerHTML", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=parent><template><p>foo bars</p></template></div>
      `,
      "text/html",
    );
    const templateParent = doc.querySelector(".parent")!;
    expect(templateParent.outerHTML).toBe(
      `<div class="parent"><template><p>foo bars</p></template></div>`,
    );
  });
});
