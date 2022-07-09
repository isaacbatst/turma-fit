import { Workout } from "@domain/entities/WorkoutPlan/WorkoutListBeingGetted";
import { createContext } from "react";

interface WorkoutContextValue {
  workout: Workout
}

export const WorkoutContext = createContext<WorkoutContextValue>(null as unknown as WorkoutContextValue);

interface Props {
  workout: Workout
}

export const WorkoutContextProvider: React.FC<Props> = ({ children, workout }) => {
  const value = { workout };
  
  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  )
}