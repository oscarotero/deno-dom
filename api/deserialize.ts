import { parse, parseFrag } from "./parser.ts";
import { CTOR_KEY } from "./constructor-lock.ts";
import { Comment, Node, NodeType, Text } from "./dom/node.ts";
import { DocumentType } from "./dom/document.ts";
import { DocumentFragment } from "./dom/document-fragment.ts";
import { HTMLTemplateElement } from "./dom/elements/html-template-element.ts";
import { Element } from "./dom/element.ts";
import { HTMLElement } from "./dom/elements/html-element.ts";

const validHTMLElementNames = new Map<string, { new (...args: any): Element }>([
  ["html", HTMLElement],
  ["base", HTMLElement],
  ["head", HTMLElement],
  ["link", HTMLElement],
  ["meta", HTMLElement],
  ["style", HTMLElement],
  ["title", HTMLElement],
  ["body", HTMLElement],
  ["address", HTMLElement],
  ["article", HTMLElement],
  ["aside", HTMLElement],
  ["footer", HTMLElement],
  ["header", HTMLElement],
  ["h1", HTMLElement],
  ["h2", HTMLElement],
  ["h3", HTMLElement],
  ["h4", HTMLElement],
  ["h5", HTMLElement],
  ["h6", HTMLElement],
  ["main", HTMLElement],
  ["nav", HTMLElement],
  ["section", HTMLElement],
  ["blockquote", HTMLElement],
  ["dd", HTMLElement],
  ["div", HTMLElement],
  ["dl", HTMLElement],
  ["dt", HTMLElement],
  ["figcaption", HTMLElement],
  ["figure", HTMLElement],
  ["hr", HTMLElement],
  ["li", HTMLElement],
  ["menu", HTMLElement],
  ["ol", HTMLElement],
  ["p", HTMLElement],
  ["pre", HTMLElement],
  ["ul", HTMLElement],
  ["a", HTMLElement],
  ["abbr", HTMLElement],
  ["b", HTMLElement],
  ["bdi", HTMLElement],
  ["bdo", HTMLElement],
  ["br", HTMLElement],
  ["cite", HTMLElement],
  ["code", HTMLElement],
  ["data", HTMLElement],
  ["dfn", HTMLElement],
  ["em", HTMLElement],
  ["i", HTMLElement],
  ["kbd", HTMLElement],
  ["mark", HTMLElement],
  ["q", HTMLElement],
  ["rp", HTMLElement],
  ["rt", HTMLElement],
  ["ruby", HTMLElement],
  ["s", HTMLElement],
  ["samp", HTMLElement],
  ["small", HTMLElement],
  ["span", HTMLElement],
  ["strong", HTMLElement],
  ["sub", HTMLElement],
  ["sup", HTMLElement],
  ["time", HTMLElement],
  ["u", HTMLElement],
  ["var", HTMLElement],
  ["wbr", HTMLElement],
  ["area", HTMLElement],
  ["audio", HTMLElement],
  ["img", HTMLElement],
  ["map", HTMLElement],
  ["track", HTMLElement],
  ["video", HTMLElement],
  ["embed", HTMLElement],
  ["iframe", HTMLElement],
  ["object", HTMLElement],
  ["picture", HTMLElement],
  ["portal", HTMLElement],
  ["source", HTMLElement],
  ["canvas", HTMLElement],
  ["noscript", HTMLElement],
  ["script", HTMLElement],
  ["del", HTMLElement],
  ["ins", HTMLElement],
  ["caption", HTMLElement],
  ["col", HTMLElement],
  ["colgroup", HTMLElement],
  ["table", HTMLElement],
  ["tbody", HTMLElement],
  ["td", HTMLElement],
  ["tfoot", HTMLElement],
  ["th", HTMLElement],
  ["thead", HTMLElement],
  ["tr", HTMLElement],
  ["button", HTMLElement],
  ["datalist", HTMLElement],
  ["fieldset", HTMLElement],
  ["form", HTMLElement],
  ["input", HTMLElement],
  ["label", HTMLElement],
  ["legend", HTMLElement],
  ["optgroup", HTMLElement],
  ["option", HTMLElement],
  ["output", HTMLElement],
  ["progresss", HTMLElement],
  ["select", HTMLElement],
  ["textarea", HTMLElement],
  ["details", HTMLElement],
  ["dialog", HTMLElement],
  ["summary", HTMLElement],
  ["slot", HTMLElement],
  ["template", HTMLTemplateElement],
  ["svg", HTMLElement],
  ["math", HTMLElement],
]);

type DocumentData = [
  nodeType: typeof NodeType.DOCUMENT_TYPE_NODE,
  nodeName: string,
  publicId: string,
  systemId: string,
];
type TextOrCommentData = [
  nodeType: typeof NodeType.TEXT_NODE | typeof NodeType.COMMENT_NODE,
  content: string,
];
type DocumentOrElementData = [
  nodeType: typeof NodeType.DOCUMENT_NODE | typeof NodeType.ELEMENT_NODE,
  nodeName: string,
  attributes: [string, string][],
  ...children: Data[],
];
type HTMLTemplateElementData = [
  nodeType: typeof NodeType.ELEMENT_NODE,
  nodeName: "template",
  attributes: [string, string][],
  children: [
    nodeType: typeof NodeType.DOCUMENT_NODE,
    nodeName: string,
    attributes: [string, string][],
    ...children: Data[],
  ],
];
type Data = DocumentOrElementData | TextOrCommentData | DocumentData | HTMLTemplateElementData;

function isTemplateElement(data: Data): data is HTMLTemplateElementData {
  return data[0] === NodeType.ELEMENT_NODE && data[1].toLowerCase() === "template";
}

export function nodesFromString(html: string): Node {
  const parsed = JSON.parse(parse(html));
  const node = nodeFromArray(parsed, null);

  return node;
}

export function fragmentNodesFromString(html: string, contextLocalName: string): Node {
  const parsed = JSON.parse(parseFrag(html, contextLocalName));
  const node = nodeFromArray(parsed, null);

  return node;
}

function nodeFromArray(
  data: DocumentOrElementData | HTMLTemplateElementData,
  parentNode: Node | null,
): Node {
  const [, nodeName, attributes, ...children] = data;

  if (isTemplateElement(data)) {
    const content = nodeFromArray(data[3], null);
    const contentFrag = new DocumentFragment();
    const fragMutator = contentFrag._getChildNodesMutator();

    for (const child of content.childNodes) {
      fragMutator.push(child);
      child._setParent(contentFrag);
    }

    return new HTMLTemplateElement(parentNode, attributes, CTOR_KEY, contentFrag);
  }

  const El = validHTMLElementNames.get(nodeName) ?? Element;
  const elm = new El(nodeName, parentNode, attributes, CTOR_KEY);
  const childNodes = elm._getChildNodesMutator();
  let childNode: Node;

  for (const child of children) {
    switch (child[0]) {
      case NodeType.TEXT_NODE:
        childNode = new Text(child[1]);
        childNode.parentNode = elm;
        childNodes.push(childNode);
        break;

      case NodeType.COMMENT_NODE:
        childNode = new Comment(child[1]);
        childNode.parentNode = elm;
        childNodes.push(childNode);
        break;

      case NodeType.DOCUMENT_NODE:
      case NodeType.ELEMENT_NODE:
        nodeFromArray(child, elm);
        break;

      case NodeType.DOCUMENT_TYPE_NODE:
        childNode = new DocumentType(child[1], child[2], child[3], CTOR_KEY);
        childNode.parentNode = elm;
        childNodes.push(childNode);
        break;
    }
  }

  return elm;
}
