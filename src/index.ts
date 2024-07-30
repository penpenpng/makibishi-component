import { component } from "haunted";

import { Makibishi, type MakibishiProps } from "./makibishi.js";
import {
  MakibishiConnectionHub,
  type MakibishiConnectionHubProps,
} from "./makibishi-connection-hub.js";
import { MakibishiList, type MakibishiListProps } from "./makibishi-list.js";

const MAKIBISHI_ELEMENT_NAME = "makibishi";
const MAKIBISHI_LIST_ELEMENT_NAME = "makibishi-list";
const MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME = "makibishi-connection-hub";

if (!customElements.get(MAKIBISHI_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_ELEMENT_NAME,
    component<MakibishiElement>(Makibishi),
  );
}

if (!customElements.get(MAKIBISHI_LIST_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_LIST_ELEMENT_NAME,
    component<MakibishiElement>(MakibishiList),
  );
}

if (!customElements.get(MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME)) {
  customElements.define(
    MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME,
    component<MakibishiElement>(MakibishiConnectionHub),
  );
}

type CustomElement<T> = T & HTMLElement;
export type MakibishiElement = CustomElement<MakibishiProps>;
export type MakibishiListElement = CustomElement<MakibishiListProps>;
export type MakibishiConnectionHubElement =
  CustomElement<MakibishiConnectionHubProps>;

export type { MakibishiConnectionHubProps, MakibishiListProps, MakibishiProps };

declare global {
  interface HTMLElementTagNameMap {
    [MAKIBISHI_ELEMENT_NAME]: MakibishiElement;
    [MAKIBISHI_LIST_ELEMENT_NAME]: MakibishiListElement;
    [MAKIBISHI_CONNECTION_HUB_ELEMENT_NAME]: MakibishiConnectionHubElement;
  }
}
