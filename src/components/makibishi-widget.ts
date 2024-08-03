import { component, useCallback } from "haunted";
import { html } from "lit";

import { useReactions } from "../hooks/use-reactions.ts";
import { setDefault } from "../lib/config.ts";
import { normalizeUrl } from "../lib/normalize-url.ts";
import { KebabCase } from "../lib/types.ts";
import { ReactionButton } from "../private-components/reaction-button.ts";
import { ReactionCounter } from "../private-components/reaction-counter.ts";
import { ReactionList } from "../private-components/reaction-list.ts";

export interface MakibishiWidgetProps {
  /** The target URL to be reacted. If omitted, it will be the current location. */
  url?: string;
  /** The relays to which reactions are sent. It is recommended to set it, but if you are not sure, you can leave it blank. */
  // relays?: string[];
  /** An emoji that is sent by users' reaction. It can be an URL for custom reaction. */
  reaction?: string;
  /** Maximum number of reactions displayed without being omitted. */
  displayedReactions?: number;
  /** `limit` filter parameter to be sent to relays. */
  limit?: number;
  /** If true, the reactions will be updated in real-time. For performance reasons, it is off by default. */
  live?: boolean;
  /** If true, the URL will not be normalized automatically. Usually you shouldn't do this. */
  disableUrlNormalization?: boolean;
  /** By default, when the user doesn't have NIP-07 extension, they react as an anonymous. But if the option is enabled, NIP-07 extension is required to send reaction. */
  // requireNip07Sign?: boolean;
  /** By default, reactions will be sent to relays given by `url` and specified by NIP-07 `getRelays()`. But if the option is enabled, relays by NIP-07 are ignored. */
  // ignoreNip07RelayList?: boolean;
  /** If `reaction` attribute is URL, this is used to the custom reaction's name like `:star:`. Note that no colon is required. */
  customReactionName?: string;
}

const observedAttributes: Array<KebabCase<keyof MakibishiWidgetProps>> = [
  "url",
  "reaction",
  "displayed-reactions",
  "limit",
  "live",
  "disable-url-normalization",
  "custom-reaction-name",
];

export const MakibishiWidgetElement = component(
  (props: MakibishiWidgetProps) => {
    const {
      url: _url,
      reaction,
      displayedReactions,
      limit,
      live,
      disableUrlNormalization,
      customReactionName,
    } = setDefault(props, {
      url: window.location.href,
      reaction: "+",
      displayedReactions: 5,
      limit: 100,
      live: false,
      disableUrlNormalization: false,
      customReactionName: "custom_reaction",
    });

    const urlPostProcess: (url: string) => string = useCallback(
      (url) =>
        (disableUrlNormalization ? (url: string) => url : normalizeUrl)(url),
      [disableUrlNormalization],
    );
    const url = urlPostProcess(_url);

    const reactions = useReactions({ url, limit, live });

    return html`${ReactionButton({
      url,
      reaction,
      customReactionName,
      urlPostProcess,
    })}
    ${ReactionCounter({ count: reactions.length })}
    ${ReactionList({
      reactions,
      displayedReactions,
    })}`;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { observedAttributes: observedAttributes as any },
);
