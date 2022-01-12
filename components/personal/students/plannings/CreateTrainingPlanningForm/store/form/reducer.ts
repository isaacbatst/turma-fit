import { letterMap } from "../../../../../../../lib/letters";
import { v4 as uuid } from 'uuid';
import { ADD_EXERCISES_SERIES, ADD_TRAINING, REMOVE_TRAINING } from "./actions";
import { CreateTrainingPlanningState, ExerciseSerieBeingCreated, TrainingAction, TrainingBeingCreated } from "./types";
import update from 'immutability-helper';

export const initialState: CreateTrainingPlanningState = {
  type: '',
  trainings: [],
};

const getLetter = (index: number) => {
  return letterMap[index];
}

const addTraining = (state: CreateTrainingPlanningState): CreateTrainingPlanningState => {
  const training: TrainingBeingCreated = {
    letter: getLetter(state.trainings.length),
    id: uuid(),
    exercisesSeries: [],
  }

  return update(state, {
    trainings: {
      $push: [training]
    }
  })
}

const removeTraining = (state: CreateTrainingPlanningState, indexToRemove: number): CreateTrainingPlanningState => {
  const updatedTrainings = state.trainings
    .filter((_, index) => index !== indexToRemove)
    .map((training, index) => ({
      ...training,
      letter: getLetter(index)
    }))

  return update(state, {
    trainings: { $set: updatedTrainings }
  })
}

const addExercisesSeries = (state: CreateTrainingPlanningState, trainingId: string): CreateTrainingPlanningState => {
  const updatedTrainings = state.trainings.map(training => {
    const defaultExerciseSeries: ExerciseSerieBeingCreated = {
      exercises: [],
      repetitions: '0',
      times: 0,
      id: uuid(),
    }

    return training.id === trainingId ?
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

const createTrainingPlanningReducer = (state: CreateTrainingPlanningState, action: TrainingAction) => {
  switch (action.type) {
  case ADD_TRAINING:
    return addTraining(state)
  case REMOVE_TRAINING:
    return removeTraining(state, action.payload.index)
  case ADD_EXERCISES_SERIES:
    return addExercisesSeries(state, action.payload.trainingId)
  default:
    return state;
  }
}

export default createTrainingPlanningReducer;