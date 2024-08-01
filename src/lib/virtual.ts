import { virtual as hauntedVirtual } from "haunted";

/** Create a private custom element constructor. */
export const virtual = <F>(renderer: F): F => hauntedVirtual(renderer);
