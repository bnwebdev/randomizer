export enum RandomDescriptionTypes {
  NUMBER = "number",
  ENUMERAL = "enum",
}

export interface BaseRandomDescription {
  type: RandomDescriptionTypes;
  label: string;
}

export interface EnumRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.ENUMERAL;
  enum: string[]
}

export interface NumberRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.NUMBER;
  min: number
  max: number
}

export type RandomDescription = EnumRandomDescription | NumberRandomDescription;
