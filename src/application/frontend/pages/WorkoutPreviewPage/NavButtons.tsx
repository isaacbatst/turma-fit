import { useAppSelector } from '@application/frontend/store/hooks'
import { selectUnauthenticateWorkoutPlan } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan'
import Link from 'next/link'
import React, { useContext } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { WorkoutContext } from './WorkoutContext'

const NavButtons: React.FC = () => {
  const workoutPlan = useAppSelector(selectUnauthenticateWorkoutPlan);
  const { workout } = useContext(WorkoutContext);

  const workoutIndex = workoutPlan?.workouts.findIndex(workoutIterated => workout.id === workoutIterated.id);

  const hasData = workoutPlan && typeof workoutIndex === 'number' && workoutIndex >= 0;
  const showBackButton = hasData  && workoutIndex > 0;
  const showNextButton = hasData && workoutPlan.workouts[workoutIndex + 1]

  const previousWorkout = typeof workoutIndex === 'number' && workoutPlan?.workouts[workoutIndex - 1];
  const nextWorkout = typeof workoutIndex === 'number' && workoutPlan?.workouts[workoutIndex + 1];

  return (
    <div className='flex'>
      {
        showBackButton && previousWorkout && (
          <Link href={`/workout-preview/${previousWorkout.id}`}>
            <a className={`
            bg-white p-3 text-amber-500 shadow-md hover:scale-105 active:opacity-90
              ${showNextButton ? 'mr-2' : ''}
          `}>
              <HiArrowLeft />
            </a>
          </Link>
        )
      }
      {  
        showNextButton && nextWorkout &&
        (
          <Link href={`/workout-preview/${nextWorkout.id}`}>
            <a className='bg-white p-3 text-amber-500 shadow-md hover:scale-105 active:opacity-90'>
              <HiArrowRight />
            </a>
          </Link>
        )
      }
    </div>
  )
}

export default NavButtons