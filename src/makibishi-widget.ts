import {
  MakibishiWidgetElement,
  type MakibishiWidgetProps,
} from "./components/index.ts";

const ELEMENT_NAME = "makibishi-widget";

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, MakibishiWidgetElement);
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: MakibishiWidgetProps & HTMLElement;
  }
}
