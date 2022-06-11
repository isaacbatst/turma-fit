import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { addSetAction, addWorkoutAction, removeWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import { Letter } from '@domain/entities/WorkoutPlan/enums/Letter'
import React from 'react'
import PlanTypeRadios from './PlanTypeRadios'
import SetInputs from './SetInputs/SetInputs'

const indexToLetter = (index: number) => Object.keys(Letter)[index]; 

const CreateWorkoutPlanForm: React.FC = () => {
  const workouts = useAppSelector(state => state.createWorkoutPlanForm.workouts);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Criar plano de treino</h2>
      <form action="">
        <PlanTypeRadios />
        {
          workouts.map((workout, workoutIndex) => (
            <div key={workout.id}>
              <h3>Treino {indexToLetter(workoutIndex)}</h3>
              <button 
                type="button" 
                onClick={() => dispatch(removeWorkoutAction({ workoutIndex }))
                }>
                  Remover treino
              </button>
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
              <button type="button" onClick={() => dispatch(addSetAction({ workoutIndex: workoutIndex }))}>+ Série</button>
            </div>
          ))
        }
        <button type="button" onClick={() => dispatch(addWorkoutAction())}>+ Treino</button>
        <button>Finalizar Plano</button>
      </form>
    </div>
  )
}

export default CreateWorkoutPlanForm