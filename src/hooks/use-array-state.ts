import { useCallback, useRef, useState } from "haunted";

import { Reaction } from "../lib/reaction.ts";

export const useSortedReactions = () => {
  const arrayRef = useRef<Reaction[]>([]);
  const [array, setArray] = useState<Reaction[]>(arrayRef.current);

  const pushValue = useCallback((value: Reaction) => {
    arrayRef.current.push(value);
    arrayRef.current.sort(
      (a, b) => b.createdAt - a.createdAt || compareString(a.pubkey, b.pubkey),
    );

    setArray(arrayRef.current);
  }, []);

  return [array, pushValue] as const;
};

const compareString = (a: string, b: string) => {
  if (a === b) return 0;
  else if (a < b) return -1;
  else return 1;
};
