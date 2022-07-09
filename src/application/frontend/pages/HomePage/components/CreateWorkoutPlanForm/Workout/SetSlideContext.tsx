import { useAppSelector } from "@application/frontend/store/hooks";
import { selectSet } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ExerciseError, readableExerciseErrors, readableSetErrors, SetError, validateSet } from "../../../hooks/useSaveWorkoutPlanLocal";

interface SetSlideContextValue {
  setIndex: number,
  workoutIndex: number,
  setsLength: number,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>,
  validateSet: () => boolean
}

export const SetSlideContext = createContext({} as SetSlideContextValue);

interface Props extends SetSlideContextValue {};

const defaultErrorMessage = 'Algo deu errado, tente novamente mais tarde'

export const SetSlideContextProvider: React.FC<Props> = ({ 
  setIndex, 
  workoutIndex,
  setsLength,
  children 
}) => {
  const [error, setError] = useState<string | null>(null)
  const set = useAppSelector(selectSet(setIndex, workoutIndex))

  const validate = (): boolean => {
    setError(null);

    if(!set){
      setError(defaultErrorMessage)
      return false;
    }

    try {
      validateSet(set, workoutIndex,setIndex);
      return true;
    } catch (error) {
      if(error instanceof SetError){
        setError(readableSetErrors[error.message])
      } 

      if(error instanceof ExerciseError){
        setError(readableExerciseErrors[error.message]);
      }

      return false;
    }
  }

  const value: SetSlideContextValue = {
    setIndex,
    workoutIndex,
    setsLength,
    error, setError,
    validateSet: validate
  }



  return (
    <SetSlideContext.Provider value={value}>
      { children }
    </SetSlideContext.Provider>
  )
}
