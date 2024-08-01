import { html } from "lit";

import { useProfile } from "../../hooks/use-profile.ts";
import { virtual } from "../../lib/virtual.ts";

export interface ProfileProps {
  pubkey: string;
}

export const Profile = virtual(({ pubkey }: ProfileProps) => {
  const profile = useProfile(pubkey);

  return html`${profile?.name}`;
});
