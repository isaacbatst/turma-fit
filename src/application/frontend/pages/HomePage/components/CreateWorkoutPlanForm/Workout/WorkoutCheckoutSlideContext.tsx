import { useAppSelector } from "@application/frontend/store/hooks";
import { selectWorkout } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ExerciseError, readableExerciseErrors, readableSetErrors, readableWorkoutErrors, SetError, useValidateWorkoutPlan, WorkoutError } from "../../../hooks/useValidateWorkoutPlan";

interface WorkoutCheckoutSlideContextValue {
  workoutIndex: number,
  workoutsLength: number
  workoutId: string,
  validateWorkout: () => boolean,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>
}

export const WorkoutCheckoutSlideContext = createContext({} as WorkoutCheckoutSlideContextValue);

interface Props {
  workoutIndex: number,
  workoutsLength: number
  workoutId: string,
}

const defaultErrorMessage = 'Algo deu errado, tente novamente mais tarde'

export const WorkoutCheckoutSlideContextProvider: React.FC<Props> = ({
  workoutIndex,
  workoutsLength,
  workoutId,
  children
}) => {
  const { validateWorkout } = useValidateWorkoutPlan();
  const [error, setError] = useState<string | null>(null);
  const workout = useAppSelector(selectWorkout(workoutIndex))

  const validate = (): boolean => {
    setError(null);

    if(!workout){
      setError(defaultErrorMessage)
      return false;
    }

    try {
      validateWorkout(workout, workoutIndex);
      return true;
    } catch (error) {
      if(error instanceof WorkoutError){
        setError(readableWorkoutErrors[error.message])
      }

      if(error instanceof SetError){
        setError(readableSetErrors[error.message])
      } 

      if(error instanceof ExerciseError){
        setError(readableExerciseErrors[error.message]);
      }

      return false;
    }
  }

  const value: WorkoutCheckoutSlideContextValue = {
    workoutIndex,
    workoutsLength,
    workoutId,
    validateWorkout: validate,
    error, setError
  }

  return (
    <WorkoutCheckoutSlideContext.Provider value={value}>
      {children}
    </WorkoutCheckoutSlideContext.Provider>
  )
}