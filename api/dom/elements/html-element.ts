import { Element } from "../element.ts";

export class HTMLElement extends Element {
  accessKey: string = "";

  get accessKeyLabel() {
    return "";
  }

  dir = "auto";

  draggable = false;

  enterkeyhint = "";

  hidden = false;

  inert = false;

  get innerText(): string {
    return this.textContent;
  }

  set innerText(text: string) {
    this.textContent = text;
  }

  lang = "";

  noModule = false;

  nonce = 0;

  get offsetHeight() {
    return 0;
  }

  get offsetLeft() {
    return 0;
  }

  get offsetParent() {
    return null;
  }

  get offsetTop() {
    return 0;
  }

  get offsetWidth() {
    return 0;
  }

  get outerText() {
    return this.textContent;
  }

  set outerText(text: string) {
    throw new Error("Method not implemented.");
  }

  // TODO: should return HTMLPropertiesCollection
  get properties() {
    throw new Error("Method not implemented.");
  }

  spellcheck = true;

  get style(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }

  set style(text: string | CSSStyleDeclaration) {
    throw new Error("Method not implemented.");
  }

  tabIndex = -1;

  title = "";

  translate = false;

  attachInternals() {
    throw new Error("Method not implemented.");
  }
}
