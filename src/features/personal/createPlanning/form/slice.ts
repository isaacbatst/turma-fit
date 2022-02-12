import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addSet, addTraining, removeTraining, setPlanningType, resetPlanning, initPlanning, saveSet, saveTraining, selectEquipment, selectGrip, selectMovement } from "./reducers";

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
    selectEquipment,
    selectGrip,
    selectMovement
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
  saveTraining: saveTrainingAction,
  selectEquipment: selectEquipmentAction,
  selectGrip: selectGripAction,
  selectMovement: selectMovementAction
} = formSlice.actions; 

export default formSlice.reducer;