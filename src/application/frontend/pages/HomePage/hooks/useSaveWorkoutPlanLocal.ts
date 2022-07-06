import { useAppDispatch, useAppSelector } from "@application/frontend/store/hooks";
import { selectPlanType, selectWorkouts } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { saveWorkoutPlanAction, setErrorAction } from "@application/frontend/store/slices/UnauthenticatedWorkoutPlan";
import { Day } from "@domain/entities/WorkoutPlan/enums/Day";
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip";
import { MuscleGroup } from "@domain/entities/WorkoutPlan/enums/MuscleGroup";
import { nanoid } from "@reduxjs/toolkit";

interface ValidUnauthenticatedPlanType {
  id: string,
  name: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface ValidUnauthenticatedMovement {
  id: string
  name: string,
  muscleGroup: MuscleGroup
}
 
interface ValidUnauthenticatedEquipment {
  id: string
  name: string,
}
interface ValidUnauthenticatedExercise {
  id: string,
  movement: ValidUnauthenticatedMovement,
  equipment?: ValidUnauthenticatedEquipment,
  grip?: Grip
}

interface ValidUnauthenticatedTechnique {
  id: string
  name: string,
}

interface ValidUnauthenticatedSet {
  id: string,
  times: number,
  repetitions: string,
  technique?: ValidUnauthenticatedTechnique,
  minRestTime?: number,
  maxRestTime?: number,
  exercises: ValidUnauthenticatedExercise[]
}

interface ValidUnauthenticatedWorkout {
  id: string,
  aerobicMinutes: number,
  day: Day
  sets: ValidUnauthenticatedSet[],
}

export interface ValidUnauthenticatedWorkoutPlan {
  id: string,
  planType: ValidUnauthenticatedPlanType,
  workouts: ValidUnauthenticatedWorkout[],
}

interface UnauthenticatedPlanType {
  id: string,
  name: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface UnauthenticatedMovement {
  id: string
  name: string,
  muscleGroup: MuscleGroup,
}
 
interface UnauthenticatedEquipment {
  id: string
  name: string,
}
interface UnauthenticatedExercise {
  id: string,
  movement?: UnauthenticatedMovement,
  equipment?: UnauthenticatedEquipment,
  grip?: Grip
}

interface UnauthenticatedTechnique {
  id: string
  name: string,
}

export interface UnauthenticatedSet {
  id: string,
  times: number,
  repetitions: string,
  technique?: UnauthenticatedTechnique,
  minRestTime?: number,
  maxRestTime?: number,
  exercises: UnauthenticatedExercise[]
}

export interface UnauthenticatedWorkout {
  id: string,
  aerobicMinutes: number,
  day?: Day
  sets: UnauthenticatedSet[],
}

interface UnauthenticatedWorkoutPlan {
  planType: UnauthenticatedPlanType | null,
  workouts: UnauthenticatedWorkout[],
}

export const useSaveWorkoutPlanLocal = () => {
  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();

  const saveOnLocal = () => {
    try {
      dispatch(setErrorAction({ error: null }));

      const workoutPlan = validateWorkoutPlan({
        planType,
        workouts
      })

      dispatch(saveWorkoutPlanAction({
        workoutPlan: {
          ...workoutPlan,
          id: nanoid(),
        }
      }))
    } catch(error) {
      dispatch(setErrorAction({ 
        error: error instanceof FormValidationError ? error.message : "UNKNOWN_ERROR" 
      }))
    }
  } 
 
  return {
    saveOnLocal,
  }
}

const validateWorkoutPlan = (workoutPlan: UnauthenticatedWorkoutPlan): Omit<ValidUnauthenticatedWorkoutPlan, 'id'> => {
  if(!workoutPlan.planType){
    throw new FormValidationError('EMPTY_PLAN_TYPE')
  }

  const workouts = workoutPlan.workouts.map<ValidUnauthenticatedWorkout>((workout, workoutIndex) => {
    if(!workout.day) {
      throw new WorkoutError("EMPTY_WORKOUT_DAY", workoutIndex)
    }
    const sets = workout.sets.map<ValidUnauthenticatedSet>((set, setIndex) => {
      if(!set.times){
        throw new SetError("EMPTY_TIMES", workoutIndex, setIndex)
      }

      if(!set.repetitions) {
        throw new SetError("EMPTY_REPETITIONS", workoutIndex, setIndex)
      }

      const exercises = set.exercises.map<ValidUnauthenticatedExercise>((exercise, exerciseIndex) => {
        if(!exercise.movement){
          throw new ExerciseError("EMPTY_EXERCISE_MOVEMENT", workoutIndex, setIndex, exerciseIndex)
        }

        return {
          ...exercise,
          movement: exercise.movement,
        }
      })

      return {
        ...set,
        exercises
      }
    })

    return {
      ...workout,
      sets: sets,
      day: workout.day,
    };
  })

  return {
    planType: workoutPlan.planType,
    workouts
  };
}


class FormValidationError extends Error {}

class WorkoutError extends FormValidationError {
  constructor(message: string, public workoutIndex: number){
    super(message);
  }
}

class SetError extends FormValidationError {
  constructor(message: string, public workoutIndex: number, public setIndex: number){
    super(message);
  }
}

class ExerciseError extends FormValidationError {
  constructor(
    message: string, 
    public workoutIndex: number, 
    public setIndex: number, 
    public exerciseIndex: number
  ){
    super(message);
  }
} 
