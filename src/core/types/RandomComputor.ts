import { RandomDescriptionTypes } from "../../types";

interface BaseResult<Result> {
  type: RandomDescriptionTypes;
  result: Result;
}

export interface NumericResult extends BaseResult<number> {
  type: RandomDescriptionTypes.NUMBER;
}

export interface EnumResult extends BaseResult<string> {
  type: RandomDescriptionTypes.ENUMERAL;
}

export interface ObjectResult
  extends BaseResult<Record<string, ComputorResult>> {
  type: RandomDescriptionTypes.OBJECT;
}

export type ComputorResult = NumericResult | EnumResult | ObjectResult;

export type RandomComputor<R extends ComputorResult> = {
  makeRandom(): R;
};
