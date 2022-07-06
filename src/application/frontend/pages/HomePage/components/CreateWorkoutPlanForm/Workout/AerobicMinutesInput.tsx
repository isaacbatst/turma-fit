import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { selectAerobicMinutes, setAerobicInputAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { WorkoutCheckoutSlideContext } from './WorkoutCheckoutSlideContext'

const AerobicMinutesInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workoutId, workoutIndex } = useContext(WorkoutCheckoutSlideContext);

  const value = useAppSelector(selectAerobicMinutes(workoutIndex));
  const [hasAerobic, setHasAerobic] = useState(true);
  const [shouldFocus, setShouldFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(shouldFocus){
      inputRef.current?.focus();

      setShouldFocus(false)
    }
  }, [shouldFocus])

  return (
    <div className='flex flex-col items-center mb-3'>
      <label 
        className='mb-2'
        htmlFor={`aerobic-minutes-workout-${workoutId}`}>
          Tempo de aeróbico (minutos)
      </label>
      <div className='flex'>
        <input 
          type="tel" 
          min={0} 
          ref={inputRef}
          disabled={!hasAerobic}
          className='w-12 text-center py-1 outline-red-500 border-2 border-white
          bg-transparent mr-2 text-white focus:text-stone-800 focus:bg-white
          disabled:bg-stone-300'          id={`aerobic-minutes-workout-${workoutId}`} 
          onChange={(e) => {
            if(!isNaN(Number(e.target.value))){
              dispatch(setAerobicInputAction({ value: Number(e.target.value), workoutIndex }))
            }
          }}
          value={value}
        />
        <input type="checkbox"
          className='appearance-none peer hidden'
          name={`workout-has-aerobic-${workoutIndex}`} 
          id={`workout-has-aerobic-${workoutIndex}`} 
          checked={!hasAerobic}
          onChange={(e) => {
            if(e.target.checked){
              dispatch(setAerobicInputAction({
                value: 0,
                workoutIndex
              }))
            } else {
              setShouldFocus(true);
            }

            setHasAerobic(!e.target.checked)
          }}
        />
        <label 
          className='p-2 border-2 border-white block 
          peer-checked:bg-white peer-checked:text-blue-900
            hover:scale-105 cursor-pointer
            active:opacity-75'
          htmlFor={`workout-has-aerobic-${workoutIndex}`}>
          {hasAerobic ? 'Remover' : 'Adicionar'} aeróbico
        </label>
      </div>
    </div>
  )
}

export default AerobicMinutesInput