import React from 'react'
import { useExerciseTechniques } from '../useExerciseTechniques'

const ExerciseTechnique: React.FC = () => {
  const { error, isLoading, exerciseTechniques } = useExerciseTechniques();
  return (
    <div>
      <h3>Técnica do Exercício</h3>
      {
        exerciseTechniques && exerciseTechniques.map(exerciseTechnique => (
          <label key={exerciseTechnique.id} htmlFor={`exercise-technique-${exerciseTechnique.id}`}>
            {exerciseTechnique.name}
            <input type="radio" name="exercise-technique" id={`exercise-technique-${exerciseTechnique.id}`} value={exerciseTechnique.id} />
          </label>
        ))
      }
      <label htmlFor="none-exercise-technique">
        Nenhuma
        <input type="radio" name="exercise-technique" id="none-exercise-technique" />
      </label>
    </div>
  )
}

export default ExerciseTechnique 