import { v4 as uuid } from 'uuid';
import { CreateTrainingPlanningState, ExerciseBeingCreated, SetBeingCreated, TrainingBeingCreated } from "./types";
import update from 'immutability-helper';
import { Equipment, Grip, TrainingPlanningType } from "@prisma/client";
import { letterMap } from '../../../../lib/letters';
import { PayloadAction } from '@reduxjs/toolkit';
import { MovementWithMuscleGroup } from '../../../../types/schema';

const createExercise: () => ExerciseBeingCreated = () => ({ 
  equipment: null,
  grip: null,
  movement: null
})

const createSet: () => SetBeingCreated = () => ({
  exercises: [createExercise()],
  repetitions: '0',
  times: 0,
  id: uuid(),
  exerciseTechnique: null
})

export const createTraining: (index: number) => TrainingBeingCreated = (index) => ({
  letter: letterMap[index],
  id: uuid(),
  sets: [createSet()],
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

export const addSet = (state: CreateTrainingPlanningState, action: PayloadAction<string>): CreateTrainingPlanningState => {
  const updatedTrainings = state.trainings.map(training => {


    return training.id === action.payload ?
      (
        update(training, {
          sets: { $push: [createSet()] }
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

type SaveSetPayload = {
  set: SetBeingCreated, 
  trainingIndex: number,
  setIndex: number
}

export const saveSet = (state: CreateTrainingPlanningState, action: PayloadAction<SaveSetPayload>) => {
  state
    .trainings[action.payload.trainingIndex]
    .sets[action.payload.setIndex]
  = action.payload.set
}

type SaveTrainingPayload = {
  trainingIndex: number,
  training: TrainingBeingCreated
}

export const saveTraining = (state: CreateTrainingPlanningState, action: PayloadAction<SaveTrainingPayload>) => {
  state.trainings[action.payload.trainingIndex] = action.payload.training
}

type SelectExerciseKeyPayload = {
  exerciseIndex?: number,
  setIndex: number,
  trainingIndex: number,
}

interface SelectMovementPayload extends SelectExerciseKeyPayload {
  movement: MovementWithMuscleGroup | null
}

export const selectMovement = (state: CreateTrainingPlanningState, action: PayloadAction<SelectMovementPayload>) => {
  const { exerciseIndex = 0, movement, setIndex, trainingIndex } = action.payload;

  state
    .trainings[trainingIndex]
    .sets[setIndex]
    .exercises[exerciseIndex].movement = movement
}

interface SelectEquipmentPayload extends SelectExerciseKeyPayload {
  equipment: Equipment | null
}

export const selectEquipment = (state: CreateTrainingPlanningState, action: PayloadAction<SelectEquipmentPayload>) => {
  const { exerciseIndex = 0, equipment, setIndex, trainingIndex } = action.payload;

  state
    .trainings[trainingIndex]
    .sets[setIndex]
    .exercises[exerciseIndex].equipment = equipment
}

interface SelectGripPayload extends SelectExerciseKeyPayload {
  grip: Grip | null
}

export const selectGrip = (state: CreateTrainingPlanningState, action: PayloadAction<SelectGripPayload>) => {
  const { exerciseIndex = 0, grip, setIndex, trainingIndex } = action.payload;

  state
    .trainings[trainingIndex]
    .sets[setIndex]
    .exercises[exerciseIndex].grip = grip
}