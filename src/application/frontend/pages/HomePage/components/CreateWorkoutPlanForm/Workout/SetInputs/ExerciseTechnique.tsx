import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectSetExerciseTechnique, setTechniqueAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';

interface Props {
  workoutIndex: number,
  setIndex: number
}

const ExerciseTechnique: React.FC<Props> = ({ setIndex, workoutIndex }) => {

  const { techniques: { data } } = useContext(CreateWorkoutPlanFormContext);
  
  const selectedTechnique = useAppSelector(selectSetExerciseTechnique(workoutIndex, setIndex));
  const dispatch = useAppDispatch();
  

  return (
    <div>
      <h5>Técnica da série</h5>
      {
        data && data.map(exerciseTechnique => (
          <label key={exerciseTechnique.id} htmlFor={`exercise-technique-${exerciseTechnique.id}`}>
            <input 
              type="checkbox" 
              name="exercise-technique" 
              id={`exercise-technique-${exerciseTechnique.id}`} 
              value={exerciseTechnique.id} 
              checked={selectedTechnique === exerciseTechnique.id}
              onChange={(e) => dispatch(setTechniqueAction({
                setIndex,
                techniqueId: e.target.checked ? exerciseTechnique.id : null,
                workoutIndex
              }))}
            />
            {exerciseTechnique.name}
          </label>
        ))
      }
    </div>
  )
}

export default ExerciseTechnique 