import { FC, useContext } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "../../../hooks";
import { RandomDescriptionTypes } from "../../../types";
import { RandomComponentFactoryContext } from "../../common/RandomComponentFactoryContext";
import { RootInput } from "../../Root/input";
import { RandomRepeatRandomsInputProps } from "../../types";

export const RandomRepeatRandomsInput: FC<RandomRepeatRandomsInputProps> = ({
  forUseFormName,
}) => {
  const t = useTranslation();

  const { Input } = useContext(RandomComponentFactoryContext);
  const CountRandom = Input[RandomDescriptionTypes.NUMBER];

  const { register, setValue, watch } = useFormContext();
  const randomType = watch(`${forUseFormName}.random.type`);

  return (
    <>
      <CountRandom forUseFormName={`${forUseFormName}.repeatCount`} />
      <Form.Select
        className="my-3"
        {...register(`${forUseFormName}.random.type`, {
          onChange: (e) => {
            const type = e.target.value;

            if (type === RandomDescriptionTypes.ENUMERAL) {
              setValue(`${forUseFormName}.random`, { type, enums: [] });
            } else if (type === RandomDescriptionTypes.LINK) {
              setValue(`${forUseFormName}.random`, { type });
            } else if (type === RandomDescriptionTypes.NUMBER) {
              setValue(`${forUseFormName}.random`, { type, min: 1, max: 8 });
            } else if (type === RandomDescriptionTypes.OBJECT) {
              setValue(`${forUseFormName}.random`, { type, object: [] });
            } else if (type === RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS) {
              setValue(`${forUseFormName}.random`, {
                type,
                random: { type: RandomDescriptionTypes.OBJECT, object: [] },
                repeatCount: {
                  type: RandomDescriptionTypes.NUMBER,
                  min: 1,
                  max: 8,
                },
              });
            }
          },
        })}
      >
        {Object.values(RandomDescriptionTypes).map((type) => (
          <option key={type} value={type}>
            {t<string>(`RandomDescriptionTypes.${type}`)}
          </option>
        ))}
      </Form.Select>
      <RootInput
        type={randomType}
        forUseFormName={`${forUseFormName}.random`}
      />
    </>
  );
};
