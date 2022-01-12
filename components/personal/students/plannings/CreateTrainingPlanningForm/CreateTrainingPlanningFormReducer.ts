import { letterMap } from "../../../../../lib/letters";
import { v4 as uuid } from 'uuid';

const ADD_TRAINING = 'ADD_TRAINING';
const REMOVE_TRAINING = 'REMOVE_TRAINING';

export const addTrainingAction = (): TrainingAction => ({
  type: ADD_TRAINING
})

export const removeTrainingAction = (index: number): TrainingAction => ({
  type: REMOVE_TRAINING,
  payload: {
    index
  }
})

export type TrainingBeingCreated = {
  letter: string,
  id: string,
} 

export type TrainingAction = {
  type: typeof ADD_TRAINING;
} | {
  type: typeof REMOVE_TRAINING;
  payload: {
    index: number;
  }
}

type CreateTrainingsPlanningState = {
  type: string;
  trainings: TrainingBeingCreated[]
}

const getLetter = (index: number) => {
  return letterMap[index];
}

const addTraining = (state: CreateTrainingsPlanningState): CreateTrainingsPlanningState => {
  const training: TrainingBeingCreated = {
    letter: getLetter(state.trainings.length),
    id: uuid()
  }

  return ({
    ...state,
    trainings: [
      ...state.trainings,
      training
    ]
  })
}

const removeTraining = (state: CreateTrainingsPlanningState, indexToRemove: number): CreateTrainingsPlanningState => {
  const updatedTrainings = state.trainings
    .filter((_, index) => index !== indexToRemove)
    .map((training, index) => ({
      ...training,
      letter: getLetter(index)
    }))

  return {
    ...state,
    trainings: updatedTrainings
  }
}

const trainingsReducer = (state: CreateTrainingsPlanningState, action: TrainingAction) => {
  switch(action.type) {
  case ADD_TRAINING:
    return addTraining(state)
  case REMOVE_TRAINING:
    return removeTraining(state, action.payload.index)
  default:
    return state;
  }
}

export const initialState: CreateTrainingsPlanningState = {
  type: '',
  trainings: []
};

export default trainingsReducer;