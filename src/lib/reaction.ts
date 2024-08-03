import { type EventPacket } from "rx-nostr";

import { getFirstCustomEmoji } from "./custom-emoji.ts";

export interface Reaction {
  pubkey: string;
  content: ReactionContent;
}

export type ReactionContent =
  | {
      kind: "+";
    }
  | {
      kind: "-";
    }
  | {
      kind: "native";
      emoji: string;
    }
  | {
      kind: "custom";
      name: string;
      src: string;
    }
  | {
      kind: "unknown";
    };

export async function toReaction({ event }: EventPacket): Promise<Reaction> {
  const pubkey = {
    pubkey: event.pubkey,
  };

  try {
    const customEmoji = getFirstCustomEmoji(event);
    if (customEmoji && (await isValidImage(customEmoji.src))) {
      return {
        ...pubkey,
        content: {
          kind: "custom",
          ...customEmoji,
        },
      };
    } else {
      return {
        ...pubkey,
        content: {
          kind: "native",
          // I know only the first latter should be used, but emoji is too complicated :(
          emoji: event.content,
        },
      };
    }
  } catch {
    return {
      ...pubkey,
      content: { kind: "unknown" },
    };
  }
}

async function isValidImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(false);
    }, 5000);
    const clear = () => clearTimeout(timer);

    const img = new Image();
    img.onload = () => {
      resolve(true);
      clear();
    };
    img.onerror = () => {
      resolve(false);
      clear();
    };
    img.src = src;
  });
}
