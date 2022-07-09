import React from 'react';
import { useContext } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useSaveWorkoutPlan } from '../../../hooks/useSaveWorkoutPlan';
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext';

const SubmitWorkoutPlan: React.FC = () => {
  const { setError } = useContext(WorkoutCheckoutSlideContext)
  const { saveWorkoutPlan } = useSaveWorkoutPlan();

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center
    hover:scale-105 cursor-pointer
          active:opacity-75'
      onClick={(e) => {
        setError(null);
        saveWorkoutPlan(e)
      }}
    >
      <HiCheck className='m-2'/> Salvar Planejamento
    </button> 
  )
}

export default SubmitWorkoutPlan