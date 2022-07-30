import {
  EnumRandomDescription,
  NumberRandomDescription,
  RandomDescription,
} from "./RandomDescription";

export type NumberRandomComputor = (randomDescription: NumberRandomDescription) => string;

export type EnumRandomComputor = (randomDescription: EnumRandomDescription) => string;

export type RandomComputor = (randomDescription: RandomDescription) => string;
