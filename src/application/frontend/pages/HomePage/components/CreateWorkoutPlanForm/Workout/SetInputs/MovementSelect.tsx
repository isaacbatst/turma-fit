import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseMovement, setExerciseMovementAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';
import { ExerciseContext, ExerciseContextValue } from './ExerciseContext';

const MovementSelect: React.FC = () => {
  const { movements: { data } } = useContext(CreateWorkoutPlanFormContext);
  const { exerciseIndex, setIndex, workoutIndex } = useContext(ExerciseContext) as ExerciseContextValue;
 
  const selectedMovement = useAppSelector(selectExerciseMovement(workoutIndex, setIndex, exerciseIndex))
  const dispatch = useAppDispatch();

  return (
    <select 
      name="exercise-movements" 
      id="exercise-movements"
      value={selectedMovement}
      onChange={(e) => dispatch(setExerciseMovementAction({
        movementId: e.target.value,
        exerciseIndex,
        setIndex,
        workoutIndex
      }))}
    >
      <option value="" disabled>Movimento</option>
      {
        data && data.map(movement => (
          <option key={movement.id} value={movement.id}>{movement.name}</option>
        ))
      }
    </select>
  )
}

export default MovementSelect