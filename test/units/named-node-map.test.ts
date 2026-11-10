import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Named node map", () => {
  it("NamedNodeMap", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=foo id=fizz data-foo="alpha beta gamma"></div>
        <article></article>
        <aside class=bar></article>
      `,
      "text/html",
    );

    const div = doc.querySelector("div")!;
    const article = doc.querySelector("article")!;
    const aside = doc.querySelector("aside")!;

    expect(doc.querySelector(".foo")).toBe(div);
    expect(doc.querySelector(".bar")).toBe(aside);
    expect(div.attributes.length).toBe(3);
    expect(div.className).toBe("foo");
    expect(div.id).toBe("fizz");

    expect((div.attributes as any)["class"]).not.toBe("foo");
    expect((div.attributes as any)["id"]).not.toBe("fizz");
    expect(div.getAttribute("class")).toBe("foo");
    expect(div.getAttribute("id")).toBe("fizz");
    expect(div.getAttribute("data-foo")).toBe("alpha beta gamma");

    // Check the value of an attr node by index
    // before it's created
    expect(div.attributes[1]?.value).toBe("fizz");

    expect(div.attributes.getNamedItem("class")?.value).toBe("foo");
    expect(div.attributes.getNamedItem("id")?.value).toBe("fizz");
    expect(div.attributes.getNamedItem("data-foo")?.value).toBe("alpha beta gamma");

    expect(div.attributes[0]?.value).toBe("foo");
    expect(div.attributes[1]?.value).toBe("fizz");
    expect(div.attributes[2]?.value).toBe("alpha beta gamma");

    expect(div.getAttribute("class")).toBe("foo");
    expect(div.getAttribute("id")).toBe("fizz");
    expect(div.getAttribute("data-foo")).toBe("alpha beta gamma");

    expect(div.attributes.item(0)?.name).toBe("class");
    expect(div.attributes.item(1)?.name).toBe("id");
    expect(div.attributes.item(2)?.name).toBe("data-foo");

    expect(div.attributes[0]?.ownerElement).toBe(div);
    expect(div.attributes[1]?.ownerElement).toBe(div);
    expect(div.attributes[2]?.ownerElement).toBe(div);

    expect([...div.attributes].map((attr) => attr.value)).toStrictEqual([
      "foo",
      "fizz",
      "alpha beta gamma",
    ]);

    expect([...div.attributes].map((attr) => attr.name)).toStrictEqual(["class", "id", "data-foo"]);

    expect(div.classList.contains("foo")).toBeTruthy();

    expect(article.attributes.length).toBe(0);
    expect(article.className).toBe("");
    expect(article.id).toBe("");

    expect(article.getAttribute("class")).toBeNull();
    expect(article.getAttribute("id")).toBeNull();

    // Remove classname attr node
    const classNameAttr = div.attributes.removeNamedItem("class");
    expect(classNameAttr.ownerElement).toBeNull();
    expect(div.attributes.getNamedItem("class")).toBeNull();

    expect(() => {
      // removeNamedItem() should throw when there's no
      // attribute node with a matching name
      div.attributes.removeNamedItem("class");
    }).toThrow();

    expect(div.className).toBe("");
    expect(div.classList.contains("foo")).toBeFalsy();
    expect(div.getAttribute("class")).toBeNull();
    expect(div.attributes.length).toBe(2);
    expect(div.attributes.item(0)?.name).toBe("id");
    expect(div.attributes.item(1)?.name).toBe("data-foo");
    expect(doc.querySelector(".foo")).toBeNull();

    expect([...div.attributes].map((attr) => attr.value)).toStrictEqual([
      "fizz",
      "alpha beta gamma",
    ]);

    expect([...div.attributes].map((attr) => attr.name)).toStrictEqual(["id", "data-foo"]);

    // Check that we can querySelect the div through its id
    // before removing it
    expect(doc.querySelector("#fizz")).toBe(div);

    const idAttrNode = div.attributes.getNamedItem("id")!;
    expect(idAttrNode.ownerElement).toBe(div);

    // Remove id attribute node through `Element.removeAttribute`
    div.removeAttribute("id");

    expect(div.attributes.length).toBe(1);
    expect(div.attributes[0]?.name).toBe("data-foo");
    expect(div.attributes[0]?.value).toBe("alpha beta gamma");
    expect(div.attributes[1]).toBeUndefined();
    expect(div.getAttribute("id")).toBeNull();
    expect(div.id).toBe("");
    expect(doc.querySelector("#fizz")).toBeNull();
    expect(idAttrNode.ownerElement).toBeNull();

    // Make sure attribute is in sync when changing its value
    div.attributes[0].value = "charlie delta";

    expect(div.attributes[0]?.value).toBe("charlie delta");
    expect(div.getAttribute("data-foo")).toBe("charlie delta");
    expect(div.outerHTML).toBe('<div data-foo="charlie delta"></div>');

    div.setAttribute("data-foo", "echo foxtrot");

    expect(div.attributes[0]?.value).toBe("echo foxtrot");
    expect(div.getAttribute("data-foo")).toBe("echo foxtrot");
    expect(div.outerHTML).toBe('<div data-foo="echo foxtrot"></div>');

    // Make sure the 0 slot is undefined before setting
    // the article's new className via the attr node
    expect(article.attributes[0]).toBeUndefined();
    expect(article.outerHTML).toBe("<article></article>");

    // Add classname attr node to other element
    article.attributes.setNamedItem(classNameAttr);

    expect(article.attributes.length).toBe(1);
    expect(doc.querySelector(".foo")).toBe(article);
    expect(classNameAttr.ownerElement).toBe(article);
    expect(article.attributes[0]).toBe(classNameAttr);
    expect(article.attributes[0]?.value).toBe("foo");
    expect(article.outerHTML).toBe('<article class="foo"></article>');

    article.classList.add("qux");

    expect(doc.querySelector(".foo")).toBe(article);
    expect(doc.querySelector(".qux")).toBe(article);
    expect(article.className).toBe("foo qux");
    expect(article.getAttribute("class")).toBe("foo qux");
    expect(article.attributes[0]?.value).toBe("foo qux");

    article.setAttribute("class", "");

    expect(doc.querySelector(".foo")).toBeNull();
    expect(doc.querySelector(".qux")).toBeNull();
    expect(article.className).toBe("");
    expect(article.getAttribute("class")).toBe("");
    expect(article.attributes[0]?.value).toBe("");

    article.attributes[0].value = "fib qux";

    expect(article.getAttribute("class")).toBe("fib qux");
    expect(doc.querySelectorAll(".fib").length).toBe(1);
    expect(doc.querySelector(".fib")).toBe(article);
    expect(doc.querySelector(".foo")).toBeNull();
    expect(doc.querySelector(".bar")).toBe(aside);
    expect(doc.querySelector(".qux")).toBe(article);
    expect(article.className).toBe("fib qux");
    expect(article.getAttribute("class")).toBe("fib qux");
    expect(article.attributes[0].value).toBe("fib qux");

    // Move class name attribute to other element
    aside.attributes.setNamedItem(article.attributes.removeNamedItem("class"));

    expect(article.className).toBe("");
    expect(article.attributes.length).toBe(0);
    expect(article.getAttribute("class")).toBeNull();
    expect(aside.getAttribute("class")).toBe("fib qux");
    expect(doc.querySelectorAll(".fib").length).toBe(1);
    expect(doc.querySelector(".fib")).toBe(aside);
    expect(doc.querySelector(".foo")).toBeNull();
    expect(doc.querySelector(".bar")).toBeNull();
    expect(doc.querySelector(".qux")).toBe(aside);
    expect(aside.className).toBe("fib qux");
    expect(aside.getAttribute("class")).toBe("fib qux");
    expect(aside.attributes[0].value).toBe("fib qux");
    expect(aside.attributes.length).toBe(1);

    // Clone attribute node
    const classNameAttrClone = aside.attributes[0].cloneNode();
    expect(classNameAttrClone.ownerElement).toBeNull();

    article.attributes.setNamedItem(classNameAttrClone);

    expect(classNameAttrClone.ownerElement).toBe(article);
    expect(doc.querySelectorAll(".fib").length).toBe(2);
    expect([...doc.querySelectorAll(".fib")].map((node) => node.nodeName)).toStrictEqual([
      "ARTICLE",
      "ASIDE",
    ]);

    expect(article.classList.contains("fib")).toBeTruthy();
    expect(article.classList.contains("qux")).toBeTruthy();
    expect(article.className).toBe("fib qux");
    expect(article.getAttribute("class")).toBe("fib qux");
    expect(article.attributes[0].value).toBe("fib qux");
    expect(article.attributes.length).toBe(1);

    classNameAttrClone.value = "other";

    expect(article.classList.contains("fib")).toBeFalsy();
    expect(article.classList.contains("qux")).toBeFalsy();
    expect(article.getAttribute("class")).toBe("other");
    expect(article.className).toBe("other");
    expect(doc.querySelectorAll(".fib").length).toBe(1);
    expect(doc.querySelector(".other")).toBe(article);
  });

  it("NamedNodeMap stores unsafe Javascript property names", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div Constructor=fizz __pRoTo__=qux constructor=foo __proto__=bar></div>
      `,
      "text/html",
    );

    const div = doc.querySelector("div")!;

    expect(div.getAttribute("constructor")).toBe("fizz");
    expect(div.getAttribute("__proto__")).toBe("qux");
  });

  it("Uninitialized NamedNodeMap preserves ID and className attribute ordering", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div id=foo class=bar></div>
        <div class=baz id=fizz></div>
        <div id=only></div>
        <div class=only></div>
        <div data-others class=some-class id=some-id></div>
        <div id=some-other-id data-more-others class=some-other-class></div>
      `,
      "text/html",
    );

    const div1 = doc.querySelector("#foo")!;
    const div2 = doc.querySelector("#fizz")!;
    const div3 = doc.querySelector("#only")!;
    const div4 = doc.querySelector(".only")!;
    const div5 = doc.querySelector("[data-others]")!;
    const div6 = doc.querySelector("[data-more-others]")!;

    expect(div1.getAttributeNames()).toStrictEqual(["id", "class"]);
    expect(div2.getAttributeNames()).toStrictEqual(["class", "id"]);
    expect(div3.getAttributeNames()).toStrictEqual(["id"]);
    expect(div4.getAttributeNames()).toStrictEqual(["class"]);
    expect(div5.getAttributeNames()).toStrictEqual(["data-others", "class", "id"]);
    expect(div6.getAttributeNames()).toStrictEqual(["id", "data-more-others", "class"]);

    // Test that ordering is undisturbed when setting id/class a second time
    div1.setAttribute("id", "div1-id");
    div2.setAttribute("class", "div2-class");

    expect(div1.getAttributeNames()).toStrictEqual(["id", "class"]);
    expect(div2.getAttributeNames()).toStrictEqual(["class", "id"]);

    // Test that ordering is altered when removing and re-adding
    div1.removeAttribute("id");
    div2.removeAttribute("class");

    expect(div1.getAttributeNames()).toStrictEqual(["class"]);
    expect(div2.getAttributeNames()).toStrictEqual(["id"]);

    div1.setAttribute("id", "foo");
    div2.setAttribute("class", "baz");

    expect(div1.getAttributeNames()).toStrictEqual(["class", "id"]);
    expect(div2.getAttributeNames()).toStrictEqual(["id", "class"]);

    // Test attribute ordering is preserved after NamedNodeMap initialization
    div1.setAttribute("data-fizz", "");
    div2.removeAttribute("id");
    div2.setAttribute("data-foo", "");
    div2.setAttribute("id", "new-id");

    expect(div1.getAttributeNames()).toStrictEqual(["class", "id", "data-fizz"]);
    expect(div2.getAttributeNames()).toStrictEqual(["class", "data-foo", "id"]);
  });
});
