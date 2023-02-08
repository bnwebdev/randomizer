import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorPrinter } from "../components";
import { randomDescriptionValidationSchema } from "../validation";
import { Random, RandomDexie, RandomLinkStatus } from "../database";
import { useDexie, useTranslation } from "../hooks";
import {
  LinkRandomDescription,
  NumberRandomDescription,
  RandomDescription,
  RandomDescriptionTypes,
} from "../types";
import { RootInput } from "../core/Root/input";

const ROOT_TYPES = [
  RandomDescriptionTypes.OBJECT,
  RandomDescriptionTypes.ENUMERAL,
  RandomDescriptionTypes.NUMBER,
  RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS,
];

type RD = RandomDescription;

const prepareRandomDescription = (
  root: {
    type: RandomDescriptionTypes;
  } & Record<string, any>
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

  if (root.type === RandomDescriptionTypes.LINK) {
    return {
      type: root.type,
      linkId: root.linkId,
    };
  }

  if (root.type === RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS) {
    return {
      type: root.type,
      random: prepareRandomDescription(root.random),
      repeatCount: prepareRandomDescription(
        root.repeatCount
      ) as NumberRandomDescription,
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

const findLinksRandomDescriptions = (
  randomDescriptions: RandomDescription[]
): LinkRandomDescription[] => {
  const links: LinkRandomDescription[] = [];

  randomDescriptions.forEach((description) => {
    if (description.type === RandomDescriptionTypes.LINK) {
      links.push(description);
    } else if (description.type === RandomDescriptionTypes.OBJECT) {
      const internalLinks = findLinksRandomDescriptions(
        Object.values(description.object)
      );
      links.push(...internalLinks);
    }
  });

  return links;
};

const getIsRightLink =
  (db: RandomDexie) => async (linkDescription: LinkRandomDescription) => {
    const link = await db.randomLinks.get(linkDescription.linkId);

    if (!link) {
      throw new Error(`Link wasn't created`);
    }

    if (link.status !== RandomLinkStatus.DRAFT) {
      throw new Error(`LinkStatus isn't draft`);
    }

    if (link.descriptionId < 0) {
      throw new Error(`Description wasn't choosed`);
    }
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
    setValue,
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

        await db.transaction(
          "readwrite",
          db.randomLinks,
          db.randoms,
          async () => {
            const links = findLinksRandomDescriptions(item.randomDescriptions);
            await Promise.all(links.map(getIsRightLink(db)));

            const id = (await db.randoms.add(item)) as number;

            if (links.length) {
              await db.randomLinks
                .where(":id")
                .anyOf(links.map(({ linkId }) => linkId))
                .modify({
                  creatorDescriptionId: id,
                  status: RandomLinkStatus.COMPLETED,
                });
            }

            navigate("/");
          }
        );
      }
    },
    [itemToSave]
  );

  const rootType = watch("root.type");

  const onSubmit = async ({ name, root }: any) => {
    try {
      setValidationError(undefined);
      const unlabeledRandomDescription = prepareRandomDescription(root);
      const randomDescription = { ...unlabeledRandomDescription };
      console.log(randomDescription);
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
        <Form.Select
          className="mb-3"
          {...register("root.type", {
            required: true,
            onChange: (e) => {
              const type = e.target.value as RandomDescriptionTypes;

              if (type === RandomDescriptionTypes.ENUMERAL) {
                setValue("root", {
                  type,
                  enum: [],
                });
              } else if (type === RandomDescriptionTypes.NUMBER) {
                setValue("root", {
                  type,
                  min: 0,
                  max: 100,
                });
              } else if (type === RandomDescriptionTypes.OBJECT) {
                setValue("root", {
                  type,
                  object: [],
                });
              } else if (
                type === RandomDescriptionTypes.RANDOM_REPEAT_RANDOMS
              ) {
                setValue("root", {
                  type,
                  random: {
                    type: RandomDescriptionTypes.OBJECT,
                    object: [],
                  },
                  repeatCount: {
                    type: RandomDescriptionTypes.NUMBER,
                    min: 1,
                    max: 8,
                  },
                });
              }
            },
          })}
        >
          {ROOT_TYPES.map((key) => (
            <option value={key} key={key}>
              {t(`RandomDescriptionTypes.${key}`) as string}
            </option>
          ))}
        </Form.Select>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <RootInput
            type={rootType as RandomDescriptionTypes}
            forUseFormName="root"
          />
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
