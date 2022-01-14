import React from 'react'
import AddExercisesSeriesButton from '../AddExercisesSeriesButton/AddExercisesSeriesButton'
import { useExercisesSeriesSlideContext } from './ExercisesSeriesSlideContext'
import ExercisesSelect from '../ExercisesSelect'
import ExerciseTechniquesRadios from '../ExerciseTechniquesRadios'
import GoToTrainingCheckoutButton from '../GoToTrainingCheckoutButton/GoToTrainingCheckoutButton'
import SeriesAndRepetitions from '../SeriesAndRepetitions'
import styles from '../styles.module.scss'

const ExercisesSeriesSlide = () => {
  const { training, exercisesSeriesIndex, lastExerciseSeriesIndex, lastTrainingIndex } = useExercisesSeriesSlideContext();

  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Treino {training.letter}</p>
      <p className={styles.subtitle}>Série de Exercícios {exercisesSeriesIndex + 1}</p>
      <ExercisesSelect />
      <SeriesAndRepetitions  />
      <ExerciseTechniquesRadios />
      {
        lastExerciseSeriesIndex === exercisesSeriesIndex && (
          <div className={styles.buttonsWrapper}>
            <AddExercisesSeriesButton />
            <GoToTrainingCheckoutButton />
          </div>
        )
      }
    </div>
  )
}

export default ExercisesSeriesSlide
