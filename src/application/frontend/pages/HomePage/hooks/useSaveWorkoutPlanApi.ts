import { useAppDispatch, useAppSelector } from "@application/frontend/store/hooks";
import { CreateWorkoutPlanFormWorkout, selectPlanType, selectWorkouts, setErrorAction } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
import axios from "axios";

export const useSaveWorkoutPlanApi = () => {
  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();

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
        workoutPlan: {
          planTypeId: planType?.id,
          workouts: workouts.map(workoutFromFormToApi)
        }
      });

      console.log(response)
    } catch (e) {
      console.error(e)
      if(axios.isAxiosError(e) && e.response){
        handleApiError(e.response.data)
      } else {
        return 'UNKNOWN_ERROR'
      }
    }
  }

  return {
    saveOnApi
  }
}

const workoutFromFormToApi = (workout: CreateWorkoutPlanFormWorkout) => ({
  ...workout,
  sets: workout.sets.map(set => ({
    ...set,
    techniqueId: set.technique?.id,
    times: Number(set.times),
    exercises: set.exercises.map(exercise => ({
      ...exercise,
      equipmentId: exercise.equipment?.id,
      movementId: exercise.movement?.id,
    }))
  }))
})
