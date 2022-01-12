import { createContext, useContext, useEffect, useReducer } from "react";
import createTrainingPlanningReducer from "./reducer";
import { CreatePlanningFormContextType, CreateTrainingPlanningState } from "./types";

const initialState: CreateTrainingPlanningState = {
  type: null,
  trainings: [],
};

const initialContext: CreatePlanningFormContextType = [initialState, () => null];

const CreatePlanningForm = createContext(initialContext);

export const useCreatePlanningFormContext = () => useContext(CreatePlanningForm);

export const CreatePlanningFormProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(createTrainingPlanningReducer, initialState)

  return (
    <CreatePlanningForm.Provider value={[state, dispatch]}>
      {children}
    </CreatePlanningForm.Provider>
  )
}