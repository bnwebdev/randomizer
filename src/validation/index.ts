import Joi from "joi";
import {
  EnumRandomDescription,
  LinkRandomDescription,
  NumberRandomDescription,
  ObjectRandomDescription,
  RandomDescriptionTypes,
} from "../types";

export const numberDescriptionValidationSchema = Joi.object<
  NumberRandomDescription,
  true
>({
  type: Joi.string<RandomDescriptionTypes.NUMBER>()
    .allow(RandomDescriptionTypes.NUMBER)
    .only()
    .required(),
  min: Joi.number().required(),
  max: Joi.number().required(),
});

export const enumeralDescriptionValidationSchema = Joi.object<
  EnumRandomDescription,
  true
>({
  type: Joi.string<RandomDescriptionTypes.ENUMERAL>()
    .allow(RandomDescriptionTypes.ENUMERAL)
    .only()
    .required(),
  enum: Joi.array().min(1).items(Joi.string()).required(),
});

export const linkDescriptionValidationSchema = Joi.object<
  LinkRandomDescription,
  true
>({
  type: Joi.string<RandomDescriptionTypes.LINK>()
    .allow(RandomDescriptionTypes.LINK)
    .only()
    .required(),
  linkId: Joi.string().min(1).required(),
});

const objectDescriptionValidationSchema = Joi.object<
  Omit<ObjectRandomDescription, "label">,
  true
>({
  type: Joi.string<RandomDescriptionTypes.OBJECT>()
    .allow(RandomDescriptionTypes.OBJECT)
    .only()
    .required(),
  object: Joi.object()
    .min(1)
    .pattern(
      /.*/,
      Joi.alternatives().try(
        Joi.link("#objectType"),
        numberDescriptionValidationSchema,
        enumeralDescriptionValidationSchema,
        linkDescriptionValidationSchema
      )
    )
    .required(),
}).id("objectType");

export const randomDescriptionValidationSchema = Joi.alternatives().try(
  numberDescriptionValidationSchema,
  enumeralDescriptionValidationSchema,
  objectDescriptionValidationSchema
);
