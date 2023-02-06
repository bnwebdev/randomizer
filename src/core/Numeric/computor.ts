import { RandomDescriptionTypes } from "../../types";
import { random } from "../../utils";
import { NumericResult, RandomComputor } from "../types";

export class NumericComputor implements RandomComputor<NumericResult> {
  constructor(private min: number, private max: number) {}

  makeRandom(): NumericResult {
    return {
      type: RandomDescriptionTypes.NUMBER,
      result: random(this.min, this.max),
    };
  }
}
