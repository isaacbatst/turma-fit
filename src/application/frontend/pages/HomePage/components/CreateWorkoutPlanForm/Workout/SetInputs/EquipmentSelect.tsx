import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';

const EquipmentSelect: React.FC = () => {
  const { equipments: { data } } = useContext(CreateWorkoutPlanFormContext);

  return (
    <select name="exercise-equipments" id="exercise-equipments">
      {
        data && data.map(equipment => (
          <option key={equipment.id} value={equipment.id}>{equipment.name}</option>
        ))
      }
    </select>
  )
}

export default EquipmentSelect