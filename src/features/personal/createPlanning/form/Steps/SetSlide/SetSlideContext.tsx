import { ExerciseTechnique } from "@prisma/client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { SetBeingCreated, TrainingBeingCreated } from "../../types";
import update from 'immutability-helper'

type SetSlideContextType = {
  training: TrainingBeingCreated,
  setTraining: Dispatch<SetStateAction<TrainingBeingCreated>>
  setSetRepetitions: (repetitions: string, setIndex: number) => void,
  setSetTechnique: (technique: ExerciseTechnique | null, setIndex: number) => void,
  setSetTimes: (times: number, setIndex: number) => void,
  trainingIndex: number,
  setIndex: number,
  lastSetIndex: number,
  lastTrainingIndex: number,
}

const SetSlideContext = createContext<SetSlideContextType | undefined>(undefined);

export const useSetSlideContext = () => {
  const context = useContext(SetSlideContext);

  if(context === undefined){
    throw new Error("useSetSlideContext must be within SetsSlideProvider")
  }

  return context;
}

type Props = {
  value: Omit<SetSlideContextType, 
    'setTraining' | 'setSetTechnique' | 'setSetRepetitions' | 'setSetTimes'>
}

export const SetSlideContextProvider: React.FC<Props> = ({ children, value }) => {
  const [training, setTraining] = useState(value.training);

  function updateSetsKey<T>(setIndex: number, key: keyof SetBeingCreated, value: T) {
    return {
      sets: {
        [setIndex]: {
          [key]: { $set: value }
        }
      }
    }
  }

  function setSetTechnique(technique: ExerciseTechnique | null, setIndex: number){
    setTraining(update(training, {
      ...updateSetsKey(setIndex, 'exerciseTechnique', technique)
    }))
  }

  function setSetRepetitions(repetitions: string, setIndex: number){
    setTraining(update(training, {
      ...updateSetsKey(setIndex, 'repetitions', repetitions)
    }))
  }

  function setSetTimes(times: number, setIndex: number){
    setTraining(update(training, {
      ...updateSetsKey(setIndex, 'times', times)
    }))
  }


  return <SetSlideContext.Provider value={{
    ...value,
    training,
    setTraining,
    setSetRepetitions,
    setSetTechnique,
    setSetTimes
  }}>
    {children}
  </SetSlideContext.Provider>
}