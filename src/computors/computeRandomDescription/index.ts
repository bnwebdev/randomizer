import { numberComputor } from "./number";
import { enumComputor } from "./enum";
import { keyValuesComputor } from "./keyValues"
import { RandomComputor, RandomDescription, RandomDescriptionTypes } from "../../types";

const computors: Record<RandomDescriptionTypes, RandomComputor> = {
  [RandomDescriptionTypes.ENUMERAL]: enumComputor as RandomComputor,
  [RandomDescriptionTypes.NUMBER]: numberComputor as RandomComputor,
  [RandomDescriptionTypes.KEY_VALUES]: keyValuesComputor as RandomComputor
};

export const computeRandomDescription: RandomComputor = (randomDescription: RandomDescription) =>
  computors[randomDescription.type](randomDescription);
