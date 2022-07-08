import React, { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { selectWorkoutDay, setWorkoutDayAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import { Day } from '@domain/entities/WorkoutPlan/enums/Day'
import { readableDay } from 'src/lib/days'
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext'

const WorkoutDayRadio: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workoutId, workoutIndex } = useContext(WorkoutCheckoutSlideContext);
  const value = useAppSelector(selectWorkoutDay(workoutIndex))

  return (
    <fieldset>
      <legend className='mb-2'>Dia do treino</legend>
      <div className="flex flex-wrap justify-evenly mb-2">
        {
          Object.values(Day).map(day => (
            <div key={day} className="mb-2">
              <input 
                type="radio" 
                name={`day-workout-${workoutId}`} 
                id={`day-workout-${workoutId}-${day}`} 
                value={day} 
                className="appearance-none peer hidden"
                checked={value === day}
                onChange={(e) => dispatch(setWorkoutDayAction({ workoutIndex, day }))}
              />
              <label
                className='p-2 border-2 mx-1 border-white block 
          peer-checked:bg-white peer-checked:text-blue-900
            hover:scale-105 cursor-pointer
            active:opacity-75' 
                htmlFor={`day-workout-${workoutId}-${day}`}>

                {readableDay[day]}
              </label>
            </div>
          ))
        }
      </div>
    </fieldset>
  )
}

export default WorkoutDayRadio