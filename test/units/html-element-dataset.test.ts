import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

// FIXME: should be HTMLElement but it's not implemented yet
describe("Dataset", () => {
  it("Element#dataset", () => {
    const doc = new DOMParser().parseFromString(
      `<div bar=nope foo=notdataset data-foo=bar data--foo-bar=baz></div>`,
      "text/html",
    );
    const div = doc.querySelector("div")!;

    expect(div.dataset.foo).toBe("bar");
    expect(div.dataset.FooBar).toBe("baz");
    expect(div.dataset.bar).toBeUndefined();
    expect("foo" in div.dataset).toBeTruthy();
    expect("FooBar" in div.dataset).toBeTruthy();
    expect("bar" in div.dataset).toBeFalsy();
    expect(Object.keys(div.dataset)).toStrictEqual(["foo", "FooBar"]);
    expect(div.hasAttribute("data-foo")).toBeTruthy();
    expect(div.hasAttribute("data--foo-bar")).toBeTruthy();

    delete div.dataset.FooBar;

    expect(div.dataset.foo).toBe("bar");
    expect(div.dataset.FooBar).toBeUndefined();
    expect(div.dataset.bar).toBeUndefined();
    expect("foo" in div.dataset).toBeTruthy();
    expect("FooBar" in div.dataset).toBeFalsy();
    expect("bar" in div.dataset).toBeFalsy();
    expect(Object.keys(div.dataset)).toStrictEqual(["foo"]);
    expect(div.hasAttribute("data-foo")).toBeTruthy();
    expect(div.hasAttribute("data--foo-bar")).toBeFalsy();
    expect(div.outerHTML).toBe(`<div bar="nope" foo="notdataset" data-foo="bar"></div>`);

    div.dataset.FIZZy = 42 as unknown as string;

    expect(div.dataset.foo).toBe("bar");
    expect(div.dataset.FooBar).toBeUndefined();
    expect(div.dataset.bar).toBeUndefined();
    expect(div.dataset.FIZZy).toBe("42");
    expect("foo" in div.dataset).toBeTruthy();
    expect("FooBar" in div.dataset).toBeFalsy();
    expect("bar" in div.dataset).toBeFalsy();
    expect("FIZZy" in div.dataset).toBeTruthy();
    expect(Object.keys(div.dataset)).toStrictEqual(["foo", "FIZZy"]);
    expect(div.hasAttribute("data-foo")).toBeTruthy();
    expect(div.hasAttribute("data--foo-bar")).toBeFalsy();
    expect(div.hasAttribute("data--f-i-z-zy")).toBeTruthy();
    expect(div.outerHTML).toBe(
      `<div bar="nope" foo="notdataset" data-foo="bar" data--f-i-z-zy="42"></div>`,
    );

    div.removeAttribute("data-foo");

    expect(div.dataset.foo).toBeUndefined();
    expect(div.dataset.FooBar).toBeUndefined();
    expect(div.dataset.bar).toBeUndefined();
    expect(div.dataset.FIZZy).toBe("42");
    expect("foo" in div.dataset).toBeFalsy();
    expect("FooBar" in div.dataset).toBeFalsy();
    expect("bar" in div.dataset).toBeFalsy();
    expect("FIZZy" in div.dataset).toBeTruthy();
    expect(Object.keys(div.dataset)).toStrictEqual(["FIZZy"]);
    expect(div.hasAttribute("data-foo")).toBeFalsy();
    expect(div.hasAttribute("data--foo-bar")).toBeFalsy();
    expect(div.hasAttribute("data--f-i-z-zy")).toBeTruthy();
    expect(div.outerHTML).toBe(`<div bar="nope" foo="notdataset" data--f-i-z-zy="42"></div>`);

    div.setAttribute("data--éclair", true);

    expect(div.dataset.foo).toBeUndefined();
    expect(div.dataset.FooBar).toBeUndefined();
    expect(div.dataset.bar).toBeUndefined();
    expect(div.dataset.FIZZy).toBe("42");
    expect(div.dataset["-éclair"]).toBe("true");
    expect("foo" in div.dataset).toBeFalsy();
    expect("FooBar" in div.dataset).toBeFalsy();
    expect("bar" in div.dataset).toBeFalsy();
    expect("FIZZy" in div.dataset).toBeTruthy();
    expect("-éclair" in div.dataset).toBeTruthy();
    expect(Object.keys(div.dataset)).toStrictEqual(["FIZZy", "-éclair"]);
    expect(div.hasAttribute("data-foo")).toBeFalsy();
    expect(div.hasAttribute("data--foo-bar")).toBeFalsy();
    expect(div.hasAttribute("data--f-i-z-zy")).toBeTruthy();
    expect(div.hasAttribute("data--éclair")).toBeTruthy();
    expect(div.outerHTML).toBe(
      `<div bar="nope" foo="notdataset" data--f-i-z-zy="42" data--éclair="true"></div>`,
    );

    expect(() => {
      div.dataset["-e"] = "fails";
    }).toThrow();

    expect(() => {
      div.dataset["—"] = "fails";
    }).toThrow();
  });
});
