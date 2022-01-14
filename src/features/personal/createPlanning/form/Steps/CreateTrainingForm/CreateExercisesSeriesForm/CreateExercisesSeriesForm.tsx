import React from 'react'
import { ExerciseSerieBeingCreated } from '../../../types';
import styles from './CreateExercisesSeriesForm.module.scss';
import ExerciseTechniquesRadios from './ExerciseTechniquesRadios';
import { useGetExercisesQuery } from '../../../../api';
import ExercisesSelect from './ExercisesSelect';

type Props = {
  exercisesSeries: ExerciseSerieBeingCreated,
  trainingId: string
}

const CreateExercisesSeriesForm: React.FC<Props> = ({ exercisesSeries, trainingId }) => {
  return (
    <div className={styles.seriesForm}>
      <div className={styles.seriesAndRepetitions}>
        <label htmlFor="">
        Séries
          <input type="text" name="" id="" />
        </label>
        <label htmlFor="">
        Repetições
          <input type="text" name="" id="" />
        </label>
      </div>
      <ExerciseTechniquesRadios trainingId={trainingId} />
      <ExercisesSelect />
    </div>
  )
}

export default CreateExercisesSeriesForm
