import { createContext } from "react";

interface SetSlideContextValue {
  setIndex: number,
  workoutIndex: number,
  setsLength: number
}

export const SetSlideContext = createContext({} as SetSlideContextValue);

interface Props extends SetSlideContextValue {}

export const SetSlideContextProvider: React.FC<Props> = ({ 
  setIndex, 
  workoutIndex,
  setsLength,
  children 
}) => {
  const value: SetSlideContextValue = {
    setIndex,
    workoutIndex,
    setsLength
  }

  return (
    <SetSlideContext.Provider value={value}>
      { children }
    </SetSlideContext.Provider>
  )
}
