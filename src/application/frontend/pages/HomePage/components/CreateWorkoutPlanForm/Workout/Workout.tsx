import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { addSetAction, CreateWorkoutPlanFormWorkout, removeSetAction, removeWorkoutAction, selectWorkoutId } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import { Letter } from '@domain/entities/WorkoutPlan/enums/Letter'
import React, { memo, useEffect } from 'react'
import SetInputs from './SetInputs/SetInputs'
import AerobicMinutesInput from './AerobicMinutesInput'
import WorkoutDayRadio from './WorkoutDayRadio'
import { SwiperSlide, useSwiper } from 'swiper/react'
import { HiCheck, HiTrash } from 'react-icons/hi'
import AddSetButton from './AddSetButton'
import RemoveSetButton from './RemoveSetButton'
import FinishWorkoutButton from './FinishWorkoutButton'
import SetSlide from './SetSlide'
import WorkoutCheckoutSlide from './WorkoutCheckoutSlide'
import { SetSlideContextProvider } from './SetSlideContext'
import { WorkoutCheckoutSlideContextProvider } from './WorkoutCheckoutSlideContext'

type Props = {
  workout: CreateWorkoutPlanFormWorkout,
  workoutIndex: number,
  workoutsLength: number,
}


const Workout: React.FC<Props> = ({ workout, workoutIndex, workoutsLength }) => {
  const workoutId = useAppSelector(selectWorkoutId(workoutIndex));

  return (
    <>
      {
        workout.sets.map((set, setIndex) => {
          return (
            <SwiperSlide key={set.id}>
              <SetSlideContextProvider 
                setIndex={setIndex} 
                workoutIndex={workoutIndex}
                setsLength={workout.sets.length}
              >
                <SetSlide />
              </SetSlideContextProvider>
            </SwiperSlide>
          )})
      }

      <SwiperSlide>
        <WorkoutCheckoutSlideContextProvider
          workoutId={workoutId}  
          workoutsLength={workoutsLength}
          workoutIndex={workoutIndex}
        >
          <WorkoutCheckoutSlide />
        </WorkoutCheckoutSlideContextProvider>
      </SwiperSlide>
    </>
  )
}

export default memo(Workout)