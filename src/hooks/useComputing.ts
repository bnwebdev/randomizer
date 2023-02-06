import { useCallback, useState } from "react";
import { useCounter, useDebounce, useUpdateEffect } from "react-use";

export const useComputing = (
  computingTime: number,
  defaultComputing: boolean = true
) => {
  const [counter, { inc }] = useCounter();
  const [computing, setComputing] = useState(defaultComputing);

  useUpdateEffect(() => {
    setComputing(true);
  }, [counter]);

  useDebounce(() => setComputing(false), computingTime, [counter]);

  const compute = useCallback(() => {
    inc();
  }, [inc]);

  return { computing, compute };
};
