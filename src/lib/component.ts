import { component as hauntedComponent } from "haunted";

/** Create a public custom element constructor. */
export const component = <P, T>(renderer: (props: P) => T) =>
  hauntedComponent<P & HTMLElement>(renderer, {});
