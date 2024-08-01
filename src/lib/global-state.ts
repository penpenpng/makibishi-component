import { type RxNostr } from "rx-nostr";

interface ClientWithRefCount {
  ref: number;
  client: RxNostr;
}

interface MakibishiComponentGlobalState {
  clientWithRef?: ClientWithRefCount;
}

declare global {
  // eslint-disable-next-line no-var
  var __makibishi_component_global_state__:
    | MakibishiComponentGlobalState
    | undefined;
}

export const getGlobalState = (): MakibishiComponentGlobalState =>
  window.__makibishi_component_global_state__ ??
  (window.__makibishi_component_global_state__ = {});
