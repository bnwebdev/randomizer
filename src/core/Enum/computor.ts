import { RandomDescriptionTypes } from "../../types";
import { random } from "../../utils";
import { EnumResult, RandomComputor } from "../types";

const onEmpty = () => {
  throw new Error(`Enums must be not empty`);
};

export class EnumComputor implements RandomComputor<EnumResult> {
  constructor(
    private enums: string[],
    private onEmpty?: () => never | string
  ) {}

  makeRandom(): { type: RandomDescriptionTypes.ENUMERAL; result: string } {
    const size = this.enums.length;

    if (size === 0) {
      return {
        type: RandomDescriptionTypes.ENUMERAL,
        result: (this.onEmpty || onEmpty)(),
      };
    }

    return {
      type: RandomDescriptionTypes.ENUMERAL,
      result: this.enums[random(0, size - 1)],
    };
  }
}
