import { RandomDescriptionTypes } from "../../types";
import { ComputorResult, ObjectResult, RandomComputor } from "../types";

export class ObjectComputor implements RandomComputor<ObjectResult> {
  constructor(private obj: Record<string, RandomComputor<ComputorResult>>) {}

  makeRandom(): ObjectResult {
    return {
      type: RandomDescriptionTypes.OBJECT,
      result: Object.fromEntries(
        Object.entries(this.obj).map(([key, randomComputor]) => [
          key,
          randomComputor.makeRandom(),
        ])
      ),
    };
  }
}
