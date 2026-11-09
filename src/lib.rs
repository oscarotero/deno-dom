mod parser;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse(html: &str) -> String {
    parser::parse(html.into())
}

#[wasm_bindgen]
pub fn parse_frag(html: &str, context_local_name: &str) -> String {
    parser::parse_frag(html.into(), context_local_name.into())
}
