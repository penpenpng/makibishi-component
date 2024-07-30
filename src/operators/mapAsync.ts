import { from, mergeMap, type OperatorFunction } from "rxjs";

export const mapAsync = <T, R>(
  f: (x: T) => Promise<R>,
): OperatorFunction<T, R> => mergeMap((x) => from(f(x)));
