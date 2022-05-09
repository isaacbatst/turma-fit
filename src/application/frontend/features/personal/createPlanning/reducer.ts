import { combineReducers } from "redux";
import formReducer from "./form/slice";
import {createPlanningApi} from "./api";

const createPlanningReducer = combineReducers({
  form: formReducer,
  [createPlanningApi.reducerPath]: createPlanningApi.reducer
})

export default createPlanningReducer;