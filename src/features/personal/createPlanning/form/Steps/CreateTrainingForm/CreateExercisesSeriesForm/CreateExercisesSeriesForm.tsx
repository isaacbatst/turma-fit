import React from 'react'
import { ExerciseSerieBeingCreated } from '../../../types';
import styles from './CreateExercisesSeriesForm.module.scss';
import ExerciseTechniquesRadios from './ExerciseTechniquesRadios';
import ExercisesSelect from './ExercisesSelect';
import MuscleGroupsPreview from './MuscleGroupsPreview';
import SeriesAndRepetitions from './SeriesAndRepetitions';

type Props = {
  exercisesSeries: ExerciseSerieBeingCreated,
  trainingIndex: number,
  index: number
}

const CreateExercisesSeriesForm: React.FC<Props> = ({ exercisesSeries, trainingIndex, index }) => {
  return (
    <div className={styles.seriesForm}>
      <hr />
      <ExercisesSelect trainingIndex={trainingIndex} index={index} />
      <MuscleGroupsPreview exercisesSeries={exercisesSeries} trainingIndex={trainingIndex} index={index} />
      <SeriesAndRepetitions />
      <ExerciseTechniquesRadios trainingIndex={trainingIndex} />
      <hr />
    </div>
  )
}

export default CreateExercisesSeriesForm
