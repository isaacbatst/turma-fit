import { REMOVE_SWIPER, SET_SWIPER } from "./actions";
import { CreatePlanningStepsAction, CreatePlanningStepsState } from "./types";
import update from 'immutability-helper';

export const initialState: CreatePlanningStepsState = {
  swiper: null
}

export const stepsReducer = (state: CreatePlanningStepsState, action: CreatePlanningStepsAction): CreatePlanningStepsState => {
  console.log('action', action.type)
  switch (action.type) {
  case SET_SWIPER:
    return update(state, {
      swiper: { $set: action.payload.swiper }
    })
  case REMOVE_SWIPER: 
    return update(state, {
      swiper: { $set: null }
    })
  default:
    return state;
  }
}