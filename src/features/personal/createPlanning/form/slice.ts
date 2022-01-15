import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addExercisesSeries, addTraining, removeTraining, setPlanningType, removeAllTrainings, saveExercisesSeries, saveTraining } from "./reducers";

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
    setPlanningType,
    removeAllTrainings,
    saveExercisesSeries,
    saveTraining,
  }
})

export const { 
  addExercisesSeries: addExercisesSeriesAction,
  addTraining: addTrainingAction,
  removeTraining: removeTrainingAction,
  setPlanningType: setPlanningTypeAction, 
  removeAllTrainings: removeAllTrainingsAction,
  saveExercisesSeries: saveExercisesSeriesAction,
  saveTraining: saveTrainingAction
} = formSlice.actions; 

export default formSlice.reducer;