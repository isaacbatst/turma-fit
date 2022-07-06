import { clearWorkoutPlanAction } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan'
import { WorkoutPlanDTO } from '@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { readableDay } from 'src/lib/days'
import { readableMuscleGroups } from 'src/lib/muscleGroups'

type WorkoutPlanCardProps = {
  workoutPlan: WorkoutPlanDTO
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ workoutPlan }) => {
  const { planType, workouts } = workoutPlan;
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between mb-3 items-center">
        <h3 className='font-bold mb-3'>Treino de {planType.name}</h3>
        <button className='p-3 bg-white text-amber-500 hover:scale-105'
          onClick={() => dispatch(clearWorkoutPlanAction())}
        >
          <HiTrash />
        </button>
      </div>
      <ul className='flex flex-col'>
        {workouts.map(({ id, aerobicMinutes, day, letter, muscleGroups }) => (
          <li key={id} className='p-5 bg-white text-stone-800 flex flex-col mb-3 shadow-lg active:opacity-95 cursor-pointer hover:scale-105'>
            <div className="flex justify-between mb-3">
              <h5>Treino {letter}</h5>
              <p className='font-normal text-sm'>{readableDay[day]}</p>
            </div>
            {
              muscleGroups.length > 0 && (
                <ul className='text-white flex mb-3'>
                  {
                    muscleGroups.map(muscleGroup => (
                      <li className='text-xs font-bold bg-green-700 px-3 py-1 shadow-lg mr-2' 
                        key={muscleGroup}>{readableMuscleGroups[muscleGroup]}</li>
                    ))
                  }
                </ul>
              )
            }
            <div className='text-amber-500 font-bold text-xs bg-white shadow-md self-start px-3 py-2'>
              Aeróbico - {aerobicMinutes} minutos
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default WorkoutPlanCard