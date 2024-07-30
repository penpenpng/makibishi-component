import { html } from "lit";

import { useProfile } from "../hooks/use-profile.js";

export interface ProfileProps {
  pubkey: string;
}

export const Profile = ({ pubkey }: ProfileProps) => {
  const profile = useProfile(pubkey);

  return html`${profile?.name}`;
};
