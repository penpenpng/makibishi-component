import { useCallback } from "haunted";
import { getNostr } from "nip07-awaiter";
import * as Nostr from "nostr-typedef";
import { nip07Signer } from "rx-nostr";
import { filter } from "rxjs";

import { Reaction, ReactionContent, toReaction } from "../lib/reaction.ts";
import { useNostrClient } from "./use-client.ts";

export interface ReactParams {
  url: string;
  content: ReactionContent;
}

export const useReact = () => {
  const client = useNostrClient();

  return useCallback(
    async ({ url, content }: ReactParams): Promise<Reaction | undefined> => {
      const nostr = getNostr();
      if (content.kind === "unknown" || !nostr) {
        return;
      }

      const params: Nostr.EventParameters = {
        kind: 17,
        content: "",
        tags: [["r", url]],
      };

      switch (content.kind) {
        case "+":
          params.content = "+";
          break;
        case "-":
          params.content = "-";
          break;
        case "native":
          params.content = content.emoji;
          break;
        case "custom":
          params.content = `:${content.name}:`;
          params.tags?.push(["emoji", content.name, content.src]);
          break;
      }

      return Promise.race([
        new Promise<Reaction | undefined>((resolve) => {
          nip07Signer()
            .signEvent(params)
            .then((event) => {
              client
                .send(event)
                .pipe(filter(({ ok }) => ok))
                .subscribe(() => {
                  resolve(toReaction(event));
                });
            })
            .catch(() => {
              resolve(undefined);
            });
        }),
        new Promise<undefined>((resolve) =>
          setTimeout(() => resolve(undefined), 5000),
        ),
      ]);
    },
    [],
  );
};
