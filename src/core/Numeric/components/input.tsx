import { FC } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useTranslation } from "../../../hooks";
import { NumericInputProps } from "../../types";

export const NumericInput: FC<NumericInputProps> = (props) => {
  const { forUseFormName } = props;

  const t = useTranslation();
  const { register } = useFormContext();

  return (
    <>
      <Form.Group>
        <Form.Label>
          {t<string>("randomsMakerPage.numberDescriptionsMaker.minLabel")}
        </Form.Label>
        <Form.Control
          type="number"
          {...register(`${forUseFormName}.min`, { required: true })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {t<string>("randomsMakerPage.numberDescriptionsMaker.maxLabel")}
        </Form.Label>
        <Form.Control
          type="number"
          {...register(`${forUseFormName}.max`, { required: true })}
        />
      </Form.Group>
    </>
  );
};
