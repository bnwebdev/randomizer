import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
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

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>Write value to enum</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorPrinter error={errors.value?.message} />
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control {...register("value", { required: true })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Save</Button>
            <Button onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ValueAdderModal;
