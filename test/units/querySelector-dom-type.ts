import { describe, it, expect } from "vitest";
import { DOMParser } from "../../mod.ts";
import type { HTMLTemplateElement } from "../../api/dom/elements/html-template-element.ts";

Deno.test("querySelector<T> and querySelectorAll<T> typings", () => {
  const doc = new DOMParser().parseFromString(`<template></template>`, "text/html");

  // We don't actually test anything here, we just challenge the TypeScript typings
  doc.querySelector<HTMLTemplateElement>("template")!.content;
});
