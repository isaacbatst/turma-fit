import React from 'react'
import { HiCheck } from 'react-icons/hi'
import { useSwiper } from 'swiper/react'

const FinishWorkoutButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type='button'
      className='border-2 border-white p-2 mb-2
      flex justify-center items-center' 
      onClick={() => {
        swiper.slideNext();
      }} 
    >
      <HiCheck className='mr-2' /> Finalizar Treino
    </button>  
  )
}

export default FinishWorkoutButton