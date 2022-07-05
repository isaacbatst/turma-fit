import { useAppSelector } from '@application/frontend/store/hooks'
import { CreateWorkoutPlanFormWorkout, selectWorkoutId } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React, { memo } from 'react'
import { SwiperSlide } from 'swiper/react'
import SetSlide from './SetSlide'
import { SetSlideContextProvider } from './SetSlideContext'
import WorkoutCheckoutSlide from './WorkoutCheckoutSlide'
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