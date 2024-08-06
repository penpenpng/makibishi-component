import { html, nothing } from "lit";

import { ReactionContent as Content } from "../lib/reaction.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  content: Content;
  positive: string;
  negative: string;
  reactionSize: number;
}

export const ReactionContent = virtual(
  ({ content, positive, negative, reactionSize }: Props) => {
    switch (content.kind) {
      case "+":
        return html`<span part="reaction-content">${positive}</span>`;
      case "-":
        return html`<span part="reaction-content">${negative}</span>`;
      case "native":
        return html`<span part="reaction-content">${content.emoji}</span>`;
      case "custom":
        return html`<span part="reaction-content"
          ><img
            part="custom-reaction-content-img"
            src=${content.src}
            title=${content.name}
            alt=${content.name}
            width=${reactionSize}
            height=${reactionSize}
        /></span>`;

      case "unknown":
        return nothing;
    }
  },
);
