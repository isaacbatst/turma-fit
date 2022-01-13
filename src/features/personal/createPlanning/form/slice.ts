import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addExercisesSeries, addTraining, removeTraining, setPlanningType } from "./reducers";

const initialState: CreateTrainingPlanningState = {
  type: null,
  trainings: [],
  apiData: {
    exerciseTechniques: [],
    planningTypes: []
  }
};

export const formSlice = createSlice({
  name: 'personal/createPlanning/form',
  initialState,
  reducers: {
    addTraining,
    removeTraining,
    addExercisesSeries,
    setPlanningType
  }
})

export const { 
  addExercisesSeries: addExercisesSeriesAction,
  addTraining: addTrainingAction,
  removeTraining: removeTrainingAction,
  setPlanningType: setPlanningTypeAction, 
} = formSlice.actions; 

export default formSlice.reducer;