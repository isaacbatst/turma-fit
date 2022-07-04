import { useAppSelector } from '@application/frontend/store/hooks';
import { selectWorkouts } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react';
import Workout from './Workout/Workout';

const WorkoutsList: React.FC = () => {
  const workouts = useAppSelector(selectWorkouts);

  return (
    <>
      {
        workouts.map((workout, workoutIndex) => (
          <Workout 
            key={workout.id} 
            workout={workout} 
            workoutIndex={workoutIndex} 
            workoutsLength={workouts.length}
          />
        ))
      }
    </>
  )
}

WorkoutsList.displayName = 'SwiperSlide';

export default WorkoutsList