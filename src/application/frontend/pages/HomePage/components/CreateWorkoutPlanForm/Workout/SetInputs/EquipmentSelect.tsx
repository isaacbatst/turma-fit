import ApiHandlerWrapper from '@application/frontend/components/common/ApiHandlerWrapper';
import Loading from '@application/frontend/components/common/Loading';
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseEquipment, setExerciseEquipmentAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';
import { SetSlideContext } from '../SetSlideContext';
import { ExerciseContext, ExerciseContextValue } from './ExerciseContext';

const EquipmentSelect: React.FC = () => {
  const { equipments: { data: equipments, isLoading, error } } = useContext(CreateWorkoutPlanFormContext);
  const { exerciseIndex } = useContext(ExerciseContext) as ExerciseContextValue;
  const { setIndex, workoutIndex } = useContext(SetSlideContext);

  const selectedEquipment = useAppSelector(selectExerciseEquipment(workoutIndex, setIndex, exerciseIndex));
  const dispatch = useAppDispatch();

  return (
    <ApiHandlerWrapper error={error} isLoading={isLoading}> 
      <>
        {equipments && (
          <select 
            name="exercise-equipments" 
            id="exercise-equipments" 
            className={`p-2 text-white bg-transparent text-center border-white border-2 mb-2
        outline-none focus:bg-white focus:text-stone-800
        hover:scale-105 cursor-pointer
             active:opacity-75
       ${selectedEquipment && 'bg-white text-stone-800'}`}
            value={selectedEquipment?.id || ""}
            onChange={(e) => {
              dispatch(setExerciseEquipmentAction({
                equipment: (e.target.value === "none" || e.target.value === "") 
                  ? undefined 
                  : equipments.find(equipment => equipment.id === e.target.value),
                exerciseIndex,
                setIndex,
                workoutIndex
              }))
            }}
          >
            <option disabled value="" className='text-stone-400'>Selecione o equipamento (opcional)</option>
            {
              equipments && equipments.map(equipment => (
                <option className='text-stone-800' key={equipment.id} value={equipment.id}>{equipment.name}</option>
              ))
            }
            <option className='text-stone-800' value="none">Nenhum equipamento</option>
          </select>
        )}
      </>
    </ApiHandlerWrapper>
    
  )
}

export default EquipmentSelect