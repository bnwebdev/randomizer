import { RandomDescription, RandomDescriptionTypes } from "../../types";
import { NumericViewProps, RandomViewProps } from "../types";

export const prepareRandomDescriptionViewProps = (
  r: RandomDescription,
  computing: boolean
): RandomViewProps => {
  if (r.type === RandomDescriptionTypes.ENUMERAL) {
    return {
      enums: r.enum,
      computing,
    };
  }

  if (r.type === RandomDescriptionTypes.NUMBER) {
    return {
      min: r.min,
      max: r.max,
      computing,
    };
  }

  if (r.type === RandomDescriptionTypes.LINK) {
    return {
      linkId: r.linkId,
      computing,
    };
  }

  if (r.type === RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS) {
    return {
      computing,
      random: {
        type: r.random.type,
        props: prepareRandomDescriptionViewProps(r.random, computing),
      },
      repeatCount: prepareRandomDescriptionViewProps(
        r.repeatCount,
        computing
      ) as NumericViewProps,
    };
  }

  return {
    object: Object.fromEntries(
      Object.entries(r.object).map(([key, value]) => [
        key,
        {
          type: value.type,
          props: prepareRandomDescriptionViewProps(value, computing),
        },
      ])
    ),
    computing,
  };
};
