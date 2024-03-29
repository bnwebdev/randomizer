export enum RandomDescriptionTypes {
  NUMBER = "number",
  ENUMERAL = "enum",
  OBJECT = "object",
  LINK = "link",
  RANDOM_REPEAT_RANDOMS = "randomRepeatRandoms",
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

export interface LinkRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.LINK;
  linkId: string;
}

export interface RandomRepeatRandomsRandomDescription
  extends BaseRandomDescription {
  type: RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS;
  repeatCount: NumberRandomDescription;
  random: RandomDescription;
}

export type RandomDescription =
  | EnumRandomDescription
  | NumberRandomDescription
  | ObjectRandomDescription
  | LinkRandomDescription
  | RandomRepeatRandomsRandomDescription;
