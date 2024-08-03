import type { RxNostr } from "rx-nostr";

export const getReadRelays = (
  rxNostr: Pick<RxNostr, "getDefaultRelays">,
  additionalRelays: string[],
) => {
  const relays: string[] = [...additionalRelays];

  for (const [relay, { read }] of Object.entries(rxNostr.getDefaultRelays())) {
    if (read) {
      relays.push(relay);
    }
  }

  return relays;
};

export const getWriteRelays = (
  rxNostr: Pick<RxNostr, "getDefaultRelays">,
  additionalRelays: string[],
) => {
  const relays: string[] = [...additionalRelays];

  for (const [relay, { write }] of Object.entries(rxNostr.getDefaultRelays())) {
    if (write) {
      relays.push(relay);
    }
  }

  return relays;
};
