import { numberComputor } from "./number";
import { enumComputor } from "./enum";
import { RandomComputor, RandomDescription, RandomDescriptionTypes } from "../types";

const computors: Record<RandomDescriptionTypes, RandomComputor> = {
  [RandomDescriptionTypes.ENUMERAL]: enumComputor as RandomComputor,
  [RandomDescriptionTypes.NUMBER]: numberComputor as RandomComputor,
};

const computeRandomDescription: RandomComputor = (randomDescription: RandomDescription) =>
  computors[randomDescription.type](randomDescription);

export default computeRandomDescription;
