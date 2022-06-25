import { useAppSelector } from '@application/frontend/store/hooks';
import React from 'react'
import Workout from './Workout/Workout';

const WorkoutsList: React.FC = () => {
  const workouts = useAppSelector(state => state.createWorkoutPlanForm.workouts);

  return (
    <>
      {
        workouts.map((workout, workoutIndex) => (
          <Workout key={workout.id} workout={workout} workoutIndex={workoutIndex} />
        ))
      }
    </>
  )
}

export default WorkoutsList