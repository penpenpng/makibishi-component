import {
  MakibishiComponentElement,
  type MakibishiComponentProps,
} from "./components/index.ts";

const ELEMENT_NAME = "makibishi-component";

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, MakibishiComponentElement);
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: MakibishiComponentProps & HTMLElement;
  }
}
