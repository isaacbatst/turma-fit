import React, { useContext } from 'react'
import { HiCheck } from 'react-icons/hi'
import { useSwiper } from 'swiper/react'
import { SetSlideContext } from './SetSlideContext';

const FinishWorkoutButton = () => {
  const swiper = useSwiper();
  const { validateSet } = useContext(SetSlideContext)

  return (
    <button
      type='button'
      className='border-2 border-white p-2 mb-2
      flex justify-center items-center
      hover:scale-105 cursor-pointer
            active:opacity-75' 
      onClick={() => {
        const isValid = validateSet();

        if(isValid){
          swiper.slideNext();
        }

      }} 
    >
      <HiCheck className='mr-2' /> Finalizar Treino
    </button>  
  )
}

export default FinishWorkoutButton