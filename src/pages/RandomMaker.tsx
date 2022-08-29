import { FC, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorPrinter, RandomDescriptionsMaker } from "../components";
import { Random } from "../database";
import { useDexie, useTranslation } from "../hooks";
import { RandomDescription } from "../types";

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
        navigate('/')
      }
    },
    [itemToSave]
  );

  const onSubmit = ({ name }: Random) => {
    setItemToSave({ name, randomDescriptions: descriptions });
  };

  const ref = useRef<HTMLFormElement>(null);

  const t = useTranslation()

  const nameLabel = t('randomsMakerPage.form.name')
  const okText = t('randomsMakerPage.form.okText')
  const tipsBeforeCreate = t('randomsMakerPage.form.tipsBeforeCreate')

  return (
    <>
      <ErrorPrinter error={errors.name?.message} />
      <Form ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
              <Form.Label>{nameLabel}</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: true })}
              />
        </Form.Group>
      </Form>
      { descriptions.length ? null : <p>{tipsBeforeCreate}</p>}
      <RandomDescriptionsMaker
        descriptions={descriptions}
        onChange={setDescriptions}
      />
      <br />
      <Button className="mt-2" onClick={() => ref.current?.requestSubmit()}>{okText}</Button>
    </>
  );
};

export default RandomMaker;
