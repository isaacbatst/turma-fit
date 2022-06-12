import React, { useContext } from 'react';
import { CreateWorkoutPlanFormContext } from '../../CreateWorkoutPlanFormContext';

const ExerciseTechnique: React.FC = () => {
  const { techniques: { data } } = useContext(CreateWorkoutPlanFormContext);
  
  return (
    <div>
      <h5>Técnica da série</h5>
      {
        data && data.map(exerciseTechnique => (
          <label key={exerciseTechnique.id} htmlFor={`exercise-technique-${exerciseTechnique.id}`}>
            <input type="radio" name="exercise-technique" id={`exercise-technique-${exerciseTechnique.id}`} value={exerciseTechnique.id} />
            {exerciseTechnique.name}
          </label>
        ))
      }
      <label htmlFor="none-exercise-technique">
        <input type="radio" name="exercise-technique" id="none-exercise-technique" />
        Nenhuma
      </label>
    </div>
  )
}

export default ExerciseTechnique 