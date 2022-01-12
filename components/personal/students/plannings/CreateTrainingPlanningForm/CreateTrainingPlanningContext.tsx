import { createContext, Dispatch, useContext, useReducer } from "react";
import createTrainingPlanningReducer, { initialState } from "./store/reducer";
import { CreateTrainingPlanningState, TrainingAction } from "./store/types";

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