import { createContext } from "react";

export interface ExerciseContextValue {
  exerciseIndex: number,
  exercisesLength: number,
}

export const ExerciseContext = createContext<ExerciseContextValue>({} as ExerciseContextValue);

interface Props extends ExerciseContextValue {}

export const ExerciseContextProvider: React.FC<Props> = ({ 
  children, exerciseIndex, exercisesLength
}) => {
  const value: ExerciseContextValue = {
    exerciseIndex,
    exercisesLength
  }

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  )
}