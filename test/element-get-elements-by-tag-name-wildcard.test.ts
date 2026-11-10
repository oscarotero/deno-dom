import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("get Elements", () => {
  it("Element.getElementsByTagName(wildcard)", () => {
    const doc = new DOMParser().parseFromString(
      `
      <div id=parent>
        <p>
          <button>Hello, <b>world!</b></button>
        </p>
        <img src=foo.png>
      </div>
    `,
      "text/html",
    );

    const parent = doc.querySelector("#parent")!;

    expect(parent.getElementsByTagName("*").length).toBe(4);
  });
});
