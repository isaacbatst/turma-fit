import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { removeWorkoutAction, selectWorkoutId } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React, { useContext } from 'react'
import { HiCheck, HiTrash } from 'react-icons/hi'
import AerobicMinutesInput from './AerobicMinutesInput'
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext'
import WorkoutDayRadio from './WorkoutDayRadio'

const WorkoutCheckoutSlide: React.FC = () => {
  const { workoutIndex, workoutsLength } = useContext(WorkoutCheckoutSlideContext);
  const dispatch = useAppDispatch();

  return (
    <section className="py-3 px-2 pb-10 bg-lime-300 flex flex-col">
      <AerobicMinutesInput />
      {/* <WorkoutDayRadio /> */}
      <div className="flex">
        <button 
          type="button" 
          className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center'
        >
            Adicionar treino
        </button>
        {
          workoutsLength > 1 && (
            <button 
              type="button" 
              className='border-2 border-white p-2 mr-1 mb-2 flex justify-center items-center'
              onClick={() => dispatch(removeWorkoutAction({ workoutIndex }))
              }>
              <HiTrash />
            </button>
          )
        }
      </div>

      <button 
        type="button" 
        className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center'
      >
        <HiCheck className='m-2'/> Salvar Planejamento
      </button>
    </section>  )
}

export default WorkoutCheckoutSlide