export enum RandomDescriptionTypes {
  NUMBER = "number",
  ENUMERAL = "enum",
  KEY_VALUES = "key-values"
}

export interface BaseRandomDescription {
  type: RandomDescriptionTypes;
  label: string;
}

export interface EnumRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.ENUMERAL;
  enum: string[]
}

export interface KeyValuesRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.KEY_VALUES;
  keys: string[]
  values: string[]
  repeated: boolean
}

export interface NumberRandomDescription extends BaseRandomDescription {
  type: RandomDescriptionTypes.NUMBER;
  min: number
  max: number
}

export type RandomDescription = EnumRandomDescription | NumberRandomDescription | KeyValuesRandomDescription;
