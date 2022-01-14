import { createContext, useContext } from "react";
import { ExerciseSerieBeingCreated, TrainingBeingCreated } from "../../types";

type SeriesSlideContextType = {
  training: TrainingBeingCreated,
  trainingIndex: number,
  exercisesSeries: ExerciseSerieBeingCreated,
  exercisesSeriesIndex: number,
  lastExerciseSeriesIndex: number,
  lastTrainingIndex: number
}

const SeriesSlideContext = createContext<SeriesSlideContextType | undefined>(undefined);

export const useExercisesSeriesSlideContext = () => {
  const context = useContext(SeriesSlideContext);

  if(context === undefined){
    throw new Error("useSeriesSlideContext must be within SeriesSlideProvider")
  }

  return context;
}

type Props = {
  value: SeriesSlideContextType
}

export const SeriesSlideContextProvider: React.FC<Props> = ({ children, value }) => {
  return <SeriesSlideContext.Provider value={value}>
    {children}
  </SeriesSlideContext.Provider>
}