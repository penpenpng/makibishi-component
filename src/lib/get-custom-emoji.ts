import * as Nostr from "nostr-typedef";

export interface CustomEmoji {
  name: string;
  src: string;
}

export const getFirstCustomEmoji = (
  event: Nostr.Event,
): CustomEmoji | undefined => {
  const emojiTag = event.tags.find((e) => e[0] === "emoji");

  try {
    const [, name, src] = emojiTag ?? [];

    if (
      typeof name === "string" &&
      isValidCustomEmojiName(name) &&
      typeof src === "string" &&
      maybeUrl(src)
    ) {
      return {
        name,
        src,
      };
    }
  } catch {
    return;
  }
};

function isValidCustomEmojiName(name: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

function maybeUrl(url: string): boolean {
  return url.startsWith("http");
}
