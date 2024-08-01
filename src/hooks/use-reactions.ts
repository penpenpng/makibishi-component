import { useEffect } from "haunted";
import { createRxBackwardReq, type EventPacket, now, uniq } from "rx-nostr";

import { getFirstCustomEmoji } from "../lib/get-custom-emoji.ts";
import { mapAsync } from "../operators/mapAsync.ts";
import { useArrayState } from "./use-array-state.ts";
import { useNostrClient } from "./use-client.ts";

export interface Reaction {
  pubkey: string;
  content: ReactionContent;
}

export type ReactionContent =
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

export const useReactions = () => {
  const client = useNostrClient();
  const [reactions, pushReaction] = useArrayState<Reaction>();

  useEffect(() => {
    const req = createRxBackwardReq();
    const sub = client
      .use(req)
      .pipe(uniq(), mapAsync(toReaction))
      .subscribe(pushReaction);

    req.emit({
      kinds: [17],
      "#r": ["https://nikolat.github.io/makibishi-demo/"],
      until: now,
    });
    req.over();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return reactions;
};

async function toReaction({ event }: EventPacket): Promise<Reaction> {
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
