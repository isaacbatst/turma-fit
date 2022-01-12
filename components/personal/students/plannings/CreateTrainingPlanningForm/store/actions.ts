import { TrainingAction } from "./types";

export const ADD_TRAINING = 'ADD_TRAINING';
export const REMOVE_TRAINING = 'REMOVE_TRAINING';

export const ADD_EXERCISES_SERIES = 'ADD_EXERCISES_SERIES';
export const REMOVE_EXERCISES_SERIES = 'REMOVE_EXERCISES_SERIES';

export const addTrainingAction = (): TrainingAction => ({
  type: ADD_TRAINING
})

export const removeTrainingAction = (index: number): TrainingAction => ({
  type: REMOVE_TRAINING,
  payload: {
    index
  }
})

export const addExercisesSeriesAction = (trainingId: string): TrainingAction => ({
  type: ADD_EXERCISES_SERIES,
  payload: {
    trainingId
  }
})

export const removeExercisesSeriesAction = (index: number, trainingId: string): TrainingAction => ({
  type: REMOVE_EXERCISES_SERIES,
  payload: {
    trainingId,
    index
  }
})