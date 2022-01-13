import { combineReducers } from "redux";
import formReducer from "./form/slice";

const createPlanningReducer = combineReducers({
  form: formReducer,
})

export default createPlanningReducer;