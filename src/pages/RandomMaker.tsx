import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorPrinter } from "../components";
import { randomDescriptionValidationSchema } from "../validation";
import { ObjectInput } from "../core/Object/components/input";
import { Random } from "../database";
import { useDexie, useTranslation } from "../hooks";
import {
  EnumRandomDescription,
  NumberRandomDescription,
  ObjectRandomDescription,
  RandomDescriptionTypes,
} from "../types";

type RD =
  | Omit<ObjectRandomDescription, "label">
  | Omit<EnumRandomDescription, "label">
  | Omit<NumberRandomDescription, "label">;

const prepareRandomDescription = (
  root: { type: RandomDescriptionTypes } & Record<string, any>
): RD => {
  if (root.type === RandomDescriptionTypes.NUMBER) {
    return {
      min: root.min,
      max: root.max,
      type: root.type,
    };
  }

  if (root.type === RandomDescriptionTypes.ENUMERAL) {
    return {
      type: root.type,
      enum: root.enums.map(({ value }: { value: string }) => value),
    };
  }

  return {
    type: root.type,
    object: Object.fromEntries(
      root.object.map(
        ({
          name,
          type,
          props,
        }: {
          name: string;
          props: any;
          type: RandomDescriptionTypes;
        }) => [name, prepareRandomDescription({ ...props, type })]
      )
    ),
  };
};

const RandomMaker: FC = () => {
  const navigate = useNavigate();

  const [itemToSave, setItemToSave] = useState<Random | null>(null);
  const [validationError, setValidationError] = useState<string>();

  const methods = useForm<{ root: any; name: string }>({
    defaultValues: {
      root: { type: RandomDescriptionTypes.OBJECT, object: [] },
    },
  });

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(() => {
      setValidationError(undefined);
    });
    return () => unsubscribe();
  }, [watch]);

  useDexie(
    async (db) => {
      if (itemToSave) {
        const item = itemToSave;
        setItemToSave(null);

        await db.randoms.add(item);

        navigate("/");
      }
    },
    [itemToSave]
  );

  const onSubmit = async ({ name, root }: any) => {
    try {
      setValidationError(undefined);
      const unlabeledRandomDescription = prepareRandomDescription(root);
      const randomDescription = { ...unlabeledRandomDescription };

      await randomDescriptionValidationSchema.validateAsync(randomDescription);

      setItemToSave({ name, randomDescriptions: [randomDescription] });
    } catch (err) {
      setValidationError(t("randomsMakerPage.errors.shouldFillAllFields"));
      console.error(err);
    }
  };

  const t = useTranslation();

  const nameLabel = t("randomsMakerPage.form.name");
  const okText = t("randomsMakerPage.form.okText");

  return (
    <>
      <ErrorPrinter error={errors.name?.message} />
      <ErrorPrinter error={validationError} />
      <FormProvider {...methods}>
        <Form.Group className="mb-3">
          <Form.Label>{nameLabel}</Form.Label>
          <Form.Control type="text" {...register("name", { required: true })} />
        </Form.Group>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <ObjectInput forUseFormName="root" />
          <br />
          <Button className="mt-2" type="submit">
            {okText}
          </Button>
        </Form>
      </FormProvider>
    </>
  );
};

export default RandomMaker;
