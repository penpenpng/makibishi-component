import { useCallback } from "haunted";
import { getNostr } from "nip07-awaiter";
import * as Nostr from "nostr-typedef";
import { type EventSigner, nip07Signer } from "rx-nostr";
import { filter } from "rxjs";

import { Reaction, ReactionContent, toReaction } from "../lib/reaction.ts";
import { getWriteRelays } from "../lib/target-relays.ts";
import { useAnonymousSigner } from "./use-anonymous-signer.ts";
import { useNostrClient } from "./use-client.ts";

export interface ReactParams {
  relays: string[];
  url: string;
  content: ReactionContent;
  requireSignExtension: boolean;
}

export const useReact = () => {
  const client = useNostrClient();
  const anonymousSigner = useAnonymousSigner();
  const extensionSigner = nip07Signer();

  return useCallback(
    async ({
      url,
      content,
      relays,
      requireSignExtension,
    }: ReactParams): Promise<Reaction | undefined> => {
      if (content.kind === "unknown") {
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

      const sendReactionWith = (signer: EventSigner) =>
        new Promise<Reaction | undefined>((resolve) => {
          signer
            .signEvent(params)
            .then((event) => {
              client
                .send(event, { relays: getWriteRelays(client, relays) })
                .pipe(filter(({ ok }) => ok))
                .subscribe(() => {
                  resolve(toReaction(event));
                });
            })
            .catch(() => {
              resolve(undefined);
            });
        });

      if (requireSignExtension) {
        if (!getNostr()) {
          // No extension.
          return;
        }

        return Promise.race([
          sendReactionWith(extensionSigner),
          new Promise<undefined>((resolve) =>
            setTimeout(() => resolve(undefined), 5000),
          ),
        ]);
      } else {
        if (getNostr()) {
          return sendReactionWith(extensionSigner);
        } else {
          return sendReactionWith(anonymousSigner);
        }
      }
    },
    [],
  );
};
