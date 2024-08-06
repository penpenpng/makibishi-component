import { component, useCallback, useMemo } from "haunted";
import { html, nothing } from "lit";

import { useReactions } from "../hooks/use-reactions.ts";
import { setDefault } from "../lib/config.ts";
import { normalizeUrl } from "../lib/normalize-url.ts";
import { KebabCase } from "../lib/types.ts";
import { ReactionButton } from "../private-components/reaction-button.ts";
import { ReactionCounter } from "../private-components/reaction-counter.ts";
import { ReactionList } from "../private-components/reaction-list.ts";

export interface MakibishiComponentProps {
  /** The target URL to be reacted. If omitted, it will be the current location. */
  url?: string;
  /** The relay URLs separated by semicolon to which reactions are sent. It is recommended to set it, but if you are not sure, you can leave it blank. */
  relays?: string;
  /** An emoji that is sent by users' reaction. It can be an URL for custom reaction. */
  reaction?: string;
  /** Maximum number of reactions displayed without being omitted. */
  displayedReactions?: number;
  /** `limit` filter parameter to be sent to relays. */
  limit?: number;
  /** If true, the reactions will be updated in real-time. For performance reasons, it is off by default. */
  live?: boolean;
  /** If true, the URL will not be normalized automatically. Usually you shouldn't do this. */
  disableUrlNormalization?: boolean;
  /** If true, reaction button is hidden. */
  hideReactionButton?: boolean;
  /** If true, reaction counter is hidden. */
  hideReactionCounter?: boolean;
  /** If true, reaction contents and who made them are hidden. */
  hideReactionList?: boolean;
  hideReactionContent?: boolean;
  hideAvatar?: boolean;
  avatarSize?: number;
  reactionSize?: number;
  customReactionSize?: number;
  /** By default, when the user doesn't have NIP-07 extension, they react as an anonymous. But if the option is enabled, NIP-07 extension is required to send reaction. */
  requireSignExtension?: boolean;
  forceAnonymous?: boolean;
  /** If `reaction` attribute is URL, this is used to the custom reaction's name like `:star:`. Note that no colon is required. */
  customReactionName?: string;
  /** If true, negative reaction ('-') is allowed to be listed. */
  showNegativeReactions?: boolean;
  /** A emoji displayed to express '+'. */
  positive?: string;
  /** A emoji displayed to express '-'. */
  negative?: string;
}

const observedAttributes: Array<KebabCase<keyof MakibishiComponentProps>> = [
  "url",
  "relays",
  "reaction",
  "displayed-reactions",
  "limit",
  "live",
  "disable-url-normalization",
  "hide-reaction-button",
  "hide-reaction-counter",
  "hide-reaction-list",
  "hide-reaction-content",
  "hide-avatar",
  "avatar-size",
  "reaction-size",
  "require-sign-extension",
  "force-anonymous",
  "custom-reaction-name",
  "show-negative-reactions",
  "positive",
  "negative",
];

export const MakibishiComponentElement = component(
  (props: MakibishiComponentProps) => {
    const {
      url: _url,
      relays: _relays,
      reaction,
      displayedReactions,
      limit,
      live,
      disableUrlNormalization,
      hideReactionButton,
      hideReactionCounter,
      hideReactionList,
      hideReactionContent,
      hideAvatar,
      avatarSize,
      reactionSize,
      requireSignExtension,
      forceAnonymous,
      customReactionName,
      showNegativeReactions,
      positive,
      negative,
    } = setDefault(props, {
      url: window.location.href,
      relays: "",
      reaction: "+",
      displayedReactions: 5,
      limit: 100,
      live: false,
      disableUrlNormalization: false,
      hideReactionButton: false,
      hideReactionCounter: false,
      hideReactionList: false,
      hideReactionContent: false,
      hideAvatar: false,
      avatarSize: 32,
      reactionSize: 16,
      requireSignExtension: false,
      forceAnonymous: false,
      customReactionName: "custom_reaction",
      showNegativeReactions: false,
      positive: "👍",
      negative: "👎",
    });

    const relays = useMemo(
      () => _relays.split(";").filter((u) => !!u),
      [_relays],
    );

    const urlPostProcess: (url: string) => string = useCallback(
      (url) =>
        (disableUrlNormalization ? (url: string) => url : normalizeUrl)(url),
      [disableUrlNormalization],
    );
    const url = urlPostProcess(_url);

    const [reactions, pushReaction] = useReactions({
      relays,
      url,
      limit,
      live,
    });

    return html`${hideReactionButton
      ? nothing
      : ReactionButton({
          relays,
          url,
          reaction,
          requireSignExtension,
          forceAnonymous,
          customReactionName,
          urlPostProcess,
          onSuccess: live ? undefined : pushReaction,
        })}${hideReactionCounter
      ? nothing
      : ReactionCounter({ count: reactions.length })}${hideReactionList
      ? nothing
      : ReactionList({
          relays,
          reactions,
          displayedReactions,
          hideReactionContent,
          hideAvatar,
          avatarSize,
          reactionSize,
          showNegativeReactions,
          positive,
          negative,
        })}`;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { observedAttributes: observedAttributes as any },
);
