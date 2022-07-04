import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectSetExerciseTechnique, setTechniqueAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';
import { SetSlideContext } from '../SetSlideContext';

const ExerciseTechnique: React.FC = () => {
  const { setIndex, workoutIndex } = useContext(SetSlideContext);
  const { techniques: { data } } = useContext(CreateWorkoutPlanFormContext);
  
  const selectedTechnique = useAppSelector(selectSetExerciseTechnique(workoutIndex, setIndex));
  const dispatch = useAppDispatch();

  return (
    <div className='mb-2'>
      <h5 className='mb-2'>Técnica do Set</h5>
      <div className="flex flex-wrap justify-center">
        {
          data && data.map(exerciseTechnique => (
            <div className='mb-1 mr-2' key={exerciseTechnique.id}>
              <input 
                type="checkbox" 
                name="exercise-technique"
                className='appearance-none peer hidden'
                id={`exercise-technique-${exerciseTechnique.id}`} 
                value={exerciseTechnique.id} 
                checked={selectedTechnique === exerciseTechnique.id}
                onChange={(e) => dispatch(setTechniqueAction({
                  setIndex,
                  techniqueId: e.target.checked ? exerciseTechnique.id : null,
                  workoutIndex
                }))}
              />
              <label 
                className='p-2 border-2 border-white block 
          peer-checked:bg-white peer-checked:text-blue-900'
                htmlFor={`exercise-technique-${exerciseTechnique.id}`}>
                {exerciseTechnique.name}
              </label>
            </div >
          ))
        }
      </div>
    </div>
  )
}

export default ExerciseTechnique 