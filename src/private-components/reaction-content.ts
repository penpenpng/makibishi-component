import { html, nothing } from "lit";

import { ReactionContent as Content } from "../lib/reaction.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  content: Content;
  positive: string;
  negative: string;
}

export const ReactionContent = virtual(
  ({ content, positive, negative }: Props) => {
    switch (content.kind) {
      case "+":
        return html`<span part="reaction-content">${positive}</span>`;
      case "-":
        return html`<span part="reaction-content">${negative}</span>`;
      case "native":
        return html`<span part="reaction-content">${content.emoji}</span>`;
      case "custom":
        return html`<span part="reaction-content">
          <img src=${content.src} alt=${content.name} width="64" height="64" />
        </span>`;

      case "unknown":
        return nothing;
    }
  },
);
