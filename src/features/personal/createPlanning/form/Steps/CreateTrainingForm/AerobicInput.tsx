import React from 'react';
import { TrainingBeingCreated } from '../../types';

type Props = {
  training: TrainingBeingCreated;
}

export const AerobicInput: React.FC<Props> = ({ training }) => {
  return (
    <label htmlFor={`aerobic-minutes-${training.letter}`}>
      <span>
        Tempo de Aeróbico (minutos)
      </span>
      <input type="number" />
    </label>
  )
}
