import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectPlanType, selectWorkouts, setErrorAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import { useUser } from '@application/frontend/swr/useUser';
import axios from 'axios';
import React from 'react';
import { HiCheck } from 'react-icons/hi';

const SubmitWorkoutPlan: React.FC = () => {
  const planType = useAppSelector(selectPlanType);
  const workouts = useAppSelector(selectWorkouts);
  const dispatch = useAppDispatch();

  const { user } = useUser();

  const handleApiError = (body: unknown) => {
    const castBody = body as { error: unknown };

    if(body && castBody.error && typeof castBody.error === 'string'){
      return dispatch(setErrorAction({ error: castBody.error }))
    } 

    return 'UNKNOWN_ERROR';
  }

  const createWorkoutPlan = async () => {
    if(!user) {
      return;
    }

    dispatch(setErrorAction({ error: null }));

    try {
      const response = await axios.post(`/api/user/${user.id}/workout-plans`, {
        workoutPlan: {
          planTypeId: planType?.id,
          workouts: workouts
        }
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
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    createWorkoutPlan();
  }

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center
    hover:scale-105 cursor-pointer
          active:opacity-75'
      onClick={handleSubmit}
    >
      <HiCheck className='m-2'/> Salvar Planejamento
    </button> 
  )
}

export default SubmitWorkoutPlan