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
      <div className={styles.exercises}>
        <p className={styles.title}>Exercícios</p>
        {
          training.exercisesSeries
            .map(series => {
              const exercises = series.exercises
                .map(exercise => exercise.name)
              
              return <div 
                className={styles.checkoutItem} 
                key={series.id}>
                {`${exercises.join(' + ')} - ${series.times}x${series.repetitions} ${series.exerciseTechnique && `(${series.exerciseTechnique.name})`}`}
              </div>
            })
        }
      </div>
      <div>
        <p className={styles.title}>Grupos musculares</p>
        {
          training.exercisesSeries
            .flatMap(series => series.exercises)
            .flatMap(exercise => exercise.muscleGroups)
            .map(muscleGroup => muscleGroup.name)
            .filter((muscleGroup, index, array) => array.indexOf(muscleGroup) === index)
            .map(muscleGroup => (
              <div key={muscleGroup} className={styles.checkoutItem}>{muscleGroup}</div>
            ))
        }
      </div>
      <AerobicInput training={training} />
    </div>
  )
}

export default TrainingCheckout
