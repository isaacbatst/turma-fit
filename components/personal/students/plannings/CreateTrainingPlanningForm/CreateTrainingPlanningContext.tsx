import { createContext, Dispatch, useContext, useReducer } from "react";
import createTrainingPlanningReducer, { CreateTrainingPlanningState, initialState, TrainingAction } from "./CreateTrainingPlanningFormReducer";

type CreatePlanningContextType = [
  CreateTrainingPlanningState, Dispatch<TrainingAction>
];

const initialContext: CreatePlanningContextType = [initialState, () => null];

const CreatePlanningContext = createContext(initialContext);

export const useCreatePlanningContext = () => useContext(CreatePlanningContext);

export const CreatePlanningProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(createTrainingPlanningReducer, initialState)

  return (
    <CreatePlanningContext.Provider value={[state, dispatch]}>
      {children}
    </CreatePlanningContext.Provider>
  )
}