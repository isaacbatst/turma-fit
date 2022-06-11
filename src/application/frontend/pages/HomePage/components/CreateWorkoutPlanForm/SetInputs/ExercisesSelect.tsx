import React from 'react'

const movements = ['Supino Reto', 'Desenvolvimento']

const ExercisesSelect: React.FC = () => {
  return (
    <div>
      <h5>Exercícios</h5>
      <select name="exercise-movement" id="exercise-movement" multiple>
        {
          movements.map(movement => (
            <option key={movement} value="movement">{movement}</option>
          ))
        }
      </select>
    </div>
  )
}

export default ExercisesSelect