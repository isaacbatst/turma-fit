import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks'
import { addWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'
import CreateWorkoutPlanFormContextProvider from './CreateWorkoutPlanFormContextProvider'
import PlanTypeRadios from './PlanTypeRadios'
import Workout from './Workout/Workout'

const CreateWorkoutPlanForm: React.FC = () => {
  const workouts = useAppSelector(state => state.createWorkoutPlanForm.workouts, (workoutL, workoutR) => workoutL.length === workoutR.length);
  const dispatch = useAppDispatch();

  return (
    <CreateWorkoutPlanFormContextProvider>
      <div>
        <form action="">
          <h2>Criar plano de treino</h2>
          <div>
            <PlanTypeRadios />
          </div>
          <button type="button" onClick={() => dispatch(addWorkoutAction())}>+ Treino</button>
          {
            workouts.map((workout, workoutIndex) => (
              <Workout key={workout.id} workout={workout} workoutIndex={workoutIndex} />
            ))
          }
          <button>Finalizar Plano</button>
        </form>
      </div>
    </CreateWorkoutPlanFormContextProvider>
  )
}

export default CreateWorkoutPlanForm