import { v4 as uuid } from 'uuid';
import { CreateTrainingPlanningState, ExerciseSerieBeingCreated, TrainingBeingCreated } from "./types";
import update from 'immutability-helper';
import { TrainingPlanningType } from "@prisma/client";
import { letterMap } from '../../../../lib/letters';
import { PayloadAction } from '@reduxjs/toolkit';

const createExerciseSeries: () => ExerciseSerieBeingCreated = () => ({
  exercises: [],
  repetitions: '0',
  times: 0,
  id: uuid(),
  exerciseTechnique: null
})

export const addTraining = (state: CreateTrainingPlanningState): CreateTrainingPlanningState => {

  const initialTraining: TrainingBeingCreated = {
    letter: letterMap[state.trainings.length],
    id: uuid(),
    exercisesSeries: [createExerciseSeries()],
  }

  return update(state, {
    trainings: {
      $push: [initialTraining]
    }
  })
}

export const removeTraining = (state: CreateTrainingPlanningState, action: PayloadAction<number>): CreateTrainingPlanningState => {
  const updatedTrainings = state.trainings
    .filter((_, index) => index !== action.payload)
    .map((training, index) => ({
      ...training,
      letter: letterMap[index]
    }))

  return update(state, {
    trainings: { $set: updatedTrainings }
  })
}

export const removeAllTrainings = (state: CreateTrainingPlanningState) => {
  state.trainings = [];
}

export const addExercisesSeries = (state: CreateTrainingPlanningState, action: PayloadAction<string>): CreateTrainingPlanningState => {
  const updatedTrainings = state.trainings.map(training => {


    return training.id === action.payload ?
      (
        update(training, {
          exercisesSeries: { $push: [createExerciseSeries()] }
        })
      )
      : training
  })

  return update(state, {
    trainings: {
      $set: updatedTrainings
    }
  })
}

export const setPlanningType = (state: CreateTrainingPlanningState, action: PayloadAction<TrainingPlanningType>): CreateTrainingPlanningState => {
  return update(state, {
    type: {
      $set: action.payload
    }
  })
}

type SaveExercisesSeriesPayload = {
  exercisesSeries: ExerciseSerieBeingCreated, 
  trainingIndex: number,
  exercisesSeriesIndex: number
}

export const saveExercisesSeries = (state: CreateTrainingPlanningState, action: PayloadAction<SaveExercisesSeriesPayload>) => {
  state
    .trainings[action.payload.trainingIndex]
    .exercisesSeries[action.payload.exercisesSeriesIndex]
  = action.payload.exercisesSeries
}

type SaveTrainingPayload = {
  trainingIndex: number,
  training: TrainingBeingCreated
}

export const saveTraining = (state: CreateTrainingPlanningState, action: PayloadAction<SaveTrainingPayload>) => {
  state.trainings[action.payload.trainingIndex] = action.payload.training
}