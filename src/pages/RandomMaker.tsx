import { FC, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorPrinter, RandomDescriptionsMaker } from "../components";
import { Random } from "../database";
import { useDexie } from "../hooks";
import { RandomDescription } from "../types";
import { path } from "../utils";

const RandomMaker: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Random>();
  const navigate = useNavigate()

  const [descriptions, setDescriptions] = useState<RandomDescription[]>([]);

  let [itemToSave, setItemToSave] = useState<Random | null>(null);

  useDexie(
    async (db) => {
      if (itemToSave) {
        const item = itemToSave;
        setItemToSave(null);
        setDescriptions([]);
        reset();
        await db.randoms.add(item);
        navigate(path('/'))
      }
    },
    [itemToSave]
  );

  const onSubmit = ({ name }: Random) => {
    setItemToSave({ name, randomDescriptions: descriptions });
  };

  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <ErrorPrinter error={errors.name?.message} />
      <Form ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Row>
            <Col sm={4}>
              <Form.Label>Randomizer Name</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Control
                type="text"
                {...register("name", { required: true })}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit">Create!</Button>
        </Form.Group>
      </Form>
      <p>Before create make your random fields below</p>
      <RandomDescriptionsMaker
        descriptions={descriptions}
        onChange={setDescriptions}
      />
    </>
  );
};

export default RandomMaker;
