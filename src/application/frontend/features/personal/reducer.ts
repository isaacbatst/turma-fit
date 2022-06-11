import { combineReducers } from "redux";
import createPlanningReducer from "../createPlanning/reducer";

const personalReducer = combineReducers({
  createPlanning: createPlanningReducer
})

export default personalReducer;