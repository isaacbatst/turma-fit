import { addWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux'
import { indexToLetter } from 'src/lib/letters';
import { useSwiper } from 'swiper/react';
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext';

interface Props {
  setShouldGoNext: Dispatch<SetStateAction<boolean>>
}

const AddWorkoutButton: React.FC<Props> = ({ setShouldGoNext }) => {
  const { workoutIndex, workoutsLength } = useContext(WorkoutCheckoutSlideContext);
  
  const dispatch = useDispatch();
  const swiper = useSwiper();
  

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center
      hover:scale-105 cursor-pointer
            active:opacity-75'
      onClick={() => {
        dispatch(addWorkoutAction())
        setShouldGoNext(true);
      }}
    >
      <HiPlus className='mr-2' />Adicionar Treino {indexToLetter(workoutIndex + 1)}
    </button>  )
}

export default AddWorkoutButton