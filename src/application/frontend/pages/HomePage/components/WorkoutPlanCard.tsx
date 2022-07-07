import { clearWorkoutPlanAction } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan'
import { WorkoutPlanDTO } from '@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import WorkoutCard from './WorkoutCard'

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
        {workouts.map((workout) => (
          <WorkoutCard workout={workout} key={workout.id}/> 
        ))}
      </ul>
    </>
  )
}

export default WorkoutPlanCard