import { useState } from "haunted";
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

    const [disabled, setDisabled] = useState(false);

    const performReact = async () => {
      // for aria-disabled
      if (disabled) {
        return;
      }

      setDisabled(true);

      try {
        const { success } = await react({ url, content });
        if (success) {
          // optimistic update
        }
      } finally {
        setDisabled(false);
      }
    };

    return html`<slot
      name="button"
      aria-disabled=${disabled ? "true" : undefined}
      @click=${performReact}
    >
      <button part="button" aria-label=${buttonLabel} ?disabled=${disabled}>
        default
      </button>
    </slot>`;
  },
);
