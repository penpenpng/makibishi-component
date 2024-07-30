import { useMemo } from "haunted";
import { waitNostr } from "nip07-awaiter";
import { createRxNostr } from "rx-nostr";
import { verifier } from "rx-nostr-crypto";

const rxNostr = createRxNostr({
  verifier,
});

rxNostr.addDefaultRelays(["wss://nos.lol"]);

waitNostr(10000).then(async (nostr) => {
  const relays = await nostr?.getRelays?.();

  if (relays) {
    rxNostr.addDefaultRelays(relays);
    console.log(relays);
  }
});

export const useNostrClient = () => {
  return useMemo(() => rxNostr, []);
};
