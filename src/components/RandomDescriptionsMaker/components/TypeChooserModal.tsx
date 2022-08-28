import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../../hooks";
import { RandomDescriptionTypes } from "../../../types";
import ErrorPrinter from "../../ErrorPrinter";

type FormData = {
  type: RandomDescriptionTypes;
  label: string;
};

type Props = {
  create: (data: FormData) => void;
  show: boolean;
  close: () => void;
};

const TypeChooserModal: FC<Props> = ({ show, close, create }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const handleClose = () => {
    close();
    reset();
  };
  const handleCreate = (data: FormData) => {
    create(data);
    handleClose();
  };

  const t = useTranslation()

  const title = t('randomsMakerPage.typeChooserModal.title')
  const nameLabel = t('randomsMakerPage.typeChooserModal.nameLabel')
  const typeLabel = t('randomsMakerPage.typeChooserModal.typeLabel')
  const okText = t('randomsMakerPage.typeChooserModal.okText')
  const cancelText = t('randomsMakerPage.typeChooserModal.cancelText')


  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(handleCreate)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorPrinter error={errors.label?.message} />
          <Form.Group className="mb-3">
            <Form.Label>{nameLabel}</Form.Label>
            <Form.Control
              type="text"
              {...register("label", { required: true })}
            />
          </Form.Group>
          <ErrorPrinter error={errors.type?.message} />
          <Form.Group className="mb-3">
            <Form.Label>{typeLabel}</Form.Label>
            <Form.Select {...register("type", { required: true })}>
              {[
                RandomDescriptionTypes.ENUMERAL,
                RandomDescriptionTypes.NUMBER,
              ].map((key) => (
                <option value={key} key={key}>
                  {t(`RandomDescriptionTypes.${key}`) as string}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            {okText}
          </Button>
          <Button onClick={handleClose} variant="danger">
            {cancelText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TypeChooserModal