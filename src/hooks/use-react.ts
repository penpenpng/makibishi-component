import { useCallback } from "haunted";
import { getNostr } from "nip07-awaiter";
import * as Nostr from "nostr-typedef";
import { filter } from "rxjs";

import { useNostrClient } from "./use-client.ts";
import { ReactionContent } from "./use-reactions.ts";

export interface ReactParams {
  url: string;
  content: ReactionContent;
}

export const useReact = () => {
  const client = useNostrClient();

  return useCallback(
    async ({ url, content }: ReactParams): Promise<{ success: boolean }> => {
      const nostr = getNostr();
      if (content.kind === "unknown" || !nostr) {
        return { success: false };
      }

      const event: Nostr.EventParameters = {
        kind: 17,
        content: "",
        tags: [["r", url]],
      };

      switch (content.kind) {
        case "+":
          event.content = "+";
          break;
        case "-":
          event.content = "-";
          break;
        case "native":
          event.content = content.emoji;
          break;
        case "custom":
          event.content = `:${content.name}:`;
          event.tags?.push(["emoji", content.name, content.src]);
          break;
      }

      const success = await Promise.race([
        new Promise<true>((resolve) => {
          client
            .send(event)
            .pipe(filter(({ ok }) => ok))
            .subscribe(() => {
              resolve(true);
            });
        }),
        new Promise<false>((resolve) => setTimeout(() => resolve(false), 5000)),
      ]);

      return { success };
    },
    [],
  );
};
