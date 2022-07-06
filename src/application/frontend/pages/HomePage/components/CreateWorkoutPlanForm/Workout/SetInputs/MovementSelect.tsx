import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseMovement, setExerciseMovementAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';
import { SetSlideContext } from '../SetSlideContext';
import { ExerciseContext } from './ExerciseContext';

const MovementSelect: React.FC = () => {
  const { movements: { data: movements } } = useContext(CreateWorkoutPlanFormContext);
  const { setIndex, workoutIndex } = useContext(SetSlideContext);

  const { exerciseIndex } = useContext(ExerciseContext);
 
  const selectedMovement = useAppSelector(selectExerciseMovement(workoutIndex, setIndex, exerciseIndex))
  const dispatch = useAppDispatch();

  return (
    <select 
      name="exercise-movements" 
      id="exercise-movements"
      className={`p-2 text-white text-center bg-transparent border-white border-2 mb-2 
      outline-none focus:bg-white focus:text-stone-800
      hover:scale-105 cursor-pointer
            active:opacity-75
      ${selectedMovement && 'bg-white text-stone-800'}`}
      value={selectedMovement?.id || ""}
      onChange={(e) => {
        if(movements){
          dispatch(setExerciseMovementAction({
            movement: movements.find(movement => movement.id === e.target.value),
            exerciseIndex,
            setIndex,
            workoutIndex
          }))
        }
      }}
    >
      <option value="" disabled className='text-stone-400'>Selecione o movimento</option>
      {
        movements && movements.map((movement) => (
          <option className='text-stone-800' key={movement.id} value={movement.id}>{movement.name}</option>
        ))
      }
    </select>
  )
}

export default MovementSelect