import { FC, ReactNode, useContext, useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "../../../hooks";
import { RandomDescriptionTypes } from "../../../types";
import { RandomComponentFactoryContext } from "../../common/RandomComponentFactoryContext";
import { ObjectInputProps } from "../../types";

export const ObjectInput: FC<ObjectInputProps> = (props) => {
  const { forUseFormName } = props;

  const t = useTranslation();
  const { control } = useFormContext();

  const { Input } = useContext(RandomComponentFactoryContext);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${forUseFormName}.object`,
  });

  const [show, setShow] = useState(false);

  const components: Array<[string, ReactNode]> = useMemo(() => {
    return fields.map((field, index) => {
      const { id, name, type } = field as {
        id: string;
        name: string;
        type: RandomDescriptionTypes;
      };
      const InputComponent = Input[type];

      return [
        name,
        <Controller
          key={id}
          control={control}
          name={`${forUseFormName}.object.${index}.props`}
          render={() => (
            <InputComponent
              forUseFormName={`${forUseFormName}.object.${index}.props`}
            />
          )}
        />,
      ];
    });
  }, [Input, control, forUseFormName, fields]);

  const { register, getValues: getTempValues } = useForm<{
    name: string;
    type: RandomDescriptionTypes;
  }>({
    defaultValues: { name: "", type: RandomDescriptionTypes.NUMBER },
  });

  const title = t("randomsMakerPage.typeChooserModal.title");
  const typeLabel = t("randomsMakerPage.typeChooserModal.typeLabel");
  const nameLabel = t("randomsMakerPage.typeChooserModal.nameLabel");
  const okText = t("randomsMakerPage.typeChooserModal.okText");
  const cancelText = t("randomsMakerPage.typeChooserModal.cancelText");

  return (
    <>
      <p className="h4">
        {!components.length && t<string>("common.nothingYet")}
      </p>
      {components.map(([name, children], idx) => (
        <Row key={name + idx} className="border-bottom pb-3">
          <Col xs={2} className="h2 d-flex align-items-center">
            {name}
          </Col>
          <Col xs={8}>{children}</Col>
          <Col xs={2} className="d-flex align-items-center">
            <Button
              style={{ height: "100%" }}
              variant="danger"
              onClick={() => remove(idx)}
            >
              {t<string>("common.delete")}
            </Button>
          </Col>
        </Row>
      ))}

      <Button onClick={() => setShow(true)} className="mt-2">
        {t<string>("randomsMakerPage.object.addItem")}
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>{typeLabel}</Form.Label>
              <Form.Select {...register("type", { required: true })}>
                {Object.values(RandomDescriptionTypes).map((key) => (
                  <option value={key} key={key}>
                    {t(`RandomDescriptionTypes.${key}`) as string}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>{nameLabel}</Form.Label>
              <Form.Control {...register("name", { required: true })} />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                const { type, name } = getTempValues();

                if (!type || !name) {
                  return;
                }

                if (type === RandomDescriptionTypes.ENUMERAL) {
                  append({
                    type,
                    name,
                    props: { enums: [] },
                  });
                } else if (type === RandomDescriptionTypes.NUMBER) {
                  append({
                    type,
                    name,
                    props: { min: 0, max: 100 },
                  });
                } else if (type === RandomDescriptionTypes.OBJECT) {
                  append({
                    type,
                    name,
                    props: { object: [] },
                  });
                } else {
                  throw new Error(`Unknown type`);
                }
                setShow(false);
              }}
            >
              {okText}
            </Button>
            <Button variant="danger" onClick={() => setShow(false)}>
              {cancelText}
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};
