import React from 'react'
import { useGetExerciseTechniquesQuery } from '../../../../api';
import { ExerciseSerieBeingCreated } from '../../../types';
import styles from './CreateExercisesSeriesForm.module.scss';
import ExerciseTechniquesRadios from './ExerciseTechniquesRadios';

type Props = {
  exercisesSeries: ExerciseSerieBeingCreated,
  trainingId: string
}

const CreateExercisesSeriesForm: React.FC<Props> = ({ exercisesSeries, trainingId }) => {
  const { data: exerciseTechniques } = useGetExerciseTechniquesQuery();

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
      {exerciseTechniques && (
        <ExerciseTechniquesRadios  
          exerciseTechniques={exerciseTechniques}
          trainingId={trainingId}
        />
      )}
    </div>
  )
}

export default CreateExercisesSeriesForm
