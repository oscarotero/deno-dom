import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Insert before", () => {
  it("Node.insertBefore", () => {
    const doc = new DOMParser().parseFromString(
      `
        <div class=parent>
          <div class=child1></div>
          <div class=child2></div>
          <div class=child3><div class=child3_1></div></div>
        </div>
      `,
      "text/html",
    );

    const body = doc.body;
    const parent = doc.querySelector(".parent")!;
    const child1 = doc.querySelector(".child1")!;
    const child2 = doc.querySelector(".child2")!;
    const child3 = doc.querySelector(".child3")!;
    const child3_1 = doc.querySelector(".child3_1")!;

    expect(parent.firstElementChild?.className).toBe("child1");
    expect(parent.children.length).toBe(3);
    expect(child2.parentNode).toBe(parent);
    parent.insertBefore(child2, child1);
    expect(parent.firstElementChild?.className).toBe("child2");
    expect(parent.children.length).toBe(3);
    expect(child2.parentNode).toBe(parent);

    expect(child3.childNodes.length).toBe(1);
    expect(child3.firstElementChild?.className).toBe("child3_1");
    expect(child3_1.parentNode).toBe(child3);
    parent.insertBefore(child3_1, null);
    expect(parent.lastElementChild?.className).toBe("child3_1");
    expect(child3.childNodes.length).toBe(0);
    expect(child3.firstChild).toBeNull();
    expect(child3_1.parentNode).toBe(parent);

    expect(body?.firstElementChild?.className).toBe("parent");
    body?.insertBefore(child2, parent);
    expect(parent.firstElementChild?.className).toBe("child1");
    expect(body?.children.length).toBe(2);
    expect(body?.firstElementChild?.className).toBe("child2");
    expect(body?.lastElementChild?.className).toBe("parent");

    expect(() => {
      parent.insertBefore(child3_1, child2);
    }).toThrow();
  });
});
