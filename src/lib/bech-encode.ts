/**
 * nostr-tools
 *
 * @author fiatjaf
 * @license Unlicense
 * @link https://github.com/nbd-wtf/nostr-tools/blob/7a9d4326862926a2da7277d5cb01d4d559a01bc2/nip19.ts
 */

import { hexToBytes } from "@noble/hashes/utils";
import { bech32 } from "@scure/base";

const Bech32MaxSize = 5000;

export function encode<Prefix extends "npub" | "nsec">(
  prefix: Prefix,
  hex: string,
): `${Prefix}1${string}` {
  return encodeBytes(prefix, hexToBytes(hex));
}

export function encodeBytes<Prefix extends string>(
  prefix: Prefix,
  bytes: Uint8Array,
): `${Prefix}1${string}` {
  return encodeBech32(prefix, bytes);
}

function encodeBech32<Prefix extends string>(
  prefix: Prefix,
  data: Uint8Array,
): `${Prefix}1${string}` {
  const words = bech32.toWords(data);
  return bech32.encode(prefix, words, Bech32MaxSize) as `${Prefix}1${string}`;
}
