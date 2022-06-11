import React from 'react'
import ExercisesSelect from './ExercisesSelect'
import ExerciseTechnique from './ExerciseTechnique'
import TimesAndRepetitions from './TimesAndRepetitions'

const SetInputs: React.FC = () => {
  return (
    <>
      <h4>Série 1</h4>
      <ExercisesSelect />
      <TimesAndRepetitions />
      <ExerciseTechnique />
    </>
  )
}

export default SetInputs