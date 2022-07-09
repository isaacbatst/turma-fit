import { useAppDispatch, useAppSelector } from "@application/frontend/store/hooks";
import { selectPlanType, selectWorkouts } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { saveWorkoutPlanAction, setErrorAction } from "@application/frontend/store/slices/UnauthenticatedWorkoutPlan";
import { Day } from "@domain/entities/WorkoutPlan/enums/Day";
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip";
import { MuscleGroup } from "@domain/entities/WorkoutPlan/enums/MuscleGroup";
import { Set } from "@domain/entities/WorkoutPlan/WorkoutListBeingGetted";
import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";
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

export interface ValidUnauthenticatedWorkout {
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
  times: string,
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


class FormValidationError extends Error {}

class WorkoutPlanError extends FormValidationError {
  constructor(public message: WorkoutPlanErrors){
    super(message);
  }
}

class WorkoutError extends FormValidationError {
  constructor(public message: WorkoutErrors, public workoutIndex: number){
    super(message);
  }
}


export class SetError extends FormValidationError {
  constructor(public message: SetErrors, public workoutIndex: number, public setIndex: number){
    super(message);
  }
}


enum WorkoutPlanErrors {
  EMPTY_PLAN_TYPE = "EMPTY_PLAN_TYPE"
}

const readableWorkoutPlanErrors: Record<WorkoutPlanErrors, string> = {
  EMPTY_PLAN_TYPE: 'O tipo de treino deve ser escolhido',
}

enum WorkoutErrors {
  EMPTY_WORKOUT_DAY = "EMPTY_WORKOUT_DAY",
}

const readableWorkoutErrors: Record<WorkoutErrors, string> = {
  EMPTY_WORKOUT_DAY: 'O dia do treino deve ser escolhido'
}

enum SetErrors {
  EMPTY_TIMES = "EMPTY_TIMES",
  ZERO_REPETITIONS = "ZERO_REPETITIONS",
  INVALID_TIMES = "INVALID_TIMES",
  EMPTY_REPETITIONS = "EMPTY_REPETITIONS",
  INVALID_REPETITIONS = "INVALID_REPETITIONS",
  ZERO_TIMES = "ZERO_TIMES",
}

export const readableSetErrors: Record<SetErrors, string> = {
  EMPTY_REPETITIONS: 'Quantidade de Repetições deve ser preenchida',
  EMPTY_TIMES: 'Quantidade de Séries deve ser prenchida',
  INVALID_REPETITIONS: 'Quantidade de Repetições deve ser um número ou até a falha',
  INVALID_TIMES: 'Quantidades de Séries deve ser um número',
  ZERO_REPETITIONS: 'Quantidade de Repetições deve ser maior que zero',
  ZERO_TIMES: 'Quantidade de Séries deve ser maior que zero'
}


enum ExerciseErrors {
  EMPTY_EXERCISE_MOVEMENT = "EMPTY_EXERCISE_MOVEMENT"
}

export const readableExerciseErrors: Record<ExerciseErrors, string> = {
  EMPTY_EXERCISE_MOVEMENT: 'O movimento precisa ser selecionado'
}

export class ExerciseError extends FormValidationError {
  constructor(
    public message: ExerciseErrors, 
    public workoutIndex: number, 
    public setIndex: number, 
    public exerciseIndex: number
  ){
    super(message);
  }
} 

const getErrorMessage = (error: unknown): string => {
  if(error instanceof WorkoutPlanError) {
    return readableWorkoutPlanErrors[error.message]
  }

  if(error instanceof WorkoutError) {
    return readableWorkoutErrors[error.message]
  }

  if(error instanceof SetError) {
    return readableSetErrors[error.message];
  }

  if(error instanceof ExerciseError) {
    return readableExerciseErrors[error.message]
  }

  return "Algo deu errado, tente novamente mais tarde";
} 

export const useSaveWorkoutPlanLocal = () => {
  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();

  const saveOnLocal = () => {
    try {
      dispatch(setErrorAction({ error: null }));

      const validated = validateWorkoutPlan({
        planType,
        workouts
      })

      const workoutPlan = new WorkoutPlanBeingGetted({
        ...validated,
        id: nanoid(),
      });

      dispatch(saveWorkoutPlanAction({
        workoutPlan: workoutPlan.toPlainObject()
      }))
    } catch(error) {
      dispatch(setErrorAction({ 
        error: getErrorMessage(error)
      }))

      throw new Error();
    }
  } 
 
  return {
    saveOnLocal,
  }
}

const validateWorkoutPlan = (workoutPlan: UnauthenticatedWorkoutPlan): Omit<ValidUnauthenticatedWorkoutPlan, 'id'> => {
  if(!workoutPlan.planType){
    throw new WorkoutPlanError(WorkoutPlanErrors.EMPTY_PLAN_TYPE)
  }

  const workouts = validateWorkouts(workoutPlan.workouts);

  return {
    planType: workoutPlan.planType,
    workouts
  };
}

const validateWorkouts = (workouts: UnauthenticatedWorkout[]): ValidUnauthenticatedWorkout[] => {
  return workouts.map<ValidUnauthenticatedWorkout>((workout, workoutIndex) => {
    if(!workout.day) {
      throw new WorkoutError(WorkoutErrors.EMPTY_WORKOUT_DAY, workoutIndex)
    }
    const sets = validateSets(workout.sets, workoutIndex);

    return {
      ...workout,
      sets: sets,
      day: workout.day,
    };
  })
}

const validateSets = (sets: UnauthenticatedSet[], workoutIndex: number): ValidUnauthenticatedSet[] => {
  return sets.map<ValidUnauthenticatedSet>((set, setIndex) => validateSet(set, workoutIndex, setIndex))
}

export const validateSet = (set: UnauthenticatedSet, workoutIndex: number, setIndex: number): ValidUnauthenticatedSet => {
  const exercises = validateExercises(set.exercises, workoutIndex, setIndex);
  
  if(!set.times){
    throw new SetError(SetErrors.EMPTY_TIMES, workoutIndex, setIndex)
  }

  if(isNaN(Number(set.times))){
    throw new SetError(SetErrors.INVALID_TIMES, workoutIndex, setIndex)
  }

  if(Number(set.times) === 0) {
    throw new SetError(SetErrors.ZERO_TIMES, workoutIndex, setIndex)
  }

  if(Number(set.repetitions) === 0) {
    throw new SetError(SetErrors.ZERO_REPETITIONS, workoutIndex, setIndex)
  }

  if(!set.repetitions) {
    throw new SetError(SetErrors.EMPTY_REPETITIONS, workoutIndex, setIndex)
  }

  if(isNaN(Number(set.repetitions)) && set.repetitions !== 'F'){
    throw new SetError(SetErrors.INVALID_REPETITIONS, workoutIndex, setIndex)
  }


  return {
    ...set,
    times: Number(set.times),
    exercises
  }
}

const validateExercises = (exercises: UnauthenticatedExercise[], workoutIndex: number, setIndex: number): ValidUnauthenticatedExercise[] => {
  return exercises.map<ValidUnauthenticatedExercise>((exercise, exerciseIndex) => {
    if(!exercise.movement){
      throw new ExerciseError(ExerciseErrors.EMPTY_EXERCISE_MOVEMENT, workoutIndex, setIndex, exerciseIndex)
    }

    return {
      ...exercise,
      movement: exercise.movement,
    }
  })
}

