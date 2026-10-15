import { API } from "../../packages/excalidraw/tests/helpers/api";
import type { OrderedExcalidrawElement } from "../../packages/excalidraw/element/types";
import { isSyncableElement } from "../data";

const ordered = (element: ReturnType<typeof API.createElement>) =>
  element as OrderedExcalidrawElement;

// The test factory substitutes placeholder text for an empty string
const emptyText = () =>
  ({
    ...API.createElement({ type: "text" }),
    text: "",
    originalText: "",
  } as OrderedExcalidrawElement);

describe("isSyncableElement", () => {
  it("skips a text element that has no text yet", () => {
    expect(isSyncableElement(emptyText())).toBe(false);
  });

  it("syncs a text element once it has text", () => {
    const element = ordered(
      API.createElement({ type: "text", text: "prompt" }),
    );

    expect(isSyncableElement(element)).toBe(true);
  });

  it("syncs a recently deleted empty text element", () => {
    const element = {
      ...emptyText(),
      isDeleted: true,
      updated: Date.now(),
    } as OrderedExcalidrawElement;

    expect(isSyncableElement(element)).toBe(true);
  });

  it("syncs a shape element", () => {
    const element = ordered(
      API.createElement({ type: "rectangle", width: 10, height: 10 }),
    );

    expect(isSyncableElement(element)).toBe(true);
  });
});
