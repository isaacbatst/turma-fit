import { useAppDispatch, useAppSelector } from "@application/frontend/store/hooks";
import { selectPlanType, selectWorkouts } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { saveWorkoutPlanAction, setErrorAction } from "@application/frontend/store/slices/UnauthenticatedWorkoutPlan";
import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";
import { nanoid } from "@reduxjs/toolkit";
import { useValidateWorkoutPlan } from "./useValidateWorkoutPlan";


export const useSaveWorkoutPlanLocal = () => {
  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();
  const { validateWorkoutPlan, getErrorMessage } = useValidateWorkoutPlan();

  const saveOnLocal = () => {
    try {
      dispatch(setErrorAction({ error: null }));

      const validated = validateWorkoutPlan({
        planType,
        workouts
      })

      const workoutPlan = new WorkoutPlanBeingGetted({
        ...validated,
        id: nanoid(),
      });

      dispatch(saveWorkoutPlanAction({
        workoutPlan: workoutPlan.toPlainObject()
      }))
    } catch(error) {
      dispatch(setErrorAction({ 
        error: getErrorMessage(error)
      }))

      throw new Error();
    }
  } 
 
  return {
    saveOnLocal,
  }
}
