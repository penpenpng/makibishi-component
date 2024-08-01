import type { OptionalPart, RequiredPart } from "./types.ts";

type FilledConfig<C, D> = RequiredPart<C> & {
  [K in keyof OptionalPart<C>]: K extends keyof D ? NonNullable<C[K]> : C[K];
};

export const setDefault = <
  C,
  const D extends Partial<OptionalPart<C>> = Partial<OptionalPart<C>>,
>(
  config: C,
  defaults: D,
): FilledConfig<C, D> =>
  ({
    ...defaults,
    ...config,
  }) as FilledConfig<C, D>;
