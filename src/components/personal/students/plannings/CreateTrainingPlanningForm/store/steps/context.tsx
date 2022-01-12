import { createContext, useContext, useReducer } from "react";
import { stepsReducer } from "./reducer";
import { CreatePlanningStepsContextType, CreatePlanningStepsState } from "./types";

const initialState: CreatePlanningStepsState = {
  swiper: null
}

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