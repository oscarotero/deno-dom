import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Outer HTML", () => {
  it("Element.outerHTML", () => {
    const doc = new DOMParser().parseFromString(
      `
        <button onclick=false data-foo="bar baz">Hi, <strong qux>there!</strong></button>
      `,
      "text/html",
    )!;

    const button = doc.querySelector("button")!;
    expect(button.outerHTML).toBe(
      `<button onclick="false" data-foo="bar baz">Hi, <strong qux="">there!</strong></button>`,
    );
  });

  it("Element.outerHTML rawtext elements don't get XML escaped", () => {
    const doc = new DOMParser().parseFromString(
      `
        <script>((a,b) => a < b)(1337, 42 & 0);</script>
        <div>((a,b) => a < b)(1337, 42 & 0);</div>
      `,
      "text/html",
    );

    const script = doc.querySelector("script")!;
    const div = doc.querySelector("div")!;
    expect(script.outerHTML).toBe(`<script>((a,b) => a < b)(1337, 42 & 0);</script>`);
    expect(div.outerHTML).toBe(`<div>((a,b) =&gt; a &lt; b)(1337, 42 &amp; 0);</div>`);
  });

  it("Element.outerHTML void elements don't print their contents", () => {
    const doc = new DOMParser().parseFromString(
      `<img src="./foo.png" class="bar"/> <img class="invalid-img"></img> <div>unclosed`,
      "text/html",
    );

    const body = doc.querySelector("body")!;
    expect(body.outerHTML).toBe(
      `<body><img src="./foo.png" class="bar"> <img class="invalid-img"> <div>unclosed</div></body>`,
    );

    const img = doc.querySelector("img")!;
    img.append(
      Object.assign(doc.createElement("div"), {
        textContent: "you shouldn't be here",
      }),
    );

    expect(img.outerHTML).toBe(`<img src="./foo.png" class="bar">`);
    expect(img.innerHTML).toBe(`<div>you shouldn't be here</div>`);
  });

  it("Element.outerHTML won't overflow the stack for deeply nested HTML", () => {
    const html = Array.from<string>({ length: 2000 })
      .fill("<div>Hello ")
      .reduce((acc, tag, i) => tag + (i + 1) + acc + "</div>", "");
    const doc = new DOMParser().parseFromString(html, "text/html");

    const htmlElement = doc.documentElement!;
    expect(htmlElement.outerHTML.length > 0).toBeTruthy();
  });

  it("Element.outerHTML can be set to replace element", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=parent><div class=child></div></div>
        <div class=otherparent><span>1st</span><div class=otherchild>second</div><!--third--></div>
        <table><tbody><tr><td>hello</td></tr></tbody></table>
      `,
      "text/html",
    );
    const parent = doc.querySelector(".parent")!;
    const child = doc.querySelector(".child")!;
    const otherParent = doc.querySelector(".otherparent")!;
    const otherChild = doc.querySelector(".otherchild")!;
    const tbody = doc.querySelector("tbody")!;
    const tr = tbody.children[0];

    const newHTML = `<span>foo <em>fib</em></span>text nodes<strong fizz=qux>bar</strong><!--comment-->`;
    const serializedNewHTML = newHTML.replace("qux", '"qux"');
    child.outerHTML = newHTML;

    expect(child.parentNode).toBeNull();
    expect(Array.from(parent.childNodes).find((node) => node === child)).toBeUndefined();
    expect(parent.children.length).toBe(2);
    expect(parent.childNodes.length).toBe(4);
    expect(parent.innerHTML).toBe(serializedNewHTML);

    const newChild = parent.children[0];
    newChild.outerHTML = `<tr><td>goodbye</td></tr>`;
    expect(newChild.parentNode).toBeNull();
    expect(Array.from(parent.childNodes).find((node) => node === newChild)).toBeUndefined();
    expect(parent.children.length).toBe(1);
    expect(parent.childNodes.length).toBe(4);
    expect(parent.innerHTML).toBe(
      "goodbye" + serializedNewHTML.slice(serializedNewHTML.indexOf("text")),
    );

    expect(tbody.innerHTML).toBe(`<tr><td>hello</td></tr>`);
    tr.outerHTML = `<tr><td>goodbye</td></tr>`;

    expect(tr.parentNode).toBeNull();
    expect(Array.from(tbody.childNodes).find((node) => node === tr)).toBeUndefined();
    expect(tbody.children.length).toBe(1);
    expect(tbody.childNodes.length).toBe(1);
    expect(tbody.innerHTML).toBe(`<tr><td>goodbye</td></tr>`);

    otherChild.outerHTML = `<aside>seconded</aside><!--not counted-->`;

    expect(otherChild.parentNode).toBeNull();
    expect(otherChild.parentElement).toBeNull();
    expect(Array.from(otherParent.childNodes).find((node) => node === otherChild)).toBeUndefined();
    expect(otherParent.children.length).toBe(2);
    expect(otherParent.childNodes.length).toBe(4);
    expect(otherParent.outerHTML).toBe(
      `<div class="otherparent"><span>1st</span><aside>seconded</aside><!--not counted--><!--third--></div>`,
    );

    const solitaryDiv = doc.createElement("div");
    solitaryDiv.outerHTML = `<span>no-op</span>`;

    expect(solitaryDiv.parentNode).toBeNull();
    expect(solitaryDiv.outerHTML).toBe(`<div></div>`);

    const frag = doc.createDocumentFragment();
    const fragChild = doc.createElement("div");
    frag.appendChild(fragChild);
    expect(fragChild.parentNode).toBe(frag);
    expect(frag.childNodes[0].nodeName).toBe("DIV");
    expect(frag.childNodes.length).toBe(1);

    fragChild.outerHTML = `
      <aside></aside>
      <!---->
      <tr><td>only text nodes allowed</td></tr>
      <button></button>
    `.replace(/\s{2,}/g, "");

    expect(fragChild.parentNode).toBeNull();
    expect(frag.children.length).toBe(2);
    expect(frag.childNodes.length).toBe(4);
    expect(
      Array.from(frag.childNodes)
        .map((node) => node.nodeName)
        .join("-"),
    ).toBe("ASIDE-#comment-#text-BUTTON");

    expect(() => {
      doc.documentElement!.outerHTML = "<div>not new document element</div>";
    }).toThrow();
  });

  it("setting Element.innerHTML should not escape <noscript> contents", () => {
    const doc = new DOMParser().parseFromString(
      `
          <div></div>
        `,
      "text/html",
    )!;

    const div = doc.querySelector("div")!;
    div.innerHTML = `<noscript><div id="fizz">foo & bar</div></noscript>`;
    const noscript = doc.querySelector("noscript")!;

    expect(noscript.outerHTML).toBe(`<noscript><div id="fizz">foo & bar</div></noscript>`);
  });
});
