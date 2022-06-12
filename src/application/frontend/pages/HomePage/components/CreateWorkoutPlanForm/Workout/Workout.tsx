import { useAppDispatch } from '@application/frontend/store/hooks'
import { addSetAction, CreateWorkoutPlanFormWorkout, removeWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import { Letter } from '@domain/entities/WorkoutPlan/enums/Letter'
import React from 'react'
import SetInputs from '../SetInputs/SetInputs'
import AerobicMinutesInput from './AerobicMinutesInput'
import WorkoutDayRadio from './WorkoutDayRadio'

type Props = {
  workout: CreateWorkoutPlanFormWorkout,
  workoutIndex: number
}

const indexToLetter = (index: number) => Object.keys(Letter)[index]; 

const Workout: React.FC<Props> = ({ workout, workoutIndex }) => {
  const dispatch = useAppDispatch();

  return (
    <div key={workout.id}>
      <h3>Treino {indexToLetter(workoutIndex)}</h3>
      <button 
        type="button" 
        onClick={() => dispatch(removeWorkoutAction({ workoutIndex }))
        }>
        Remover treino
      </button>
      <button type="button" onClick={() => dispatch(addSetAction({ workoutIndex: workoutIndex }))}>+ Série</button>
      <AerobicMinutesInput workoutId={workout.id} workoutIndex={workoutIndex} />
      <WorkoutDayRadio workoutId={workout.id} workoutIndex={workoutIndex} />
      {
        workout.sets.map((set, setIndex) => (
          <SetInputs
            id={set.id} 
            setIndex={setIndex} 
            workoutIndex={workoutIndex}
            key={set.id} 
          />
        ))
      }
    </div>
  )
}

export default Workout