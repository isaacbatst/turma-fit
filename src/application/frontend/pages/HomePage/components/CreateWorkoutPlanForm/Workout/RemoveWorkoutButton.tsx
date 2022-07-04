import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { removeWorkoutAction, selectWorkoutSetsLength } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import { WorkoutList } from '@domain/entities/WorkoutPlan/WorkoutList';
import React, { useContext } from 'react'
import { HiTrash } from 'react-icons/hi';
import { useSwiper } from 'swiper/react';
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext';

const RemoveWorkoutButton: React.FC = () => {
  const { workoutIndex, workoutsLength } = useContext(WorkoutCheckoutSlideContext);
  const isLastWorkout = workoutIndex === workoutsLength - 1;
  const setsLength = useAppSelector(selectWorkoutSetsLength(workoutIndex));
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  return (
    <button 
      type="button" 
      className={`border-2 border-white p-2 mr-1 mb-2 flex justify-center items-center 
      hover:scale-105 cursor-pointer
        active:opacity-75
        ${!isLastWorkout && 'flex-1'}`}
      onClick={() => {
        swiper.once('slidePrevTransitionEnd', () => {
          dispatch(removeWorkoutAction({ workoutIndex }))
        })

        Array.from({length: setsLength + 1}, () => true)
          .forEach(() => {
            swiper.slidePrev();
          });

      }}
    >
      <HiTrash  /> 
    </button>  )
}

export default RemoveWorkoutButton