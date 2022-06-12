import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';

const MovementSelect: React.FC = () => {
  const { movements: { data } } = useContext(CreateWorkoutPlanFormContext);

  return (
    <select name="exercise-movements" id="exercise-movements">
      {
        data && data.map(movement => (
          <option key={movement.id} value={movement.id}>{movement.name}</option>
        ))
      }
    </select>
  )
}

export default MovementSelect