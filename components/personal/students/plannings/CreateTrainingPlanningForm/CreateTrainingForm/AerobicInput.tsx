import React from 'react';
import { TrainingBeingCreated } from '../CreateTrainingPlanningFormReducer';

type Props = {
  training: TrainingBeingCreated;
}

export const AerobicInput: React.FC<Props> = ({ training }) => {
  return (
    <label htmlFor={`aerobic-minutes-${training.letter}`}>
      <span>
        Minutos de Aeróbico
      </span>
      <input type="number" />
    </label>
  )
}
