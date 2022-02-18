import { createSlice } from "@reduxjs/toolkit";
import { CreateTrainingPlanningState } from "./types";
import { addSet, setTechnique, addTraining, removeTraining, setPlanningType, resetPlanning, initPlanning, saveSet, saveTraining, setTimes, setRepetitions, selectEquipment, selectGrip, selectMovement } from "./reducers";

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
    selectMovement,
    setTimes,
    setRepetitions,
    setTechnique
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
  selectMovement: selectMovementAction,
  setRepetitions: setRepetitionsAction,
  setTimes: setTimesAction,
  setTechnique: setTechniqueAction
} = formSlice.actions; 

export default formSlice.reducer;