import { useAppDispatch } from '@application/frontend/store/hooks'
import { removeSetAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'
import ExercisesSelect from './ExercisesSelect'
import ExerciseTechnique from './ExerciseTechnique'
import TimesAndRepetitions from './TimesAndRepetitions'

interface Props {
  setIndex: number,
  workoutIndex: number,
  id: number
}

const SetInputs: React.FC<Props> = ({ setIndex, workoutIndex, id }) => {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <h4>Série {setIndex + 1}</h4>
      <button 
        type="button" 
        onClick={() => dispatch(removeSetAction({ setIndex, workoutIndex }))}
      >
        Remover série
      </button>
      <ExercisesSelect />
      <TimesAndRepetitions />
      <ExerciseTechnique />
    </>
  )
}

export default SetInputs