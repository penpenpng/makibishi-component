import { html, nothing } from "lit";

import { Reaction } from "../lib/reaction.ts";
import { virtual } from "../lib/virtual.ts";
import { Avatar } from "./avatar.ts";
import { ReactionContent } from "./reaction-content.ts";

interface Props {
  reactions: Reaction[];
  displayedReactions: number;
  showNegativeReactions: boolean;
  positive: string;
  negative: string;
}

export const ReactionList = virtual(
  ({
    reactions,
    displayedReactions,
    showNegativeReactions,
    positive,
    negative,
  }: Props) => {
    const list = html`${reactions
      .slice(0, displayedReactions)
      .map(({ pubkey, content }) =>
        !showNegativeReactions && content.kind === "-"
          ? nothing
          : html`<div part="reaction">
              ${ReactionContent({ content, positive, negative })},
              ${Avatar({ pubkey })}
            </div>`,
      )}`;

    const ellipsis =
      reactions.length > displayedReactions
        ? html`<span part="ellipsis">...</span>`
        : nothing;

    return html`<div part="reaction-list">${list}${ellipsis}</div>`;
  },
);
