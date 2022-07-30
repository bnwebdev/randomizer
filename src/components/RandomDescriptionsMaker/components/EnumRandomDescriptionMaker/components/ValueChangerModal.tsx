import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
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

  return (
    <>
      <Modal show={show} onHide={close}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>Change or remove the value</Modal.Title>
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
            <Button onClick={removeHandler}>Remove</Button>
            <Button onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ValueChangerModal;
