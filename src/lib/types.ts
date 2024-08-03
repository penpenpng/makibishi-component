export type ValueOf<T> = T[keyof T];

export type OptionalPart<T> = {
  [K in keyof T as T extends Record<K, T[K]> ? never : K]-?: T[K];
};

export type RequiredPart<T> = {
  [K in keyof T as T extends Record<K, T[K]> ? K : never]-?: T[K];
};

export type KebabCase<T extends string> = T extends `${infer Head}${infer Tail}`
  ? Head extends Uppercase<Head>
    ? `-${Lowercase<Head>}${KebabCase<Tail>}`
    : `${Head}${KebabCase<Tail>}`
  : T;
