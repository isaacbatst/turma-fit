import React from 'react'
import AddSetButton from '../AddSetButton/AddSetButton'
import { useSetSlideContext } from './SetSlideContext'
import MovementsSelect from './ExercisesSelects/MovementsSelect'
import ExerciseTechniquesRadios from './ExerciseTechniquesRadios'
import GoToTrainingCheckoutButton from '../GoToTrainingCheckoutButton/GoToTrainingCheckoutButton'
import TimesAndRepetitions from './TimesAndRepetitions'
import styles from '../styles.module.scss'
import ExercisesSelects from './ExercisesSelects/ExercisesSelects'

const SetSlide = () => {
  const { training, setIndex, lastSetIndex, lastTrainingIndex } = useSetSlideContext();

  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Treino {training.letter}</p>
      <p className={styles.subtitle}>Série de Exercícios {setIndex + 1}</p>
      <ExercisesSelects />
      <TimesAndRepetitions  />
      <ExerciseTechniquesRadios />
      {
        lastSetIndex === setIndex && (
          <div className={styles.buttonsWrapper}>
            <AddSetButton />
            <GoToTrainingCheckoutButton />
          </div>
        )
      }
    </div>
  )
}

export default SetSlide
