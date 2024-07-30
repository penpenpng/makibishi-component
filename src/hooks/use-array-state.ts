import { useCallback, useRef, useState } from "haunted";

export const useArrayState = <E>(initialValue: E[] = []) => {
  const [array, setArray] = useState<E[]>(initialValue);
  const arrayRef = useRef<E[]>(initialValue);

  const pushValue = useCallback((value: E) => {
    arrayRef.current.push(value);
    setArray(arrayRef.current);
  }, []);

  return [array, pushValue] as const;
};
