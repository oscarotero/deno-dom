import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

const code = `<form>
    <p>
      <label for="pet-select">Select pet:</label>
      <select id="pet-select">
        <button>
          <selectedcontent></selectedcontent>
        </button>

        <option value="">Please select a pet</option>
        <option value="cat">
          <span class="icon" aria-hidden="true">🐱</span
          ><span class="option-label">Cat</span>
        </option>
      </select>
    </p>
  </form>
`;

describe("Select", () => {
  it("New parsing rules", () => {
    const dom = new DOMParser().parseFromString(code, "text/html");
    const select = dom.querySelector("select");

    expect(select?.querySelector("button")?.tagName).toBe("BUTTON");
  });
});
