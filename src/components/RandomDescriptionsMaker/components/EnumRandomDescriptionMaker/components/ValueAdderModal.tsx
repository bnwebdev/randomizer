import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../../../../hooks";
import ErrorPrinter from "../../../../ErrorPrinter";

type Props = {
  show: boolean;
  save: (value: string) => void;
  close: () => void;
};

type FormData = {
  value: string;
};

const ValueAdderModal: FC<Props> = ({ show, close, save }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    save(data.value);
    reset()
    close();
  };

  const t = useTranslation()
  const title: string = t('randomsMakerPage.valueDescriptionsMaker.adderModal.title')
  const valueLabel: string = t('randomsMakerPage.valueDescriptionsMaker.adderModal.valueLabel')
  const okText: string = t('randomsMakerPage.valueDescriptionsMaker.adderModal.okText')
  const cancelText: string = t('randomsMakerPage.valueDescriptionsMaker.adderModal.cancelText')

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorPrinter error={errors.value?.message} />
            <Form.Group>
              <Form.Label>{valueLabel}</Form.Label>
              <Form.Control {...register("value", { required: true })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">{okText}</Button>
            <Button variant="secondary" onClick={close}>{cancelText}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ValueAdderModal;
