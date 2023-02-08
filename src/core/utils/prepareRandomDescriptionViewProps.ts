import { RandomDescription, RandomDescriptionTypes } from "../../types";
import {
  EnumViewProps,
  LinkViewProps,
  NumericViewProps,
  ObjectViewProps,
} from "../types";

export const prepareRandomDescriptionViewProps = (
  r: RandomDescription,
  computing: boolean
): ObjectViewProps | EnumViewProps | NumericViewProps | LinkViewProps => {
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
