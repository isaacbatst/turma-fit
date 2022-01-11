import { letterMap } from "../../../../lib/letters";
import { v4 as uuid } from 'uuid';

const ADD_TRAINING = 'ADD_TRAINING';
const REMOVE_TRAINING = 'REMOVE_TRAINING';

export const addTrainingAction = (): Action => ({
  type: ADD_TRAINING
})

export const removeTrainingAction = (index: number): Action => ({
  type: REMOVE_TRAINING,
  payload: {
    index
  }
})

type TrainingBeingCreated = {
  letter: string,
  id: string,
} 

type Action = {
  type: typeof ADD_TRAINING;
} | {
  type: typeof REMOVE_TRAINING;
  payload: {
    index: number;
  }
}

type TrainingsReducerState = {
  trainings: TrainingBeingCreated[]
}

const getLetter = (index: number) => {
  return letterMap[index];
}

const addTraining = (state: TrainingsReducerState): TrainingsReducerState => {
  const training: TrainingBeingCreated = {
    letter: getLetter(state.trainings.length),
    id: uuid()
  }

  return ({
    trainings: [
      ...state.trainings,
      training
    ]
  })
}

const removeTraining = (state: TrainingsReducerState, indexToRemove: number): TrainingsReducerState => {
  const updatedTrainings = state.trainings
    .filter((_, index) => index !== indexToRemove)
    .map((training, index) => ({
      ...training,
      letter: getLetter(index)
    }))

  return {
    trainings: updatedTrainings
  }
}

const trainingsReducer = (state: TrainingsReducerState, action: Action) => {
  switch(action.type) {
  case ADD_TRAINING:
    return addTraining(state)
  case REMOVE_TRAINING:
    return removeTraining(state, action.payload.index)
  default:
    return state;
  }
}

export const initialState: TrainingsReducerState = {
  trainings: []
};

export default trainingsReducer;