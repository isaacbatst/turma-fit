import Header from '@application/frontend/components/common/Header';
import { useAppSelector } from '@application/frontend/store/hooks';
import { selectUnauthenticatedWorkout } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan';
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Workout from './Workout';
import { WorkoutContextProvider } from './WorkoutContext';

const WorkoutPreviewPage: NextPage = () => {
  const router = useRouter();

  if(!router.query.id || typeof router.query.id !== "string"){
    router.push('/');
  }

  const workout = useAppSelector(selectUnauthenticatedWorkout(router.query.id as string))

  if(!workout) {
    router.push('/')
  }

  return (
    <div className='min-h-screen bg-amber-500'>
      <Header />
      <main>
        {workout && (
          <WorkoutContextProvider workout={workout}>
            <Workout />
          </WorkoutContextProvider>
        )}
      </main>
    </div>
  )
}

export default WorkoutPreviewPage