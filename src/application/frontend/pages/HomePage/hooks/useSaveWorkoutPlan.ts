import { useAppDispatch, useAppSelector } from "@application/frontend/store/hooks";
import { selectPlanType, selectWorkouts, setErrorAction } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import { saveWorkoutPlanAction } from "@application/frontend/store/slices/UnauthenticatedWorkoutPlan";
import { useUser } from "@application/frontend/swr/useUser";
import axios from "axios";
import { useContext } from "react";
import { CreateWorkoutPlanFormContext } from "../components/CreateWorkoutPlanForm/CreateWorkoutPlanFormContext";

export const useSaveWorkoutPlan = () => {
  const { isAuthenticated } = useContext(CreateWorkoutPlanFormContext);

  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();

  const { user } = useUser();

  const workoutPlan = {
    planTypeId: planType?.id,
    workouts: workouts
  };

  const handleApiError = (body: unknown) => {
    const castBody = body as { error: unknown };

    if(body && castBody.error && typeof castBody.error === 'string'){
      return dispatch(setErrorAction({ error: castBody.error }))
    } 

    return 'UNKNOWN_ERROR';
  }

  const saveOnApi = async (user: { id: string, name: string }) => {
    dispatch(setErrorAction({ error: null }));

    try {
      const response = await axios.post(`/api/user/${user.id}/workout-plans`, {
        workoutPlan
      });

      console.log(response)
    } catch (e) {
      if(axios.isAxiosError(e) && e.response){
        handleApiError(e.response.data)
      } else {
        return 'UNKNOWN_ERROR'
      }
    }
  }

  const saveOnLocal = () => {
    dispatch(saveWorkoutPlanAction({ workoutPlan }))
  } 

  const createWorkoutPlan = async () => {
    if(!isAuthenticated || !user) {
      return saveOnLocal();
    }

    return saveOnApi(user);
  }
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    createWorkoutPlan();
  }

  return {
    handleSubmit,
  }
}