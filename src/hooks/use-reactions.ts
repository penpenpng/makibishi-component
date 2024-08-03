import { useEffect } from "haunted";
import { createRxBackwardReq, createRxForwardReq, now, uniq } from "rx-nostr";

import { Reaction, toReaction } from "../lib/reaction.ts";
import { mapAsync } from "../operators/mapAsync.ts";
import { useArrayState } from "./use-array-state.ts";
import { useNostrClient } from "./use-client.ts";

export interface UseReactionParams {
  url: string;
  limit: number;
  live: boolean;
}

export const useReactions = ({ url, limit, live }: UseReactionParams) => {
  const client = useNostrClient();
  const [reactions, pushReaction] = useArrayState<Reaction>();

  useEffect(() => {
    const req = live ? createRxForwardReq() : createRxBackwardReq();
    const sub = client
      .use(req)
      .pipe(
        uniq(),
        mapAsync(({ event }) => toReaction(event)),
      )
      .subscribe(pushReaction);

    req.emit({
      kinds: [17],
      "#r": [url],
      until: live ? undefined : now,
      limit,
    });
    if ("over" in req) {
      req.over();
    }

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [reactions, pushReaction] as const;
};
