import { useAppDispatch } from '@application/frontend/store/hooks';
import { selectSetRepetitions, selectSetTimes, setSetRepetitionsAction, setSetTimesAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SetSlideContext } from '../SetSlideContext';

const TimesAndRepetitions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setIndex, workoutIndex } = useContext(SetSlideContext);
  const times = useSelector(selectSetTimes(workoutIndex, setIndex));
  const repetitions = useSelector(selectSetRepetitions(workoutIndex, setIndex));
  const [isUntilFailure, setIsUntilFailure] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const repetitionsRef = useRef<HTMLInputElement>(null)

  const handleRepetitionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const isInvalid = isNaN(Number(value)) && value !== "F";

    if(isInvalid){
      return;
    }

    dispatch(setSetRepetitionsAction({ setIndex, workoutIndex, value: e.target.value }))
  }

  useEffect(() => {
    if(shouldFocus){
      repetitionsRef.current?.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus])

  return (
    <div className='mb-2'>
      <div className='flex justify-evenly mb-2'>
        <div className="flex flex-col items-center">
          <label htmlFor={`set-times-${workoutIndex}-${setIndex}`}
            className="text-sm mb-1"
          >
            Séries
          </label>
          <input 
            type="tel" 
            className='w-12 text-center py-1 outline-red-500 border-2 border-white
            bg-transparent text-white focus:text-stone-800 focus:bg-white'
            name={`set-times-${workoutIndex}-${setIndex}`} 
            id={`set-times-${workoutIndex}-${setIndex}`} 
            value={times} 
            onChange={(e) => {
              if(!isNaN(Number(e.target.value))){
                dispatch(setSetTimesAction({ setIndex, value: Number(e.target.value), workoutIndex }))
              }
            }}
          />
        </div>
        <div className='flex items-end'>
          <div className="flex flex-col items-center mx-3">
            <label htmlFor={`set-repetitions-${workoutIndex}-${setIndex}`}
              className="text-sm mb-1"
            >
            Repetições
            </label>
            <input type="text" 
              className='w-12 text-center py-1 outline-red-500  border-2 border-white
            bg-transparent text-white focus:text-stone-800 focus:bg-white disabled:bg-stone-300'
              name={`set-repetitions-${workoutIndex}-${setIndex}`} id={`set-repetitions-${workoutIndex}-${setIndex}`} value={repetitions}
              onChange={handleRepetitionsChange}
              disabled={isUntilFailure}
              ref={repetitionsRef}
            />
          </div>
          <div>
            <input type="checkbox"
              className='appearance-none peer hidden'
              name={`set-repetitions-failure-${workoutIndex}-${setIndex}`} 
              id={`set-repetitions-failure-${workoutIndex}-${setIndex}`} 
              checked={isUntilFailure}
              onChange={(e) => {
                dispatch(setSetRepetitionsAction({
                  setIndex,
                  workoutIndex,
                  value: e.target.checked ? "F" : ""
                }))
                
                setIsUntilFailure(e.target.checked)

                if(!e.target.checked){
                  setShouldFocus(true);
                }
              }}
            />
            <label 
              className='p-2 border-2 border-white block text-sm 
                          peer-checked:bg-white peer-checked:text-blue-900
                          hover:scale-105 cursor-pointer
                          active:opacity-75'
              htmlFor={`set-repetitions-failure-${workoutIndex}-${setIndex}`}>
              Até a falha
            </label>
          </div>
        
        </div>
       
      </div>
      
    </div>
  )
}

export default TimesAndRepetitions