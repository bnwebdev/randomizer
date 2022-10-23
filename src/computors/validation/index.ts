import Joi from 'joi'
import { EnumRandomDescription, NumberRandomDescription, RandomDescriptionTypes } from '../../types'

export const numberDescriptionValidationSchema = Joi.object<NumberRandomDescription, true>({
  type: Joi.string<RandomDescriptionTypes.NUMBER>().allow(RandomDescriptionTypes.NUMBER).only(),
  min: Joi.number(),
  max: Joi.number(),
  label: Joi.string()
})

export const enumeralDescriptionValidationSchema = Joi.object<EnumRandomDescription, true>({
  type: Joi.string<RandomDescriptionTypes.ENUMERAL>().allow(RandomDescriptionTypes.ENUMERAL).only(),
  label: Joi.string(),
  enum: Joi.array().items(Joi.string())
})

export const randomDescriptionValidationSchema = Joi.alternatives(
  numberDescriptionValidationSchema,
  enumeralDescriptionValidationSchema
)