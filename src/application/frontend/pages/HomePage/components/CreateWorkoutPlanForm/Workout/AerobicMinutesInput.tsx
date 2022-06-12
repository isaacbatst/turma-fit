import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { selectAerobicMinutes, setAerobicInputAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'

type Props = {
  workoutId: number,
  workoutIndex: number
}

const AerobicMinutesInput: React.FC<Props> = ({ workoutId, workoutIndex }) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectAerobicMinutes(workoutIndex));

  return (
    <div>
      <label htmlFor={`aerobic-minutes-workout-${workoutId}`}>
          Tempo de aeróbico (minutos)
        <input 
          type="number" 
          min={1} 
          id={`aerobic-minutes-workout-${workoutId}`} 
          onChange={(e) => dispatch(setAerobicInputAction({ value: Number(e.target.value), workoutIndex }))}
          value={value}
        />
      </label>
    </div>
  )
}

export default AerobicMinutesInput