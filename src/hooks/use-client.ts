import { useEffect, useMemo } from "haunted";
import { waitNostr } from "nip07-awaiter";
import { createRxNostr, type RxNostr } from "rx-nostr";
import { verifier } from "rx-nostr-crypto";

import { getGlobalState } from "../lib/global-state.ts";

const isAlive = (client: RxNostr) => {
  const state = getGlobalState();

  return state.clientWithRef?.client === client;
};

const createClient = () => {
  console.log("create");
  const rxNostr = createRxNostr({
    verifier,
  });

  // for debug
  rxNostr.addDefaultRelays(["wss://nos.lol"]);

  waitNostr(10000).then(async (nostr) => {
    if (!isAlive(rxNostr)) {
      return;
    }
    const relays = await nostr?.getRelays?.();

    if (isAlive(rxNostr) && relays) {
      rxNostr.addDefaultRelays(relays);
    }
  });

  return rxNostr;
};

const getNostrClient = (): Omit<RxNostr, "dispose"> => {
  console.log("get");

  const state = getGlobalState();
  const clientWithRef =
    state.clientWithRef ??
    (state.clientWithRef = { ref: 0, client: createClient() });

  clientWithRef.ref++;
  console.log("ref", clientWithRef.ref);

  return clientWithRef.client;
};

const releaseNostrClient = () => {
  console.log("release");

  const state = getGlobalState();
  if (!state.clientWithRef) {
    return;
  }

  state.clientWithRef.ref--;
  if (state.clientWithRef.ref <= 0) {
    const clientWithRef = state.clientWithRef;
    state.clientWithRef = undefined;

    clientWithRef.client.dispose();
  }
};

export const useNostrClient = () => {
  const client = useMemo(getNostrClient, []);

  useEffect(() => {
    return releaseNostrClient;
  }, []);

  return client;
};
