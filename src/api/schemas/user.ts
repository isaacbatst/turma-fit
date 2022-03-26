import Joi from "joi";
import { patchUserErrors } from "../errors/user";

export const patchUserSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'any.required': patchUserErrors.NAME_REQUIRED,
    'string.base': patchUserErrors.NAME_STRING,
    'string.min': patchUserErrors.NAME_LENGTH,
  }),
  role: Joi.string().valid('student', 'personal').required().messages({
    'any.required': patchUserErrors.ROLE_REQUIRED,
    'string.base': patchUserErrors.ROLE_STRING,
    'any.valid': patchUserErrors.ROLE_UNKNOWN
  })
})
