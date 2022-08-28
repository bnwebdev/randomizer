import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../../../../hooks";
import ErrorPrinter from "../../../../ErrorPrinter";

type Props = {
  show: boolean;
  save: (value: string) => void;
  remove: () => void;
  close: () => void;
  value: string
};

type FormData = {
  value: string;
};

const ValueChangerModal: FC<Props> = ({ show, close, save, remove, value }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      value,
    },
  });

  const onSubmit = (data: FormData) => {
    save(data.value);
    close();
  };

  const removeHandler = () => {
    remove()
    close()
  }

  const t = useTranslation()
  const title: string = t('randomsMakerPage.valueDescriptionsMaker.changerModal.title')
  const valueLabel: string = t('randomsMakerPage.valueDescriptionsMaker.changerModal.valueLabel')
  const okText: string = t('randomsMakerPage.valueDescriptionsMaker.changerModal.okText')
  const cancelText: string = t('randomsMakerPage.valueDescriptionsMaker.changerModal.cancelText')
  const removeText: string = t('randomsMakerPage.valueDescriptionsMaker.changerModal.removeText')

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
            <Button variant="danger" onClick={removeHandler}>{removeText}</Button>
            <Button variant="secondary" onClick={close}>{cancelText}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ValueChangerModal;
