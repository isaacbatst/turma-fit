import React from 'react'
import { useMovements } from '../useMovements'

const MovementSelect: React.FC = () => {
  const { movements } = useMovements();

  return (
    <select name="exercise-movements" id="exercise-movements">
      {
        movements && movements.map(movement => (
          <option key={movement.id} value={movement.id}>{movement.name}</option>
        ))
      }
    </select>
  )
}

export default MovementSelect