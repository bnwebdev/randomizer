export enum RandomDescriptionTypes {
  NUMBER = "number",
  ENUMERAL = "enum",
  OBJECT = "object",
}

export interface BaseRandomDescription {
  type: RandomDescriptionTypes;
}

export interface EnumRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.ENUMERAL;
  enum: string[];
}

export interface NumberRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.NUMBER;
  min: number;
  max: number;
}

export interface ObjectRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.OBJECT;
  object: Record<string, RandomDescription>;
}

export type RandomDescription =
  | EnumRandomDescription
  | NumberRandomDescription
  | ObjectRandomDescription;
