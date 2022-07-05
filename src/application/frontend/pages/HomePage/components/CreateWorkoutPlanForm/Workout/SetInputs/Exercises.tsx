import { useAppSelector } from '@application/frontend/store/hooks';
import { selectExercises } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { useSwiper } from 'swiper/react';
import { SetSlideContext } from '../SetSlideContext';
import Exercise from './Exercise';
import { ExerciseContextProvider } from './ExerciseContext';


const Exercises: React.FC = () => {
  const { setIndex, workoutIndex } = useContext(SetSlideContext);
  const exercises = useAppSelector(selectExercises(workoutIndex, setIndex))

  // const swiper = useSwiper();
  // useEffect(() => {
  //   swiper.updateAutoHeight();
  // }, [exercises.length, swiper])

  return (
    <div className='flex flex-col divide-y'>
      {
        exercises.map((exercise, exerciseIndex) => {
          return (
            <ExerciseContextProvider
              exerciseIndex={exerciseIndex}
              exercisesLength={exercises.length}
              key={exercise.id}
            >
              <Exercise />
            </ExerciseContextProvider>
          )
        })
      }
    </div>
  )
}

export default Exercises