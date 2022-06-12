import React from 'react'
import { Grip } from '@domain/entities/WorkoutPlan/enums/Grip';

const readableGrip: Record<Grip, string> = {
  NEUTRAL: 'Neutra',
  PRONATE: 'Pronada',
  SUPINE: 'Supinada'
}

const GripRadio: React.FC = () => {
  return (
    <>
      {
        Object.values(Grip).map(grip => (
          <label key={grip} htmlFor={`grip-radio-${grip}`}>
            <input type="radio" name={`grip-radio`} id={`grip-radio-${grip}`} value={grip} />
            {readableGrip[grip]}
          </label>
        ))
      }
    </>
  )
}

export default GripRadio