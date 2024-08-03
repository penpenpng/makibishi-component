import { useEffect, useState } from "haunted";
import * as Nostr from "nostr-typedef";
import { createRxBackwardReq, type EventPacket, latest, now } from "rx-nostr";
import { filter, map } from "rxjs";

import { npubEncode } from "../lib/npub-encode.ts";
import { getReadRelays } from "../lib/target-relays.ts";
import { useNostrClient } from "./use-client.ts";

export interface UserProfile {
  name: string;
  avatar: string | null;
  page: string;
}

export interface UseProfileParams {
  pubkey: string;
  relays: string[];
}

export const useProfile = ({ pubkey, relays }: UseProfileParams) => {
  const client = useNostrClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const req = createRxBackwardReq();
    const sub = client
      .use(req, { relays: getReadRelays(client, relays) })
      .pipe(
        latest(),
        map(toUserProfile),
        filter((e) => e !== null),
      )
      .subscribe(setProfile);

    req.emit({
      kinds: [0],
      authors: [pubkey],
      limit: 1,
      until: now,
    });
    req.over();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return profile;
};

function toUserProfile({ event }: EventPacket): UserProfile | null {
  try {
    const profile: Nostr.Content.Metadata = JSON.parse(event.content);

    return {
      name:
        profile.name ??
        profile.username ??
        profile.display_name ??
        profile.displayName ??
        "anonymous",
      avatar: profile.picture ?? null,
      page: `https://njump.me/${npubEncode(event.pubkey)}`,
    };
  } catch {
    return null;
  }
}
