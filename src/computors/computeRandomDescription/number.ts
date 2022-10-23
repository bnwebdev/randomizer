import { NumberRandomComputor, NumberRandomDescription } from "../../types";
import { random } from "../../utils";

export const numberComputor: NumberRandomComputor = (randomDescription: NumberRandomDescription) =>
  random(randomDescription.min, randomDescription.max).toString();
