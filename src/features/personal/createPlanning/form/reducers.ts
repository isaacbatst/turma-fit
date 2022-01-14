import { v4 as uuid } from 'uuid';
import { CreateTrainingPlanningState, ExerciseSerieBeingCreated, TrainingBeingCreated } from "./types";
import update from 'immutability-helper';
import { TrainingPlanningType } from "@prisma/client";
import { letterMap } from '../../../../lib/letters';
import { PayloadAction } from '@reduxjs/toolkit';
import { ExerciseWithMuscleGroups } from '../../../../types/schema';

export const addTraining = (state: CreateTrainingPlanningState): CreateTrainingPlanningState => {
  const training: TrainingBeingCreated = {
    letter: letterMap[state.trainings.length],
    id: uuid(),
    exercisesSeries: [],
  }

  return update(state, {
    trainings: {
      $push: [training]
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
    const defaultExerciseSeries: ExerciseSerieBeingCreated = {
      exercises: [],
      repetitions: '0',
      times: 0,
      id: uuid(),
    }

    return training.id === action.payload ?
      (
        update(training, {
          exercisesSeries: { $push: [defaultExerciseSeries] }
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

type SetExercisesPayload = {
  exercises: ExerciseWithMuscleGroups[],
  trainingIndex: number,
  exerciseSeriesIndex: number
}

export const setExercises = (state: CreateTrainingPlanningState, action: PayloadAction<SetExercisesPayload>) => {
  state
    .trainings[action.payload.trainingIndex]
    .exercisesSeries[action.payload.exerciseSeriesIndex]
    .exercises = action.payload.exercises
}