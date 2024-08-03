import { html } from "lit";

import { virtual } from "../lib/virtual.ts";

interface Props {
  count: number;
}

export const ReactionCounter = virtual(({ count }: Props) => {
  return html`<span part="counter">${count}</span>`;
});
