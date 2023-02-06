import { useEffect, useState } from "react";
import { NumericResult, RandomComputor } from "../../types";

export const useChangingRandomNumber = (
  computor: RandomComputor<NumericResult>,
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
