import { html, nothing } from "lit";

import { useProfile } from "../../hooks/use-profile.ts";
import { virtual } from "../../lib/virtual.ts";

interface Props {
  pubkey: string;
}

export const Avatar = virtual(({ pubkey }: Props) => {
  const profile = useProfile(pubkey);
  if (!profile?.avatar) {
    return nothing;
  }

  const alt = `Profile page of ${profile.name}.`;

  return html`<a part="avatar" href=${profile.page} target="_blank">
    <img src=${profile.avatar} alt=${alt} width="64" height="64" />
  </a>`;
});
