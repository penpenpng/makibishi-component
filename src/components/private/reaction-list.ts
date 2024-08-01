import { html } from "lit";

import { Reaction } from "../../hooks/use-reactions.ts";
import { virtual } from "../../lib/virtual.ts";
import { Avatar } from "./avatar.ts";
import { ReactionContent } from "./reaction-content.ts";

interface Props {
  reactions: Reaction[];
}

export const ReactionList = virtual(({ reactions }: Props) => {
  return html` ${reactions.map(
    ({ pubkey, content }) =>
      html`<div part="reaction">
        ${ReactionContent({ content })}, ${Avatar({ pubkey })}
      </div>`,
  )}`;
});
