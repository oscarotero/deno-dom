import * as wasm from "../wasm/dom_wasm.js";

export function parse(html: string): string {
  return wasm.parse(html);
}

export function parseFrag(html: string, contextLocalName?: string): string {
  return wasm.parse_frag(html, contextLocalName ?? "");
}
