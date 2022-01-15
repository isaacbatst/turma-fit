import { ExerciseTechnique } from "@prisma/client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ExerciseSerieBeingCreated, TrainingBeingCreated } from "../../types";
import update from 'immutability-helper'

type SeriesSlideContextType = {
  training: TrainingBeingCreated,
  setTraining: Dispatch<SetStateAction<TrainingBeingCreated>>
  setTrainingSeriesRepetitions: (repetitions: string, seriesIndex: number) => void,
  setTrainingSeriesTechnique: (technique: ExerciseTechnique | null, seriesIndex: number) => void,
  setTrainingSeriesTimes: (times: number, seriesIndex: number) => void,
  trainingIndex: number,
  exercisesSeriesIndex: number,
  lastExerciseSeriesIndex: number,
  lastTrainingIndex: number,
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
  value: Omit<SeriesSlideContextType, 
    'setTraining' | 'setTrainingSeriesTechnique' | 'setTrainingSeriesRepetitions' | 'setTrainingSeriesTimes'>
}

export const ExercisesSeriesSlideContextProvider: React.FC<Props> = ({ children, value }) => {
  const [training, setTraining] = useState(value.training);

  function updateSeriesKey<T>(seriesIndex: number, key: keyof ExerciseSerieBeingCreated, value: T) {
    return {
      exercisesSeries: {
        [seriesIndex]: {
          [key]: { $set: value }
        }
      }
    }
  }

  function setTrainingSeriesTechnique(technique: ExerciseTechnique | null, seriesIndex: number){
    setTraining(update(training, {
      ...updateSeriesKey(seriesIndex, 'exerciseTechnique', technique)
    }))
  }

  function setTrainingSeriesRepetitions(repetitions: string, seriesIndex: number){
    setTraining(update(training, {
      ...updateSeriesKey(seriesIndex, 'repetitions', repetitions)
    }))
  }

  function setTrainingSeriesTimes(times: number, seriesIndex: number){
    setTraining(update(training, {
      ...updateSeriesKey(seriesIndex, 'times', times)
    }))
  }


  return <SeriesSlideContext.Provider value={{
    ...value,
    training,
    setTraining,
    setTrainingSeriesRepetitions,
    setTrainingSeriesTechnique,
    setTrainingSeriesTimes
  }}>
    {children}
  </SeriesSlideContext.Provider>
}