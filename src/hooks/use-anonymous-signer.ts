import { schnorr } from "@noble/curves/secp256k1";
import { seckeySigner } from "rx-nostr-crypto";

import { encodeBytes } from "../lib/bech-encode.ts";
import { getGlobalState } from "../lib/global-state.ts";

const generateSeckey = () =>
  encodeBytes("nsec", schnorr.utils.randomPrivateKey());

const getDisposableSeckey = () => {
  const state = getGlobalState();

  return state.disposableSeckey ?? (state.disposableSeckey = generateSeckey());
};

export const useAnonymousSigner = () => {
  return seckeySigner(getDisposableSeckey());
};
