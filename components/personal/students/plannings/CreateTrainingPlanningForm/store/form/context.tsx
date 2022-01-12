import { createContext, Dispatch, useContext, useReducer } from "react";
import createTrainingPlanningReducer, { initialState } from "./reducer";
import { CreateTrainingPlanningState, TrainingAction } from "./types";

type CreatePlanningFormType = [
  CreateTrainingPlanningState, Dispatch<TrainingAction>
];

const initialContext: CreatePlanningFormType = [initialState, () => null];

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