import Joi from "joi";
import { SetBeingCreated } from "../../types";

const MOVEMENT_VALIDATION_MESSAGES = {
  'object.base': 'Um exercício deve ser selecionado'
}

const REPETITIONS_MATCH_ERROR_MESSAGE = 'As repetições podem ser em números > 0 ou até a falha "F"'

const REPETITIONS_VALIDATION_MESSAGES = {
  'string.empty': 'As repetições devem ser preenchidas"',
  'string.length': REPETITIONS_MATCH_ERROR_MESSAGE,
  'alternatives.match': REPETITIONS_MATCH_ERROR_MESSAGE,
  'string.pattern.base': REPETITIONS_MATCH_ERROR_MESSAGE,
}

const TIMES_VALIDATION_MESSAGES = {
  'number.greater': 'A quantidade de séries deve ser > 0'
}

const equipmentSchema = Joi.object({
  name: Joi.string(),
  id: Joi.number()
})

const movementsSchema = Joi.object({
  name: Joi.string(),
  id: Joi.number(),
  muscleGroupId: Joi.number(),
  focusedMuscleGroup: {
    name: Joi.string(),
    id: Joi.number()
  }
}).messages(MOVEMENT_VALIDATION_MESSAGES)

const repetitionsSchema = Joi.alternatives().try(
  Joi.number().greater(0),
  Joi.string().length(1).regex(/F/i)
).messages(REPETITIONS_VALIDATION_MESSAGES)

const techniqueSchema = Joi.object({
  name: Joi.string(),
  id: Joi.number(),
  explanation: Joi.string().allow(''),
})

const exerciseSchema = Joi.object({
  movement: movementsSchema,
  equipment: equipmentSchema.allow(null),
  grip: Joi.string().allow(null),
})

const setSchema = Joi.object({
  exercises: Joi.array().items(exerciseSchema),
  times: Joi.number().greater(0).messages(TIMES_VALIDATION_MESSAGES),
  repetitions: repetitionsSchema,
  exerciseTechnique: techniqueSchema.allow(null),
  id: Joi.string().required(),
});

interface GoToTrainingCheckoutValidation {
  error?: string
  warning?: string
}

export const validateSet = (sets: SetBeingCreated): GoToTrainingCheckoutValidation => {

  const validation = setSchema.validate(sets)

  return {
    error: validation.error && validation.error.message,
    warning: validation.warning && validation.warning.message
  }
}
