import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { addExerciseAction, selectExercises } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react';
import EquipmentSelect from './EquipmentSelect';
import GripRadio from './GripRadio';
import MovementSelect from './MovementSelect';

interface Props {
  workoutIndex: number,
  setIndex: number
}

const Exercises: React.FC<Props> = ({ setIndex, workoutIndex }) => {
  const exercises = useAppSelector(selectExercises(workoutIndex, setIndex))
  const dispatch = useAppDispatch();

  return (
    <div>
      <h5>Exercícios</h5>
      <button type="button" onClick={() => dispatch(addExerciseAction({ setIndex, workoutIndex }))} >+ Exercício</button>
      {
        exercises.map(exercise => (
          <div key={exercise.id}>
            <MovementSelect />
            <EquipmentSelect />
            <GripRadio />
          </div>
        ))
      }
    </div>
  )
}

export default Exercises