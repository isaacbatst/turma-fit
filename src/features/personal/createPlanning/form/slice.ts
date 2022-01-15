import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addExercisesSeries, addTraining, removeTraining, setPlanningType, resetPlanning, initPlanning, saveExercisesSeries, saveTraining, createTraining } from "./reducers";

const initialState: CreateTrainingPlanningState = {
  type: null,
  trainings: [],
};

export const formSlice = createSlice({
  name: 'personal/createPlanning/form',
  initialState,
  reducers: {
    addTraining,
    removeTraining,
    addExercisesSeries,
    setPlanningType,
    resetPlanning,
    saveExercisesSeries,
    saveTraining,
    initPlanning,
  }
})

export const { 
  addExercisesSeries: addExercisesSeriesAction,
  addTraining: addTrainingAction,
  removeTraining: removeTrainingAction,
  setPlanningType: setPlanningTypeAction, 
  resetPlanning: resetPlanningAction,
  initPlanning: initPlanningAction,
  saveExercisesSeries: saveExercisesSeriesAction,
  saveTraining: saveTrainingAction
} = formSlice.actions; 

export default formSlice.reducer;