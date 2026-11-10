import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Adjacent siblings", () => {
  const doc = new DOMParser().parseFromString(
    `<div class=main>
        <div class=a>a</div><div class=b>b</div><!-- foo bar --><div class=c>c</div>
      </div>`,
    "text/html",
  );
  const divMain = doc.querySelector(".main");
  const divA = doc.querySelector(".a");
  const divB = doc.querySelector(".b");
  const divC = doc.querySelector(".c");
  const comment = doc.querySelector(".main")?.childNodes[3]!;

  it("check siblings", () => {
    expect(divMain?.nextSibling).toBeNull();
    expect(divMain?.previousSibling).toBeNull();

    expect(divA?.nextSibling).toBe(divB);
    expect(divB?.previousSibling).toBe(divA);
    expect(divB?.nextSibling).toBe(comment);
    expect(divC?.previousSibling).toBe(comment);

    expect(divMain?.nextElementSibling).toBeNull();
    expect(divMain?.previousElementSibling).toBeNull();

    expect(divB?.nextElementSibling).toBe(divC);
    expect(divC?.previousElementSibling).toBe(divB);
  });
});
