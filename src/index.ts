import { component } from "haunted";

import {
  MakibishiConnectionHub,
  type MakibishiConnectionHubProps,
} from "./makibishi-connection-hub.js";
import { MakibishiList, type MakibishiListProps } from "./makibishi-list.js";
import {
  MakibishiWidget,
  type MakibishiWidgetProps,
} from "./makibishi-widget.js";

const MAKIBISHI_WIDGET_ELEMENT_NAME = "makibishi-widget";
const MAKIBISHI_LIST_ELEMENT_NAME = "makibishi-list";
const MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME = "makibishi-connection-hub";

type CustomElement<T> = T & HTMLElement;
export type MakibishiWidgetElement = CustomElement<MakibishiWidgetProps>;
export type MakibishiListElement = CustomElement<MakibishiListProps>;
export type MakibishiConnectionHubElement =
  CustomElement<MakibishiConnectionHubProps>;

if (!customElements.get(MAKIBISHI_WIDGET_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_WIDGET_ELEMENT_NAME,
    component<MakibishiWidgetElement>(MakibishiWidget),
  );
}

if (!customElements.get(MAKIBISHI_LIST_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_LIST_ELEMENT_NAME,
    component<MakibishiListElement>(MakibishiList),
  );
}

if (!customElements.get(MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME,
    component<MakibishiConnectionHubElement>(MakibishiConnectionHub),
  );
}

export type {
  MakibishiConnectionHubProps,
  MakibishiListProps,
  MakibishiWidgetProps,
};

declare global {
  interface HTMLElementTagNameMap {
    [MAKIBISHI_WIDGET_ELEMENT_NAME]: MakibishiWidgetElement;
    [MAKIBISHI_LIST_ELEMENT_NAME]: MakibishiListElement;
    [MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME]: MakibishiConnectionHubElement;
  }
}
