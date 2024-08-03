import { html } from "lit";

import { useReact } from "../hooks/use-react.ts";
import { ReactionContent } from "../hooks/use-reactions.ts";
import { isValidCustomEmoji } from "../lib/custom-emoji.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  url: string;
  reaction: string;
  customReactionName: string;
  urlPostProcess: (url: string) => string;
}

export const ReactionButton = virtual(
  ({ url, reaction, customReactionName, urlPostProcess }: Props) => {
    const isHere = urlPostProcess(window.location.href) === url;
    const buttonLabel = `React to ${isHere ? "this website" : url}.`;

    // TODO: disabling in progress
    const react = useReact();
    const content: ReactionContent = (() => {
      if (reaction === "+") {
        return { kind: "+" };
      } else if (reaction === "-") {
        return { kind: "-" };
      } else if (
        isValidCustomEmoji({ name: customReactionName, src: reaction })
      ) {
        return { kind: "custom", name: customReactionName, src: reaction };
      } else {
        return { kind: "native", emoji: reaction };
      }
    })();

    return html`<slot name="button" @click=${() => react({ url, content })}>
      <button part="button" aria-label=${buttonLabel}>default</button>
    </slot>`;
  },
);
