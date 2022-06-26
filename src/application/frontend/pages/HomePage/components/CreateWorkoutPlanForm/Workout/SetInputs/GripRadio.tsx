import React, { useContext } from 'react'
import { Grip } from '@domain/entities/WorkoutPlan/enums/Grip';
import { ExerciseContext, ExerciseContextValue } from './ExerciseContext';
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseGrip, setExerciseGripAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';

const readableGrip: Record<Grip, string> = {
  NEUTRAL: 'Neutra',
  PRONATE: 'Pronada',
  SUPINE: 'Supinada'
}

const GripRadio: React.FC = () => {
  const { exerciseIndex, setIndex, workoutIndex } = useContext(ExerciseContext) as ExerciseContextValue;

  const selectedGrip = useAppSelector(selectExerciseGrip(workoutIndex, setIndex, exerciseIndex));
  const dispatch = useAppDispatch();
  
  return (
    <>
      {
        Object.values(Grip).map(grip => (
          <label key={grip} htmlFor={`grip-checkbox-${grip}`}>
            <input 
              type="checkbox" 
              name={`grip-checkbox`} 
              id={`grip-checkbox-${grip}`} 
              value={grip} 
              checked={grip === selectedGrip}
              onChange={(e) => dispatch(setExerciseGripAction({
                exerciseIndex,
                grip: e.target.checked ? grip : null,
                setIndex,
                workoutIndex
              }))}
            />
            {readableGrip[grip]}
          </label>
        ))
      }
    </>
  )
}

export default GripRadio