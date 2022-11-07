import { KeyValuesRandomComputor, KeyValuesRandomDescription } from "../../types";
import { random } from "../../utils";

export const keyValuesComputor: KeyValuesRandomComputor = (randomDescription: KeyValuesRandomDescription) => {
    if (randomDescription.repeated) {
        return randomDescription.keys.map(() => randomDescription.values[random(0, randomDescription.values.length - 1)] || '')
    }

    let fromArray = randomDescription.values.slice()

    return randomDescription.keys.map(() => {
        const idx = random(0, fromArray.length - 1);
        const result = fromArray[idx] || ''

        fromArray = [...fromArray.slice(0, idx), ...fromArray.slice(idx + 1)]

        return result
    })
}
