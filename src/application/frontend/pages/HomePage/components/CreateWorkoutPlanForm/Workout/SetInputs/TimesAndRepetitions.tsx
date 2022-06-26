import { useAppDispatch } from '@application/frontend/store/hooks';
import { selectSetRepetitions, selectSetTimes, setSetRepetitionsAction, setSetTimesAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  workoutIndex: number,
  setIndex: number
}

const TimesAndRepetitions: React.FC<Props> = ({ setIndex,workoutIndex }) => {
  const dispatch = useAppDispatch();
  const times = useSelector(selectSetTimes(workoutIndex, setIndex));
  const repetitions = useSelector(selectSetRepetitions(workoutIndex, setIndex));
  const [isUntilFailure, setIsUntilFailure] = useState(false);

  const handleRepetitionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const isInvalid = isNaN(Number(value)) && value !== "F";

    if(isInvalid){
      return;
    }

    dispatch(setSetRepetitionsAction({ setIndex, workoutIndex, value: e.target.value }))
  }

  return (
    <div>
      <label htmlFor={`set-times-${workoutIndex}-${setIndex}`}>
            Séries
        <input type="number" name={`set-times-${workoutIndex}-${setIndex}`} id={`set-times-${workoutIndex}-${setIndex}`} value={times} 
          onChange={(e) => dispatch(setSetTimesAction({ setIndex, value: Number(e.target.value), workoutIndex }))}
        />
      </label>
      <label htmlFor={`set-repetitions-${workoutIndex}-${setIndex}`}>
            Repetições
        <input type="text" name={`set-repetitions-${workoutIndex}-${setIndex}`} id={`set-repetitions-${workoutIndex}-${setIndex}`} value={repetitions}
          onChange={handleRepetitionsChange}
          disabled={isUntilFailure}
        />
      </label>
      <label htmlFor={`set-repetitions-failure-${workoutIndex}-${setIndex}`}>
        Até a falha
        <input type="checkbox" 
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
          }}
        />
      </label>
    </div>
  )
}

export default TimesAndRepetitions