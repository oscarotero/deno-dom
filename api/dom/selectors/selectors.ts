import { DOM } from "./nwsapi-types.ts";
import type { DocumentFragment } from "../document-fragment.ts";
import type { Element } from "../element.ts";
import type { Document } from "../document.ts";

export type Selector = (doc: Document) => {
  first(
    selector: string,
    context: Element | Document | DocumentFragment,
    callback?: (element: Element) => void,
  ): Element | null;
  match(
    selector: string,
    context: Element | Document | DocumentFragment,
    callback?: (element: Element) => void,
  ): boolean;
  select(
    selector: string,
    context: Element | Document | DocumentFragment,
    callback?: (element: Element) => void,
  ): Element[];
};
export type SelectorApi = ReturnType<Selector>;

let codeGenerationAllowed: boolean | null = null;

export function createSelector(doc: Document): SelectorApi {
  return DOM(doc);
}
