import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { CreateWorkoutPlanRequestMock } from "./CreateWorkoutPlanRequestMock";
import { CreateWorkoutPlanRequestErrors, CreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator"

const makeSut = () => {
  const validator = new CreateWorkoutPlanRequestValidator();
  const mock = new CreateWorkoutPlanRequestMock();

  return {
    validator, mock
  }
}

describe('CreateWorkoutPlanRequestValidator', () => {
  describe('Given request does not includes cookie', () => {
    it('should throw Authentication Error', () => {
      const { validator, mock } = makeSut();
      mock.REQUEST.cookies = {};

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrow(AuthenticationError);
    })
  })

  describe('Given request does not includes userId', () => {
    it('should throw EMPTY_USER_ID error', () => {
      const { validator, mock } = makeSut();
      mock.REQUEST.query = {};

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.EMPTY_USER_ID);
    })
  })

  describe('Given request does not includes workout plan', () => {
    it('should throw EMPTY_WORKOUT_PLAN error', () => {
      const { validator, mock } = makeSut();
      mock.REQUEST.body = {};

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.EMPTY_WORKOUT_PLAN);
    })
  })

  describe('Given request does not includes plan type id', () => {
    it('should throw INVALID_PLAN_TYPE_ID error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT_PLAN.planTypeId = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_PLAN_TYPE_ID);
    })
  })

  describe('Given request does not includes workouts array', () => {
    it('should throw INVALID_WORKOUTS error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT_PLAN.workouts = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUTS);
    })
  })

  describe('Given request workouts not an aray', () => {
    it('should throw INVALID_WORKOUTS error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT_PLAN.workouts = 'not_array';

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUTS);
    })
  })
  
  describe('Given request does not includes workout day', () => {
    it('should throw INVALID_WORKOUT_DAY error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT.day = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_DAY);
    })
  })

  describe('Given request does not includes workout aerobic minutes', () => {
    it('should throw INVALID_WORKOUT_AEROBIC_MINUTES error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT.aerobicMinutes = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_AEROBIC_MINUTES);
    })
  })

  describe('Given request does not includes workout sets', () => {
    it('should throw INVALID_WORKOUT_SETS error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT.sets = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SETS);
    })
  })

  describe('Given request with sets not an array', () => {
    it('should throw INVALID_WORKOUT_SETS error', () => {
      const { validator, mock } = makeSut();
      mock.WORKOUT.sets = 'not_array';

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SETS);
    })
  })

  describe('Given request does not includes workout sets repetitions', () => {
    it('should throw INVALID_WORKOUT_SET_REPETITIONS error', () => {
      const { validator, mock } = makeSut();
      mock.SET.repetitions = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_REPETITIONS);
    })
  })

  describe('Given request with repetitions not a string', () => {
    it('should throw INVALID_WORKOUT_SET_REPETITIONS error', () => {
      const { validator, mock } = makeSut();
      mock.SET.repetitions = { not: 'string' };

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_REPETITIONS);
    })
  })

  describe('Given request does not includes workout sets times', () => {
    it('should throw INVALID_WORKOUT_SET_TIMES error', () => {
      const { validator, mock } = makeSut();
      mock.SET.times = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TIMES);
    })
  })

  describe('Given request with repetitions not a string', () => {
    it('should throw INVALID_WORKOUT_SET_TIMES error', () => {
      const { validator, mock } = makeSut();
      mock.SET.times = { not: 'string' };

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TIMES);
    })
  })

  describe('Given request with min rest time not a number', () => {
    it('should throw INVALID_WORKOUT_SET_MIN_REST_TIME error', () => {
      const { validator, mock } = makeSut();
      mock.SET.minRestTime = 'not_number';

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_MIN_REST_TIME);
    })
  })

  describe('Given request with max rest time not a number', () => {
    it('should throw INVALID_WORKOUT_SET_MAX_REST_TIME error', () => {
      const { validator, mock } = makeSut();
      mock.SET.maxRestTime = 'not_number';

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_MAX_REST_TIME);
    })
  })

  describe('Given request does not includes workout sets technique id', () => {
    it('should throw INVALID_WORKOUT_SET_TECHNIQUE_ID error', () => {
      const { validator, mock } = makeSut();
      mock.SET.techniqueId = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TECHNIQUE_ID);
    })
  })

  describe('Given request with technique id not a string', () => {
    it('should throw INVALID_WORKOUT_SET_TECHNIQUE_ID error', () => {
      const { validator, mock } = makeSut();
      mock.SET.techniqueId = { not: 'string' };

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TECHNIQUE_ID);
    })
  })

  describe('Given request does not includes workout sets exercises', () => {
    it('should throw INVALID_WORKOUT_SET_EXERCISES error', () => {
      const { validator, mock } = makeSut();
      mock.SET.exercises = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISES);
    })
  })

  describe('Given request exercises not an array', () => {
    it('should throw INVALID_WORKOUT_SET_EXERCISES error', () => {
      const { validator, mock } = makeSut();
      mock.SET.exercises = 'not_array';

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISES);
    })
  })

  describe('Given request does not includes exercise equipment id', () => {
    it('should throw INVALID_WORKOUT_SET_EXERCISE_EQUIPMENT_ID error', () => {
      const { validator, mock } = makeSut();
      mock.EXERCISE.equipmentId = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_EQUIPMENT_ID);
    })
  })

  describe('Given request does not includes exercise movement id', () => {
    it('should throw INVALID_WORKOUT_SET_EXERCISE_MOVEMENT_ID error', () => {
      const { validator, mock } = makeSut();
      mock.EXERCISE.movementId = undefined;

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_MOVEMENT_ID);
    })
  })

  describe('Given request with exercise grip not a string', () => {
    it('should throw INVALID_WORKOUT_SET_EXERCISE_GRIP error', () => {
      const { validator, mock } = makeSut();
      mock.EXERCISE.grip = { not: 'string' };

      expect(() => {
        validator.validate(mock.REQUEST)
      }).toThrowError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_GRIP);
    })
  })
})