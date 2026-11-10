import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Nodes ancestor", () => {
  it("Element.replaceWith ancestor check", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <div class=a>a</div>
        </div>
        <div class=b>b</div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const divA = doc.querySelector(".a")!;
    const divB = doc.querySelector(".b")!;

    expect(() => {
      divA.replaceWith(divMain);
    }).toThrow();

    divA.replaceWith(divB);
  });

  it("Element.append ancestor check", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <div class=a>a</div>
        </div>
        <div class=b>b</div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const divA = doc.querySelector(".a")!;
    const divB = doc.querySelector(".b")!;

    expect(() => {
      divA.append(divMain);
    }).toThrow();

    divA.append(divB);
  });

  it("Element.before ancestor check", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <div class=a>a</div>
        </div>
        <div class=b>b</div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const divA = doc.querySelector(".a")!;
    const divB = doc.querySelector(".b")!;

    expect(() => {
      divA.before(divMain);
    }).toThrow();

    divA.before(divB);
  });

  it("Element.after ancestor check", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <div class=a>a</div>
        </div>
        <div class=b>b</div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const divA = doc.querySelector(".a")!;
    const divB = doc.querySelector(".b")!;

    expect(() => {
      divA.after(divMain);
    }).toThrow();

    divA.after(divB);
  });

  it("Element.append ancestor check", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=main>
          <div class=a>a</div>
        </div>
        <div class=b>b</div>
      `,
      "text/html",
    );
    const divMain = doc.querySelector(".main")!;
    const divA = doc.querySelector(".a")!;
    const divB = doc.querySelector(".b")!;

    expect(() => {
      divA.append(divMain);
    }).toThrow();

    divA.append(divB);
  });
});
