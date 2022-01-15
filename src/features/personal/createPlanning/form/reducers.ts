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

export const createTraining: (index: number) => TrainingBeingCreated = (index) => ({
  letter: letterMap[index],
  id: uuid(),
  exercisesSeries: [createExerciseSeries()],
})

export const addTraining = (state: CreateTrainingPlanningState): CreateTrainingPlanningState => {

  const initialTraining = createTraining(state.trainings.length)

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

export const resetPlanning = (state: CreateTrainingPlanningState) => {
  state.trainings = [];
  state.type = null;
}

export const initPlanning = (state: CreateTrainingPlanningState) => {
  state.trainings.push(createTraining(0));
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