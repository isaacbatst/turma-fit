import { createContext } from "react";

interface WorkoutCheckoutSlideContextValue {
  workoutIndex: number,
  workoutsLength: number
  workoutId: string
}

export const WorkoutCheckoutSlideContext = createContext({} as WorkoutCheckoutSlideContextValue);

interface Props extends WorkoutCheckoutSlideContextValue {}

export const WorkoutCheckoutSlideContextProvider: React.FC<Props> = ({
  workoutIndex,
  workoutsLength,
  workoutId,
  children
}) => {
  const value: WorkoutCheckoutSlideContextValue = {
    workoutIndex,
    workoutsLength,
    workoutId
  }

  return (
    <WorkoutCheckoutSlideContext.Provider value={value}>
      {children}
    </WorkoutCheckoutSlideContext.Provider>
  )
}