import React from 'react'
import { useEquipments } from '../useEquipments';

const EquipmentSelect: React.FC = () => {
  const { equipments } = useEquipments();

  return (
    <select name="exercise-equipments" id="exercise-equipments">
      {
        equipments && equipments.map(equipment => (
          <option key={equipment.id} value={equipment.id}>{equipment.name}</option>
        ))
      }
    </select>
  )
}

export default EquipmentSelect