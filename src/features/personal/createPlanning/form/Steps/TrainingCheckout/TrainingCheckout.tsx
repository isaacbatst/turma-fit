import React from 'react'
import { AerobicInput } from '../AerobicInput/AerobicInput'
import { useTrainingCheckoutContext } from './TrainingCheckoutContext'
import styles from './TrainingCheckout.module.scss'

const TrainingCheckout: React.FC = () => {
  const { training } = useTrainingCheckoutContext();  
  console.log(training)

  return (
    <div className={styles.checkoutWrapper}>
      <h3>Checkout do Treino {training.letter}</h3>
      <AerobicInput training={training} />
      <div>
        <p>Exercícios</p>
        {
          training.exercisesSeries
            .map(series => series.exercises
              .map(exercise => `${exercise.name} - ${series.times}x${series.repetitions}`)
            )
        }
      </div>
      <div>
        {
          training.exercisesSeries
            .flatMap(series => series.exercises)
            .flatMap(exercise => exercise.muscleGroups)
            .map(muscleGroup => muscleGroup.name)
            .filter((muscleGroup, index, array) => array.indexOf(muscleGroup) === index)
        }
      </div>
      
    </div>
  )
}

export default TrainingCheckout
