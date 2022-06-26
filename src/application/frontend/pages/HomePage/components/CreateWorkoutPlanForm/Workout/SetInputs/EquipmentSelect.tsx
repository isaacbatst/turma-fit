import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseEquipment, setExerciseEquipmentAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';
import { ExerciseContext, ExerciseContextValue } from './ExerciseContext';

const EquipmentSelect: React.FC = () => {
  const { equipments: { data } } = useContext(CreateWorkoutPlanFormContext);
  const { exerciseIndex, setIndex, workoutIndex } = useContext(ExerciseContext) as ExerciseContextValue;

  const selectedEquipment = useAppSelector(selectExerciseEquipment(workoutIndex, setIndex, exerciseIndex));
  const dispatch = useAppDispatch();

  return (
    <select 
      name="exercise-equipments" 
      id="exercise-equipments" 
      value={selectedEquipment}
      onChange={(e) => dispatch(setExerciseEquipmentAction({
        equipmentId: e.target.value === "none" || e.target.value === "" ? undefined : e.target.value,
        exerciseIndex,
        setIndex,
        workoutIndex
      }))}
    >
      <option disabled value="">Equipamento</option>
      {
        data && data.map(equipment => (
          <option key={equipment.id} value={equipment.id}>{equipment.name}</option>
        ))
      }
      <option value="none">Nenhum</option>
    </select>
  )
}

export default EquipmentSelect