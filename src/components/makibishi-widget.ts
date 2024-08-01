import { html } from "lit";

import { useReactions } from "../hooks/use-reactions.ts";
import { component } from "../lib/component.ts";
import { Profile } from "./private/profile.ts";

export interface MakibishiWidgetProps {
  /** The target URL to be reacted. If omitted, it will be the current location. */
  url?: string;
  /** The relays to which reactions are sent. It is recommended to set it, but if you are not sure, you can leave it blank. */
  relays?: string[];
  /** An emoji that is sent by users' reaction. It can be an URL for custom reaction. */
  reaction?: string;
  /** If true, the reactions will be updated in real-time. For performance reasons, it is off by default. */
  live?: boolean;
  /** If true, the URL will not be normalized automatically. Usually you shouldn't do this. */
  disableUrlNormalization?: boolean;
  /** By default, when the user doesn't have NIP-07 extension, they react as an anonymous. But if the option is enabled, NIP-07 extension is required to send reaction. */
  requireNip07Sign?: boolean;
  /** By default, reactions will be sent to relays given by `url` and specified by NIP-07 `getRelays()`. But if the option is enabled, relays by NIP-07 are ignored. */
  ignoreNip07RelayList?: boolean;
  /** If `reaction` attribute is URL, this is used to the custom reaction's name like `:star:`. Note that no colon is required. */
  customReactionName?: string;
}

export type MakibishiWidgetElement = MakibishiWidgetProps & HTMLElement;

export const MakibishiWidgetElement = component(
  (props: MakibishiWidgetProps) => {
    console.log(props);

    const reactions = useReactions();

    return html`<slot name="button" @click=${() => console.log("clicked")}
        ><button>default</button></slot
      >
      ${reactions.map(
        ({ pubkey, content }) =>
          html` <div>${content.kind}, ${Profile({ pubkey })}</div>`,
      )}`;
  },
);
