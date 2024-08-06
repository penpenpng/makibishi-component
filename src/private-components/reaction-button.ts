import { useState } from "haunted";
import { html } from "lit";

import { useReact } from "../hooks/use-react.ts";
import { useSignExtension } from "../hooks/use-sign-extension.ts";
import { isValidCustomEmoji } from "../lib/custom-emoji.ts";
import { Reaction, ReactionContent } from "../lib/reaction.ts";
import { virtual } from "../lib/virtual.ts";

interface Props {
  relays: string[];
  url: string;
  reaction: string;
  customReactionName: string;
  requireSignExtension: boolean;
  forceAnonymous: boolean;
  urlPostProcess: (url: string) => string;
  onSuccess?: (reaction: Reaction) => void;
}

export const ReactionButton = virtual(
  ({
    relays,
    url,
    reaction,
    customReactionName,
    requireSignExtension,
    forceAnonymous,
    urlPostProcess,
    onSuccess,
  }: Props) => {
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

    const extension = useSignExtension();
    const [processing, setProcessing] = useState(false);
    const disabled = processing || (requireSignExtension && !extension);

    const performReact = async () => {
      if (disabled) {
        return;
      }

      setProcessing(true);

      try {
        const reaction = await react({
          relays,
          url,
          content,
          requireSignExtension,
          forceAnonymous,
        });
        if (reaction) {
          onSuccess?.(reaction);
        }
      } finally {
        setProcessing(false);
      }
    };

    return html`<button
      part="button"
      aria-label=${buttonLabel}
      ?disabled=${disabled}
      @click=${performReact}
    >
      <slot name="button">👍</slot>
    </button>`;
  },
);
