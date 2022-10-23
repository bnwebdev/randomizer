import { EnumRandomComputor, EnumRandomDescription } from "../../types";
import { random } from "../../utils";

export const enumComputor: EnumRandomComputor = (randomDescription: EnumRandomDescription) =>
  randomDescription.enum[random(0, randomDescription.enum.length - 1)] || '';
