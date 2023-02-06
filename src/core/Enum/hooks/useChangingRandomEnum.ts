import { useEffect, useState } from "react";
import { EnumResult, RandomComputor } from "../../types";

export const useChangingRandomEnum = (
  computor: RandomComputor<EnumResult>,
  changingTime: number
) => {
  const [value, setValue] = useState(() => computor.makeRandom().result);

  useEffect(() => {
    const timestamp = setInterval(
      () => setValue(computor.makeRandom().result),
      changingTime
    );

    return () => {
      clearInterval(timestamp);
    };
  }, [computor, changingTime]);

  return value;
};
