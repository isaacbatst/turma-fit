import React from 'react'
import { AerobicInput } from '../AerobicInput/AerobicInput'
import { useTrainingCheckoutContext } from './TrainingCheckoutContext'
import styles from './TrainingCheckout.module.scss'

const TrainingCheckout: React.FC = () => {
  const { training } = useTrainingCheckoutContext();  
  console.log(training.exercisesSeries)

  return (
    <div className={styles.checkoutWrapper}>
      <h3>Checkout do Treino {training.letter}</h3>
      <AerobicInput training={training} />
      {

      }
    </div>
  )
}

export default TrainingCheckout
