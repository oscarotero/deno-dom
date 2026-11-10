import { describe, it, expect } from "vitest";
import { Document, Node, NodeType } from "../mod.ts";

describe("Node constants", () => {
  it("Node#TEXT_NODE, Node#ELEMENT_NODE, et al. instance nodeType constants", () => {
    const doc = new Document();
    const div = doc.createElement("div");

    expect(div.ELEMENT_NODE).toBe(Node.ELEMENT_NODE);
    expect(div.ATTRIBUTE_NODE).toBe(Node.ATTRIBUTE_NODE);
    expect(div.TEXT_NODE).toBe(Node.TEXT_NODE);
    expect(div.CDATA_SECTION_NODE).toBe(Node.CDATA_SECTION_NODE);
    expect(div.ENTITY_REFERENCE_NODE).toBe(Node.ENTITY_REFERENCE_NODE);
    expect(div.ENTITY_NODE).toBe(Node.ENTITY_NODE);
    expect(div.PROCESSING_INSTRUCTION_NODE).toBe(Node.PROCESSING_INSTRUCTION_NODE);
    expect(div.COMMENT_NODE).toBe(Node.COMMENT_NODE);
    expect(div.DOCUMENT_NODE).toBe(Node.DOCUMENT_NODE);
    expect(div.DOCUMENT_TYPE_NODE).toBe(Node.DOCUMENT_TYPE_NODE);
    expect(div.DOCUMENT_FRAGMENT_NODE).toBe(Node.DOCUMENT_FRAGMENT_NODE);
    expect(div.NOTATION_NODE).toBe(Node.NOTATION_NODE);
  });

  it("Node.TEXT_NODE, Node.ELEMENT_NODE, et al. static nodeType constants", () => {
    expect(Node.ELEMENT_NODE).toBe(NodeType.ELEMENT_NODE);
    expect(Node.ATTRIBUTE_NODE).toBe(NodeType.ATTRIBUTE_NODE);
    expect(Node.TEXT_NODE).toBe(NodeType.TEXT_NODE);
    expect(Node.CDATA_SECTION_NODE).toBe(NodeType.CDATA_SECTION_NODE);
    expect(Node.ENTITY_REFERENCE_NODE).toBe(NodeType.ENTITY_REFERENCE_NODE);
    expect(Node.ENTITY_NODE).toBe(NodeType.ENTITY_NODE);
    expect(Node.PROCESSING_INSTRUCTION_NODE).toBe(NodeType.PROCESSING_INSTRUCTION_NODE);
    expect(Node.COMMENT_NODE).toBe(NodeType.COMMENT_NODE);
    expect(Node.DOCUMENT_NODE).toBe(NodeType.DOCUMENT_NODE);
    expect(Node.DOCUMENT_TYPE_NODE).toBe(NodeType.DOCUMENT_TYPE_NODE);
    expect(Node.DOCUMENT_FRAGMENT_NODE).toBe(NodeType.DOCUMENT_FRAGMENT_NODE);
    expect(Node.NOTATION_NODE).toBe(NodeType.NOTATION_NODE);
  });
});
