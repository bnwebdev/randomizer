import Joi from "joi";

import { RandomDescription, SupportedSerializeFormat } from "../types";
import { randomDescriptionValidationSchema } from "../validation";

export const serialize = async (
  type: SupportedSerializeFormat,
  target: RandomDescription
): Promise<string> => {
  switch (type) {
    case SupportedSerializeFormat.JSON:
      return JSON.stringify(target);
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const deserialize = async (
  type: SupportedSerializeFormat,
  target: string
): Promise<RandomDescription[]> => {
  let result: RandomDescription[];

  switch (type) {
    case SupportedSerializeFormat.JSON:
      result = JSON.parse(target);
      break;
    default:
      throw new Error(`Unknown type ${type}`);
  }

  await Joi.array()
    .items(randomDescriptionValidationSchema)
    .validateAsync(result);

  return result;
};

export const getAcceptedFileFormatsByFormat = (
  type: SupportedSerializeFormat
): string[] => {
  switch (type) {
    case SupportedSerializeFormat.JSON:
      return [".json"];
    default:
      throw new Error(`Unknown type ${type}`);
  }
};
