import { useEffect } from "haunted";
import { html } from "lit";
import { createRxBackwardReq, uniq } from "rx-nostr";

import { Profile } from "./components/profile.js";
import { useArrayState } from "./hooks/use-array-state.js";
import { useNostrClient } from "./hooks/use-client.js";

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

export const MakibishiWidget = (props: MakibishiWidgetProps) => {
  const client = useNostrClient();
  const [reactions, pushReaction] = useArrayState<string>();

  useEffect(() => {
    const req = createRxBackwardReq();
    const sub = client
      .use(req)
      .pipe(uniq())
      .subscribe(({ event }) => {
        pushReaction(event.pubkey);
      });

    req.emit({
      kinds: [17],
      "#r": ["https://nikolat.github.io/makibishi-demo/"],
    });
    req.over();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return html`${reactions.map(
    (e) => html`<div>${e}, ${Profile({ pubkey: e })}</div>`,
  )}`;
};
