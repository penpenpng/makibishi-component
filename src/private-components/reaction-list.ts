import { html, nothing } from "lit";

import { Reaction } from "../lib/reaction.ts";
import { virtual } from "../lib/virtual.ts";
import { Avatar } from "./avatar.ts";
import { ReactionContent } from "./reaction-content.ts";

interface Props {
  relays: string[];
  reactions: Reaction[];
  displayedReactions: number;
  hideReactionContent: boolean;
  hideAvatar: boolean;
  avatarSize: number;
  customReactionSize: number;
  showNegativeReactions: boolean;
  positive: string;
  negative: string;
}

export const ReactionList = virtual(
  ({
    relays,
    reactions,
    displayedReactions,
    hideReactionContent,
    hideAvatar,
    customReactionSize,
    avatarSize,
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
              ${hideReactionContent
                ? nothing
                : ReactionContent({
                    content,
                    positive,
                    negative,
                    customReactionSize,
                  })}${hideAvatar
                ? nothing
                : Avatar({ pubkey, relays, avatarSize })}
            </div>`,
      )}`;

    const ellipsis =
      reactions.length > displayedReactions
        ? html`<span part="ellipsis"><slot name="ellipsis">...</slot></span>`
        : nothing;

    return html`<div part="reaction-list">${list}</div>
      ${ellipsis}`;
  },
);
