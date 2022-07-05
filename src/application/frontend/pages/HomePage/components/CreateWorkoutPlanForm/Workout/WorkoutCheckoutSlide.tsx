import { WorkoutList } from '@domain/entities/WorkoutPlan/WorkoutList'
import React, { useContext, useEffect, useState } from 'react'
import { indexToLetter } from 'src/lib/letters'
import { useSwiper } from 'swiper/react'
import AddWorkoutButton from './AddWorkoutButton'
import AerobicMinutesInput from './AerobicMinutesInput'
import RemoveWorkoutButton from './RemoveWorkoutButton'
import SavePlanButton from './SavePlanButton';
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext'
import WorkoutDayRadio from './WorkoutDayRadio'

const WorkoutCheckoutSlide: React.FC = () => {
  const { workoutIndex, workoutsLength } = useContext(WorkoutCheckoutSlideContext);
  const isLastWorkout = workoutIndex === workoutsLength - 1;
  const isMaxWorkoutsLength = workoutsLength >= WorkoutList.WORKOUTS_MAX_LENGTH;

  const [shouldGoNext, setShouldGoNext] = useState(false);
  const swiper = useSwiper();
  
  useEffect(() => {
    if(shouldGoNext){
      console.log(shouldGoNext, 'going next');
      swiper.updateSlides();
      swiper.slideNext();
      setShouldGoNext(false);
    }
  }, [shouldGoNext, swiper])
  

  return (
    <section className="py-3 px-2 pb-10 bg-lime-300 flex flex-col">
      <h3 className='font-bold mb-2'>Treino {indexToLetter(workoutIndex)}</h3>
      <AerobicMinutesInput />
      <WorkoutDayRadio />
      <div className="flex">
        {
          isLastWorkout && !isMaxWorkoutsLength && (
            <AddWorkoutButton setShouldGoNext={setShouldGoNext} />
          )
        }
        {
          workoutsLength > 1 && <RemoveWorkoutButton />
        }
      </div>

      {
        isLastWorkout && <SavePlanButton />
      }
    </section>  )
}

export default WorkoutCheckoutSlide