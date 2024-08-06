import { html } from "lit";

import { useProfile } from "../hooks/use-profile.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  relays: string[];
  pubkey: string;
  avatarSize: number;
}

export const Avatar = virtual(({ pubkey, relays, avatarSize }: Props) => {
  const profile = useProfile({ pubkey, relays });

  const alt = profile.page
    ? `Profile page of ${profile.name}.`
    : `Avatar of ${profile.name}.`;
  const avatar = html`<img
    part="avatar"
    src=${profile.avatar ?? `https://robohash.org/${pubkey}.png`}
    alt=${alt}
    title=${profile.name ?? undefined}
    width=${avatarSize}
    height=${avatarSize}
  />`;

  if (profile.page) {
    return html`<a part="avatar-link" href=${profile.page} target="_blank"
      >${avatar}</a
    >`;
  } else {
    return html`<a part="avatar-link">${avatar}</a>`;
  }
});
