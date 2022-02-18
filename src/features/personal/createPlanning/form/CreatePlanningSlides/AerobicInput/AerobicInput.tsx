import React from 'react';
import { TrainingBeingCreated } from '../../types';
import styles from './AerobicInput.module.scss'

type Props = {
  training: TrainingBeingCreated;
}

const AerobicInput: React.FC<Props> = ({ training }) => {
  return (
    <label className={styles.inputLabel} htmlFor={`aerobic-minutes-${training.letter}`}>
      <span className={styles.title}>
        Tempo de Aeróbico (minutos)
      </span>
      <input type="number" />
    </label>
  )
}


export default AerobicInput