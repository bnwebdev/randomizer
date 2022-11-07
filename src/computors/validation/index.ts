import Joi from 'joi'
import { EnumRandomDescription, KeyValuesRandomDescription, NumberRandomDescription, RandomDescriptionTypes } from '../../types'

export const numberDescriptionValidationSchema = Joi.object<NumberRandomDescription, true>({
  type: Joi.string<RandomDescriptionTypes.NUMBER>().allow(RandomDescriptionTypes.NUMBER).only().required(),
  min: Joi.number().required(),
  max: Joi.number().required(),
  label: Joi.string().required()
})

export const enumeralDescriptionValidationSchema = Joi.object<EnumRandomDescription, true>({
  type: Joi.string<RandomDescriptionTypes.ENUMERAL>().allow(RandomDescriptionTypes.ENUMERAL).only().required(),
  label: Joi.string().required(),
  enum: Joi.array().items(Joi.string()).required()
})

export const keyValuesDescriptionValidationSchema = Joi.object<KeyValuesRandomDescription, true>({
  type: Joi.string<RandomDescriptionTypes.KEY_VALUES>().allow(RandomDescriptionTypes.KEY_VALUES).only().required(),
  label: Joi.string().required(),
  keys: Joi.array().items(Joi.string()).required(),
  values: Joi.array().items(Joi.string()).required(),
  repeated: Joi.boolean().required()
})

export const randomDescriptionValidationSchema = Joi.alternatives(
  numberDescriptionValidationSchema,
  enumeralDescriptionValidationSchema,
  keyValuesDescriptionValidationSchema,
)