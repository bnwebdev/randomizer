import {
  EnumRandomDescription,
  KeyValuesRandomDescription,
  NumberRandomDescription,
  RandomDescription,
} from "./RandomDescription";

export type NumberRandomComputor = (randomDescription: NumberRandomDescription) => string;

export type EnumRandomComputor = (randomDescription: EnumRandomDescription) => string;

export type KeyValuesRandomComputor = (randomDescription: KeyValuesRandomDescription) => string[]

export type RandomComputor = (randomDescription: RandomDescription) => string | string[];
