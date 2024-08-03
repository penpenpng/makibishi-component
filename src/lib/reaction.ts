import * as Nostr from "nostr-typedef";

import { getFirstCustomEmoji } from "./custom-emoji.ts";

export interface Reaction {
  pubkey: string;
  content: ReactionContent;
  createdAt: number;
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

export async function toReaction(event: Nostr.Event): Promise<Reaction> {
  const rest = {
    pubkey: event.pubkey,
    createdAt: event.created_at,
  };

  try {
    const customEmoji = getFirstCustomEmoji(event);
    if (customEmoji && (await isValidImage(customEmoji.src))) {
      return {
        ...rest,
        content: {
          kind: "custom",
          ...customEmoji,
        },
      };
    } else if (event.content === "+") {
      return {
        ...rest,
        content: {
          kind: "+",
        },
      };
    } else if (event.content === "-") {
      return {
        ...rest,
        content: {
          kind: "-",
        },
      };
    } else {
      return {
        ...rest,
        content: {
          kind: "native",
          // I know only the first latter should be used, but emoji is too complicated :(
          emoji: event.content,
        },
      };
    }
  } catch {
    return {
      ...rest,
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
