import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";

describe("Inner html", () => {
  it("setting Element.innerHTML yields children with correct .parentNode's", () => {
    const doc = new DOMParser().parseFromString(`<div id=parent></div>`, "text/html");

    const parent = doc.querySelector("#parent")!;
    parent.innerHTML = `
      <div id=child></div>
    `;
    const child = doc.querySelector("#child")!;

    expect(child.parentNode).toBe(parent);
  });

  it("Element.innerHTML includes context", () => {
    const doc = new DOMParser().parseFromString(
      `
          <table><tr id=parent-row></tr></table>
          <div id=parent-div></div>
        `,
      "text/html",
    );

    const parentRow = doc.querySelector("#parent-row")!;
    parentRow.innerHTML = "<th>This is a header</th>";

    expect(parentRow.innerHTML).toBe("<th>This is a header</th>");

    const parentDiv = doc.querySelector("#parent-div")!;
    parentDiv.innerHTML = "<th>This is a header</th>";

    expect(parentDiv.innerHTML).toBe("This is a header");
  });
});
