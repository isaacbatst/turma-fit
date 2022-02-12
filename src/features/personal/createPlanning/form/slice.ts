import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addSet, addTraining, removeTraining, setPlanningType, resetPlanning, initPlanning, saveSet, saveTraining, createTraining } from "./reducers";

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
    addSet,
    setPlanningType,
    resetPlanning,
    saveSet,
    saveTraining,
    initPlanning,
  }
})

export const { 
  addSet: addSetAction,
  addTraining: addTrainingAction,
  removeTraining: removeTrainingAction,
  setPlanningType: setPlanningTypeAction, 
  resetPlanning: resetPlanningAction,
  initPlanning: initPlanningAction,
  saveSet: saveSetAction,
  saveTraining: saveTrainingAction
} = formSlice.actions; 

export default formSlice.reducer;