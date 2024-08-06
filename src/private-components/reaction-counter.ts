import { html } from "lit";

import { virtual } from "../lib/virtual.ts";

interface Props {
  count: number;
}

function expr(count: number): string {
  if (count < 1000) {
    return `${count}`;
  } else if (count < 1000 * 1000) {
    return `${Math.round((count / 1000) * 10) / 10}k`;
  } else {
    return `${Math.round((count / (1000 * 1000)) * 10) / 10}M`;
  }
}

export const ReactionCounter = virtual(({ count }: Props) => {
  return html`<span part="counter">${expr(count)}</span>`;
});
