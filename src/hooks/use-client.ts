import { useEffect, useMemo } from "haunted";
import { createRxNostr, type RxNostr } from "rx-nostr";
import { verifier } from "rx-nostr-crypto";

import { getGlobalState } from "../lib/global-state.ts";

const createClient = () => {
  const rxNostr = createRxNostr({
    verifier,
  });

  // Fallback relay
  rxNostr.addDefaultRelays(["wss://nos.lol"]);

  return rxNostr;
};

const getNostrClient = (): Omit<RxNostr, "dispose"> => {
  const state = getGlobalState();
  const clientWithRef =
    state.clientWithRef ??
    (state.clientWithRef = { ref: 0, client: createClient() });

  clientWithRef.ref++;

  return clientWithRef.client;
};

const releaseNostrClient = () => {
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
