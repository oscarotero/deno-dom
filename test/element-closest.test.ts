import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Element closest", () => {
  it("Element-closest", () => {
    const doc = new DOMParser().parseFromString(
      `
      <html class="class-a" id="a">
        <body class="class-b" id="b">
          <div class="class-c" id="c">
            <div class="class-d" id="d"></div>
          </div>
        </body>
      </html>
    `,
      "text/html",
    );
    const a = doc.getElementById("a")!;
    const b = doc.getElementById("b")!;
    const c = doc.getElementById("c")!;
    const d = doc.getElementById("d")!;

    // Match self
    expect(d.closest(".class-d")).toBe(d);

    // Match parent
    expect(d.closest(".class-c")).toBe(c);

    // Match grandparent
    expect(d.closest(".class-b")).toBe(b);

    // Match document element
    expect(d.closest(".class-a")).toBe(a);

    // No match
    expect(d.closest(".class-no-match")).toBeNull();
  });
});
