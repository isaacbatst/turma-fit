import React from 'react'
import Exercises from './Exercises'
import ExerciseTechnique from './ExerciseTechnique'
import TimesAndRepetitions from './TimesAndRepetitions'

interface Props {
  setIndex: number,
}

const SetInputs: React.FC<Props> = ({ setIndex }) => {
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