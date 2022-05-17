import React from 'react'
import AerobicInput  from '../AerobicInput/AerobicInput'
import { useTrainingCheckoutContext } from './TrainingCheckoutContext'
import styles from './TrainingCheckout.module.scss'
import { gripMapToLabel } from '../../../../../../../../lib/grips'

const TrainingCheckout: React.FC = () => {
  const { training } = useTrainingCheckoutContext();

  return (
    <div className={styles.checkoutWrapper}>
      <h3>Checkout do Treino {training.letter}</h3>
      <div className={styles.exercises}>
        <p className={styles.title}>Séries de Exercícios</p>
        {
          training.sets
            .filter(set => set.exercises.every(exercise => exercise.movement))
            .map(set => {
              const exercises = set.exercises
                .map(exercise => {
                  return `
                    ${exercise.movement?.name} 
                    ${exercise.equipment ? exercise.equipment.name : ''}
                    ${exercise.grip ? `Pegada ${gripMapToLabel[exercise.grip]}` : ''}
                  `
                })

              return <div
                className={styles.checkoutItem}
                key={set.id}>
                <span className='exercises'>
                  {exercises.join(' + ')}
                </span>
                <span className='timesAndRepetitions'>
                  {` - ${set.times}x${set.repetitions}`}
                </span>
                {
                  set.exerciseTechnique && (
                    <span className="exerciseTechnique">
                      {` - `}{set.exerciseTechnique.name}
                    </span>
                  )
                }
              </div>
            })
        }
      </div>
      <div>
        <p className={styles.title}>Grupos musculares</p>
        {
          training.sets
            .flatMap(set => set.exercises)
            .flatMap(exercise => exercise.movement)
            .filter(movement => movement)
            .flatMap(movement => movement?.focusedMuscleGroup)
            .map(muscleGroup => muscleGroup?.name)
            .filter((muscleGroup, index, array) => array.indexOf(muscleGroup) === index)
            .map(muscleGroup => {

              return (
                <div key={muscleGroup} className={styles.badge}>{muscleGroup}</div>
              )
            })
        }
      </div>
      <AerobicInput training={training} />
    </div>
  )
}

export default TrainingCheckout
