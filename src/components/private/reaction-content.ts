import { html, nothing } from "lit";

import { ReactionContent as Content } from "../../hooks/use-reactions.ts";
import { virtual } from "../../lib/virtual.ts";

interface Props {
  content: Content;
}

export const ReactionContent = virtual(({ content }: Props) => {
  switch (content.kind) {
    case "custom":
      return html`<span part="reaction-content">
        <img src=${content.src} alt=${content.name} width="64" height="64" />
      </span>`;
    case "native":
      return html`<span part="reaction-content">${content.emoji}</span>`;
    case "unknown":
      return nothing;
  }
});
