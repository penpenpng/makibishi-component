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
): FilledConfig<C, D> => {
  const filled = {
    ...defaults,
    ...config,
  } as FilledConfig<C, D>;

  for (const _key in filled) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key: keyof FilledConfig<C, D> = _key as any;

    if (typeof defaults[key] === "number") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filled[key] = Number(filled[key]) as any;
    } else if (typeof defaults[key] === "boolean") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filled[key] = !!filled[key] as any;
    }
  }

  return filled;
};
