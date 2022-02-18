import React from 'react';
import { TrainingBeingCreated } from '../../types';
import styles from './AerobicInput.module.scss'

type Props = {
  training: TrainingBeingCreated;
}

export const AerobicInput: React.FC<Props> = ({ training }) => {
  return (
    <label className={styles.inputLabel} htmlFor={`aerobic-minutes-${training.letter}`}>
      <span>
        Tempo de Aeróbico (minutos)
      </span>
      <input type="number" />
    </label>
  )
}
