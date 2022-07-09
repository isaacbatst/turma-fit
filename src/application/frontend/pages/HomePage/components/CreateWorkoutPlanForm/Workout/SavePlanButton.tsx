import React from 'react';
import { HiCheck } from 'react-icons/hi';
import { useSaveWorkoutPlan } from '../../../hooks/useSaveWorkoutPlan';

const SubmitWorkoutPlan: React.FC = () => {
  const { saveWorkoutPlan } = useSaveWorkoutPlan();

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center
    hover:scale-105 cursor-pointer
          active:opacity-75'
      onClick={saveWorkoutPlan}
    >
      <HiCheck className='m-2'/> Salvar Planejamento
    </button> 
  )
}

export default SubmitWorkoutPlan