import { createContext, useContext, useReducer } from "react";
import createTrainingPlanningReducer, { initialState } from "./reducer";
import { CreatePlanningFormContextType } from "./types";

const initialContext: CreatePlanningFormContextType = [initialState, () => null];

const CreatePlanningForm = createContext(initialContext);

export const useCreatePlanningForm = () => useContext(CreatePlanningForm);

export const CreatePlanningFormProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(createTrainingPlanningReducer, initialState)

  return (
    <CreatePlanningForm.Provider value={[state, dispatch]}>
      {children}
    </CreatePlanningForm.Provider>
  )
}