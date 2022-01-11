const ADD_TRAINING = 'ADD_TRAINING';

type TrainingBeingCreated = {
  letter: string,
  aerobicMinutes: number
} 

type Action = {
  type: 'ADD_TRAINING';
  payload: TrainingBeingCreated
}

type TrainingsReducerState = {
  trainings: TrainingBeingCreated[]
}


const addTraining = (state: TrainingsReducerState, training: TrainingBeingCreated): TrainingsReducerState => ({
  trainings: [
    ...state.trainings,
    training
  ]
})

const trainingsReducer = (state: TrainingsReducerState, action: Action) => {
  switch(action.type) {
  case ADD_TRAINING:
    return addTraining(state, action.payload)
  }
}

export const initialState: TrainingsReducerState = {
  trainings: []
};

export default trainingsReducer;