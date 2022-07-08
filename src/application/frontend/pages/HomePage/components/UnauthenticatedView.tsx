import Header from '@application/frontend/components/common/Header'
import { useAppSelector } from '@application/frontend/store/hooks'
import { selectUnauthenticateWorkoutPlan } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan'
import WorkoutPlanBeingGetted from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted'
import React from 'react'
import CreateUserForm from './CreateUserForm'
import CreateWorkoutPlanForm from './CreateWorkoutPlanForm/CreateWorkoutPlanForm'
import WorkoutPlanCard from './WorkoutPlanCard'

const UnauthenticatedView: React.FC = () => {
  const workoutPlan = useAppSelector(selectUnauthenticateWorkoutPlan);

  return (
    <div className='bg-red-500 min-h-screen	text-white'>
      <section className='text-center'>
        {
          workoutPlan ? (
            <section className='py-5 bg-amber-500 px-3'>
              <WorkoutPlanCard workoutPlan={workoutPlan} />
            </section>
          ) : (
            <CreateWorkoutPlanForm />
          )
        }
      </section>
      <section className='py-5' id="register-user">
        <CreateUserForm />
      </section>
    </div>
  )
}

export default UnauthenticatedView