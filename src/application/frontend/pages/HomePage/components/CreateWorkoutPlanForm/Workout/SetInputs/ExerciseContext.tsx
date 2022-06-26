import { createContext } from "react";

export interface ExerciseContextValue {
  workoutIndex: number,
  setIndex: number,
  exerciseIndex: number
}

export const ExerciseContext = createContext<ExerciseContextValue | null>(null);

interface Props extends ExerciseContextValue {}

export const ExerciseContextProvider: React.FC<Props> = ({ children, exerciseIndex, setIndex, workoutIndex }) => {
  const value: ExerciseContextValue = {
    exerciseIndex,
    setIndex,
    workoutIndex
  }

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  )
}