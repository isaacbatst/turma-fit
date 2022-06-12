import React from 'react'
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { selectWorkoutDay, setWorkoutDayAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import { Day } from '@domain/entities/WorkoutPlan/enums/Day'
import { readableDay } from 'src/lib/days'

type Props = {
  workoutId: number,
  workoutIndex: number
}

const WorkoutDayRadio: React.FC<Props> = ({ workoutId, workoutIndex }) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectWorkoutDay(workoutIndex))

  return (
    <fieldset>
      <legend>Dia do treino</legend>
      {
        Object.values(Day).map(day => (
          <label key={day} htmlFor={`day-workout-${workoutId}-${day}`}>
            <input 
              type="radio" 
              name={`day-workout-${workoutId}`} 
              id={`day-workout-${workoutId}-${day}`} 
              value={day} 
              checked={value === day}
              onChange={(e) => dispatch(setWorkoutDayAction({ workoutIndex, day }))}
            />
            {readableDay[day]}
          </label>
        ))
      }
    </fieldset>
  )
}

export default WorkoutDayRadio