import React, { useContext } from 'react'
import { WorkoutContext } from './WorkoutContext'

const Workout: React.FC = () => {
  const { workout } = useContext(WorkoutContext);
  
  return (
    <section>
      <div>
        <h2>Treino {workout.letter}</h2>
      </div>
    </section>
  )
}

export default Workout