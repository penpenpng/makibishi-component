import { html, nothing } from "lit";

import { useProfile } from "../hooks/use-profile.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  relays: string[];
  pubkey: string;
  avatarSize: number;
}

export const Avatar = virtual(({ pubkey, relays, avatarSize }: Props) => {
  const profile = useProfile({ pubkey, relays });
  if (!profile?.avatar) {
    return nothing;
  }

  const alt = `Profile page of ${profile.name}.`;

  return html`<a part="avatar-link" href=${profile.page} target="_blank">
    <img
      part="avatar"
      src=${profile.avatar}
      alt=${alt}
      title=${profile.name ?? undefined}
      width=${avatarSize}
      height=${avatarSize}
    />
  </a>`;
});
