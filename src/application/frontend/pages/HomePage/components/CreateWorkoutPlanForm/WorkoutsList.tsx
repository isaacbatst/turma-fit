import { useAppSelector } from '@application/frontend/store/hooks';
import { selectWorkouts } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import Workout from './Workout/Workout';

const WorkoutsList: React.FC = () => {
  const workouts = useAppSelector(selectWorkouts);
  const swiper = useSwiper();

  useEffect(() => {
    swiper.updateSlides();
  }, [workouts.length, swiper])

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