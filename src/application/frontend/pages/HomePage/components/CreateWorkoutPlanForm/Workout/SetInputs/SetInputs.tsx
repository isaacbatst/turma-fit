import { useAppDispatch } from '@application/frontend/store/hooks'
import { removeSetAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import Exercises from './Exercises'
import ExerciseTechnique from './ExerciseTechnique'
import TimesAndRepetitions from './TimesAndRepetitions'

interface Props {
  setIndex: number,
  workoutIndex: number,
  id: string
}

const SetInputs: React.FC<Props> = ({ setIndex, workoutIndex, id }) => {
  return (
    <div className='flex flex-col'>
      <h4 className='mb-2 text-sm'>Set de Exercícios {setIndex + 1}</h4>
      <Exercises />
      <TimesAndRepetitions />
      <ExerciseTechnique />
    </div>
  )
}

export default SetInputs