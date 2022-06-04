import { CookiesNames } from "@application/api/common/CookiesNames";
import { ValidationError } from "@application/api/errors/ValidationError";
import { RequestValidator } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";

interface CreateWorkoutPlanValidRequestExercise {
  movementId: string,
  equipmentId?: string,
  grip?: string
}

interface CreateWorkoutPlanValidRequestSet {
  repetitions: string,
  times: number,
  techniqueId: string,
  maxRestTime?: number,
  minRestTime?: number,
  exercises: CreateWorkoutPlanValidRequestExercise[]
}

interface CreateWorkoutPlanValidRequestWorkout {
  day: string,
  aerobicMinutes: number,
  sets: CreateWorkoutPlanValidRequestSet[]
}

export interface CreateWorkoutPlanValidRequest {
  body: {
    workoutPlan: {
      planTypeId: string,
      workouts: CreateWorkoutPlanValidRequestWorkout[]
    }
  },
  cookies: {
    [CookiesNames.AUTHORIZATION]: string
  },
  query: {
    userId: string
  }
}

export enum CreateWorkoutPlanRequestErrors {
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  EMPTY_USER_ID = 'EMPTY_USER_ID',
  EMPTY_WORKOUT_PLAN = 'EMPTY_WORKOUT_PLAN',
  INVALID_PLAN_TYPE_ID = 'INVALID_PLAN_TYPE_ID',
  INVALID_WORKOUTS = 'INVALID_WORKOUTS',
  INVALID_WORKOUT_DAY = 'INVALID_WORKOUT_DAY',
  INVALID_WORKOUT_AEROBIC_MINUTES = 'INVALID_WORKOUT_AEROBIC_MINUTES',
  INVALID_WORKOUT_SETS = 'INVALID_WORKOUT_SETS',
  INVALID_WORKOUT_SET_REPETITIONS = 'INVALID_WORKOUT_SET_REPETITIONS',
  INVALID_WORKOUT_SET_TIMES = 'INVALID_WORKOUT_SET_TIMES',
  INVALID_WORKOUT_SET_TECHNIQUE_ID = 'INVALID_WORKOUT_SET_TECHNIQUE_ID',
  INVALID_WORKOUT_SET_MAX_REST_TIME = 'INVALID_WORKOUT_SET_MAX_REST_TIME',
  INVALID_WORKOUT_SET_MIN_REST_TIME = 'INVALID_WORKOUT_SET_MIN_REST_TIME',
  INVALID_WORKOUT_SET_EXERCISES = 'INVALID_WORKOUT_SET_EXERCISES',
  INVALID_WORKOUT_SET_EXERCISE_MOVEMENT_ID = 'INVALID_WORKOUT_SET_EXERCISE_MOVEMENT_ID',
  INVALID_WORKOUT_SET_EXERCISE_EQUIPMENT_ID = 'INVALID_WORKOUT_SET_EXERCISE_EQUIPMENT_ID',
  INVALID_WORKOUT_SET_EXERCISE_GRIP = 'INVALID_WORKOUT_SET_EXERCISE_GRIP',
}

export interface CreateWorkoutPlanRequest {
  cookies: Record<string, string>,
  body: Record<string, any>,
  query: Record<string, string>
}
export class CreateWorkoutPlanRequestValidator implements RequestValidator<CreateWorkoutPlanValidRequest> {
  validate(request: CreateWorkoutPlanRequest): CreateWorkoutPlanValidRequest {
    const { cookies, query, body } = request;

    if(!cookies[CookiesNames.AUTHORIZATION]){
      throw new AuthenticationError(CreateWorkoutPlanRequestErrors.TOKEN_NOT_FOUND)
    }

    if(!query.userId){
      throw new ValidationError(CreateWorkoutPlanRequestErrors.EMPTY_USER_ID)
    }

    const { workoutPlan } = body;

    if(!workoutPlan) {
      throw new ValidationError(CreateWorkoutPlanRequestErrors.EMPTY_WORKOUT_PLAN)
    }

    const { planTypeId, workouts } = workoutPlan;

    if(!planTypeId || typeof planTypeId !== 'string') {
      throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_PLAN_TYPE_ID)
    }

    if(!workouts || !Array.isArray(workouts)){
      throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUTS)
    }

    const validatedWorkouts = this.validateWorkouts(workouts);

    return {
      cookies: {
        [CookiesNames.AUTHORIZATION]: cookies[CookiesNames.AUTHORIZATION]
      },
      query: {
        userId: query.userId
      },
      body: {
        workoutPlan: {
          planTypeId: workoutPlan.planTypeId,
          workouts: validatedWorkouts
        }
      }
    }
  }

  private validateWorkouts(workouts: any[]): CreateWorkoutPlanValidRequestWorkout[] {
    return workouts.map(({ day, aerobicMinutes, sets }) => {
      if(!day || typeof day !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_DAY)
      }

      if(!aerobicMinutes || typeof aerobicMinutes !== 'number') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_AEROBIC_MINUTES)
      }

      if(!sets || !Array.isArray(sets)) {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SETS)
      }

      const validatedSets = this.validateSets(sets)

      return {
        aerobicMinutes,
        day,
        sets: validatedSets
      }
    })
  }

  private validateSets(sets: any[]): CreateWorkoutPlanValidRequestSet[] {
    return sets.map(({ repetitions, times, techniqueId, maxRestTime, minRestTime, exercises }) => {
      if(!repetitions || typeof repetitions !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_REPETITIONS)
      }

      if(!times || typeof times !== 'number') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TIMES)
      }

      if(!techniqueId || typeof techniqueId !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_TECHNIQUE_ID)
      }

      if(typeof maxRestTime !== 'undefined' && typeof maxRestTime !== 'number') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_MAX_REST_TIME)
      }

      if(typeof minRestTime !== 'undefined' && typeof minRestTime !== 'number') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_MIN_REST_TIME)
      }

      if(!exercises || !Array.isArray(exercises)) {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISES)
      }

      const validatedExercises = this.validateExercises(exercises);

      return {
        repetitions,
        times,
        techniqueId,
        maxRestTime,
        minRestTime,
        exercises: validatedExercises
      }
    })
  }

  private validateExercises(exercises: any[]): CreateWorkoutPlanValidRequestExercise[] {
    return exercises.map(({ movementId, equipmentId, grip }) => {
      if(!movementId || typeof movementId !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_MOVEMENT_ID)
      }

      if(!equipmentId || typeof equipmentId !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_EQUIPMENT_ID)
      }

      if(typeof grip !== 'undefined' && typeof grip !== 'string') {
        throw new ValidationError(CreateWorkoutPlanRequestErrors.INVALID_WORKOUT_SET_EXERCISE_GRIP)
      }

      return {
        movementId,
        equipmentId,
        grip
      }
    })
  }
}