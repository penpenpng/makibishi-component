import { html, nothing } from "lit";

import { useProfile } from "../hooks/use-profile.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  relays: string[];
  pubkey: string;
}

export const Avatar = virtual(({ pubkey, relays }: Props) => {
  const profile = useProfile({ pubkey, relays });
  if (!profile?.avatar) {
    return nothing;
  }

  const alt = `Profile page of ${profile.name}.`;

  return html`<a part="avatar" href=${profile.page} target="_blank">
    <img src=${profile.avatar} alt=${alt} width="64" height="64" />
  </a>`;
});
