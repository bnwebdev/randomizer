import { FC } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "../../../hooks";

import { EnumInputProps } from "../../types";

type TempFormInput = {
  temp: string;
};

export const EnumInput: FC<EnumInputProps> = (props) => {
  const { forUseFormName } = props;

  const t = useTranslation();

  const { control, register } = useFormContext<any>();

  const {
    register: tempRegister,
    reset: tempReset,
    getValues: getTempValues,
  } = useForm<TempFormInput>({
    defaultValues: { temp: "" },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${forUseFormName}.enums`,
  });

  return (
    <>
      {!fields.length && t<string>("common.nothingYet")}
      {fields.map(({ id }, index) => (
        <Row key={id}>
          <Col>
            <Form.Group key={id} className="mb-2">
              <Form.Control
                {...register(`${forUseFormName}.enums.${index}.value`)}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="danger" onClick={() => remove(index)}>
              {t<string>("common.delete")}
            </Button>
          </Col>
        </Row>
      ))}
      <Form className="mt-3">
        <Form.Group className="mb-2">
          <Form.Label>{t<string>("randomsMakerPage.enum.newItem")}</Form.Label>
          <Form.Control
            type="text"
            {...tempRegister("temp", { required: true })}
          />
        </Form.Group>
        <Button
          onClick={() => {
            const { temp } = getTempValues();
            append({ value: temp });
            tempReset();
          }}
        >
          {t<string>("randomsMakerPage.enum.addItem")}
        </Button>
      </Form>
    </>
  );
};
