import { useAppDispatch } from '@application/frontend/store/hooks';
import { addSetAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react'
import { useSwiper } from 'swiper/react';

interface Props {
  workoutIndex: number
}

const AddSetButton: React.FC<Props> = ({ workoutIndex }) => {
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center'
      onClick={() => {
        dispatch(addSetAction({ workoutIndex: workoutIndex }))
        swiper.slideNext();
      }}>
      Adicionar Set
    </button>
  )
}

export default AddSetButton