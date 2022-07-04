import { addWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext, useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux'
import { indexToLetter } from 'src/lib/letters';
import { useSwiper } from 'swiper/react';
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext';

const AddWorkoutButton: React.FC = () => {
  const { workoutIndex } = useContext(WorkoutCheckoutSlideContext);
  
  const dispatch = useDispatch();
  const swiper = useSwiper();
  
  const [shouldGoNext, setShouldGoNext] = useState(false);
  
  useEffect(() => {
    console.log(shouldGoNext, 'going next')
    if(shouldGoNext){
      swiper.updateSlides();
      swiper.slideNext();
      setShouldGoNext(false);
    }
  }, [swiper, shouldGoNext])
  
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