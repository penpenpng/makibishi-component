import { html, nothing } from "lit";

import { Reaction } from "../hooks/use-reactions.ts";
import { virtual } from "../lib/virtual.ts";
import { Avatar } from "./avatar.ts";
import { ReactionContent } from "./reaction-content.ts";

interface Props {
  reactions: Reaction[];
  displayedReactions: number;
}

export const ReactionList = virtual(
  ({ reactions, displayedReactions }: Props) => {
    const list = html`${reactions
      .slice(0, displayedReactions)
      .map(
        ({ pubkey, content }) =>
          html`<div part="reaction">
            ${ReactionContent({ content })}, ${Avatar({ pubkey })}
          </div>`,
      )}`;

    const ellipsis =
      reactions.length > displayedReactions
        ? html`<span part="ellipsis">...</span>`
        : nothing;

    return html`<div part="reaction-list">${list}${ellipsis}</div>`;
  },
);
