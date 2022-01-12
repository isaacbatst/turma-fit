import React from 'react'
import { ExerciseSerieBeingCreated } from '../../store/types';
import styles from './CreateExercisesSeriesForm.module.scss';

type Props = {
  exercisesSeries: ExerciseSerieBeingCreated
}

const CreateExercisesSeriesForm: React.FC<Props> = ({ exercisesSeries }) => {
  return (
    <div className={styles.seriesForm}>
      <label htmlFor="">
        Séries
        <input type="text" name="" id="" />
      </label>
      <label htmlFor="">
        Repetições
        <input type="text" name="" id="" />
      </label>
    </div>
  )
}

export default CreateExercisesSeriesForm
