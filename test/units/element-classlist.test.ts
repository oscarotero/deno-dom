import { describe, it, expect } from "vitest";
import { DOMParser, DOMTokenList } from "../../mod.ts";

describe("Element classList", () => {
  it("Element.classList.value", () => {
    const doc = new DOMParser().parseFromString(
      "<div class='a b'></div><main></main>",
      "text/html",
    );
    const div = doc.querySelector("div")!;
    const main = doc.querySelector("main")!;
    main.classList.value = "a b";
    expect(div.classList.value).toBe("a b");
    expect(div.classList.contains("a")).toBeTruthy();
    expect(div.classList.contains("b")).toBeTruthy();
    div.classList.value = "c  d c";
    expect(div.classList.value).toBe("c  d c");
    expect(div.classList.contains("a")).toBeFalsy();
    expect(div.classList.contains("b")).toBeFalsy();
    expect(div.classList.contains("c")).toBeTruthy();
    expect(div.classList.contains("d")).toBeTruthy();
    div.classList.add("e");
    expect(div.classList.value).toBe("c d e");
    expect(main.getAttribute("class")).toBe("a b");
  });

  it("Element.classList.length", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;
    expect(div.classList.length).toBe(2);
    div.classList.add("c");
    expect(div.classList.length).toBe(3);
    div.classList.remove("a", "b");
    expect(div.classList.length).toBe(1);

    expect(
      // @ts-ignore
      () => (div.classList.length = 0),
    ).toThrow(TypeError);
  });

  it("Element.classList.add", () => {
    const doc = new DOMParser().parseFromString("<div></div><main></main>", "text/html");
    const div = doc.querySelector("div")!;
    div.classList.add("a");
    div.classList.add("b", "c");
    expect(div.classList.contains("a")).toBeTruthy();
    expect(div.classList.contains("b")).toBeTruthy();
    expect(div.classList.contains("c")).toBeTruthy();
    expect(() => div.classList.add("")).toThrow(DOMException);
    expect(div.getAttribute("class")).toBe("a b c");
  });

  it("Element.classList.remove", () => {
    const doc = new DOMParser().parseFromString("<div class='a b c'></div>", "text/html");
    const div = doc.querySelector("div")!;
    div.classList.remove("a");
    expect(div.classList.value).toBe("b c");
    div.classList.remove("b", "c");
    expect(div.classList.value).toBe("");
    expect(() => div.classList.remove("")).toThrow(DOMException);
  });

  it("Element.classList.item", () => {
    const doc = new DOMParser().parseFromString("<div class='a b c b a'></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(div.classList.item(0)).toBe("a");
    expect(div.classList.item(-0)).toBe("a");
    expect(div.classList.item(0.9)).toBe("a");
    expect(div.classList.item(-0.9)).toBe("a");
    expect(div.classList.item(NaN)).toBe("a");
    expect(div.classList.item(Infinity)).toBe("a");
    expect(div.classList.item(2 ** 32)).toBe("a");
    expect(div.classList.item(2 ** 32 * 2 + 0.5)).toBe("a");

    expect(div.classList.item(1)).toBe("b");
    expect(div.classList.item(2 ** 32 + 1)).toBe("b");
    expect(div.classList.item(2 ** 32 * 2 + 1.9)).toBe("b");

    expect(div.classList.item(2)).toBe("c");
    expect(div.classList.item(2 ** 32 * 2 + 2.1)).toBe("c");
    expect(div.classList.item(Math.E)).toBe("c");

    expect(div.classList.item(3)).toBe(null);
    expect(div.classList.item(2 ** 16)).toBe(null);
    expect(div.classList.item(2 ** 32 * 2 + 3)).toBe(null);
    expect(div.classList.item(-1)).toBe(null);
    expect(div.classList.item(-Infinity)).toBe(null);
  });

  it("Element.classList.replace", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(div.classList.replace("a", "b")).toBeTruthy();
    expect(div.classList.value).toBe("b");

    expect(div.classList.replace("b", "c")).toBeTruthy();
    expect(div.classList.value).toBe("c");

    expect(div.classList.replace("a", "b")).toBeFalsy();
    expect(div.classList.value).toBe("c");

    expect(() => div.classList.replace("", "b")).toThrow(DOMException);

    expect(() => div.classList.replace("a", "")).toThrow(DOMException);
  });

  it("Element.classList.toggle", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    expect(!div.classList.toggle("a"), "toggle('a') should return false");
    expect(div.classList.toggle("a"), "toggle('a') should return true");
    expect(div.classList.toggle("c"), "toggle('c') should return true");
    expect(div.classList.value).toBe("b a c");
  });

  it("Element.classList.forEach", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    const classes: Array<[string, number, DOMTokenList]> = [];
    div.classList.forEach((...args) => {
      classes.push(args);
    });

    expect(classes).toStrictEqual([
      ["a", 0, div.classList],
      ["b", 1, div.classList],
    ]);
  });

  it("Element.classList.entries", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    const classes = [...div.classList.entries()];

    expect(classes).toStrictEqual([
      [0, "a"],
      [1, "b"],
    ]);
  });

  it("Element.classList.values", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    const classes = [...div.classList.values()];

    expect(classes).toStrictEqual(["a", "b"]);
  });

  it("Element.classList.keys", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    const classes = [...div.classList.keys()];

    expect(classes).toStrictEqual([0, 1]);
  });

  it("Element.classList.@@iterator", () => {
    const doc = new DOMParser().parseFromString("<div class='a   b b'></div>", "text/html");
    const div = doc.querySelector("div")!;

    const classes = [...div.classList];

    expect(classes).toStrictEqual(["a", "b"]);
  });

  it("Element.classList.#onChange", () => {
    const doc = new DOMParser().parseFromString("<div class='a'></div>", "text/html");
    const div = doc.querySelector("div")!;

    div.classList.add("b");

    expect(div.className).toBe("a b");

    div.classList.remove("a");

    expect(div.className).toBe("b");

    div.classList.replace("b", "c");

    expect(div.className).toBe("c");

    div.classList.toggle("c");

    expect(div.className).toBe("");

    div.classList.value = "d e";

    expect(div.className).toBe("d e");

    div.classList.value = "";
    div.classList.add("f");

    expect(div.className).toBe("f");
  });
});
