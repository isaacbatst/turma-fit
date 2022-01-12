import { createContext, Dispatch, useContext, useReducer } from "react";
import { initialState, stepsReducer } from "./reducer";
import { CreatePlanningStepsState, CreatePlanningStepsAction } from "./types";

type CreatePlanningStepsContextType = [
  CreatePlanningStepsState, Dispatch<CreatePlanningStepsAction>
];

const initialContext: CreatePlanningStepsContextType = [initialState, () => null];

const CreatePlanningStepsContext = createContext(initialContext);

export const useCreatePlanningStepsContext = () => useContext(CreatePlanningStepsContext);

export const CreatePlanningStepsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(stepsReducer, initialState);

  return (
    <CreatePlanningStepsContext.Provider value={[state, dispatch]}>
      {children}
    </CreatePlanningStepsContext.Provider>
  )
}