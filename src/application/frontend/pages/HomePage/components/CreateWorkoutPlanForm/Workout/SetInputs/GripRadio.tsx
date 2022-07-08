import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectExerciseGrip, setExerciseGripAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import { Grip } from '@domain/entities/WorkoutPlan/enums/Grip';
import React, { useContext, useState } from 'react';
import { readableGrip } from 'src/lib/grips';
import { SetSlideContext } from '../SetSlideContext';
import { ExerciseContext } from './ExerciseContext';

const GripRadio: React.FC = () => {
  const { exerciseIndex } = useContext(ExerciseContext);
  const { setIndex, workoutIndex } = useContext(SetSlideContext);
  const [showRadios, setShowRadios] = useState(false);
  const selectedGrip = useAppSelector(selectExerciseGrip(workoutIndex, setIndex, exerciseIndex));
  const dispatch = useAppDispatch();
  
  return (
    <div className='mb-2 flex flex-col'>
      {
        !showRadios && (
          <button 
            className='border-white border-2 py-2 hover:scale-105 cursor-pointer
            active:opacity-75'
            type='button'
            onClick={() => setShowRadios(!showRadios)}>
        Selecione a pegada (opcional)
          </button>
        )
      }
      {
        showRadios && (
          <div className='flex justify-between'>
            {
              Object.values(Grip).map(grip => (
                <div className='flex' key={grip}>
                  <input 
                    type="checkbox" 
                    className='appearance-none peer'
                    name={`grip-checkbox-${exerciseIndex}-${setIndex}-${workoutIndex}`} 
                    id={`grip-checkbox-${exerciseIndex}-${setIndex}-${workoutIndex}-${grip}`} 
                    value={grip} 
                    checked={grip === selectedGrip}
                    onChange={(e) => dispatch(setExerciseGripAction({
                      exerciseIndex,
                      grip: e.target.checked ? grip : null,
                      setIndex,
                      workoutIndex
                    }))}
                  />
                  <label  htmlFor={`grip-checkbox-${exerciseIndex}-${setIndex}-${workoutIndex}-${grip}`}
                    className='p-2 border-2 border-white block 
          peer-checked:bg-white peer-checked:text-blue-900
          hover:scale-105 cursor-pointer
            active:opacity-75'  
                  >
            
                    {readableGrip[grip]}
                  </label>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default GripRadio