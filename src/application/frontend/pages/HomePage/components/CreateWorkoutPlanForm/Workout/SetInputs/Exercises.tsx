import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { addExerciseAction, removeExerciseAction, selectExercises } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react';
import EquipmentSelect from './EquipmentSelect';
import { ExerciseContextProvider } from './ExerciseContext';
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
        exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id}>
            <ExerciseContextProvider
              exerciseIndex={exerciseIndex}
              setIndex={setIndex}  
              workoutIndex={workoutIndex}
            >
              <MovementSelect />
              <EquipmentSelect />
              <GripRadio />
              <button 
                type="button" 
                onClick={() => dispatch(removeExerciseAction({
                  exerciseIndex,
                  setIndex,
                  workoutIndex
                }))}
              >
              Remover exercício
              </button>
            </ExerciseContextProvider>
          </div>
        ))
      }
    </div>
  )
}

export default Exercises