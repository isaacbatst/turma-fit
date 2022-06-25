import { useAppDispatch } from '@application/frontend/store/hooks'
import { addWorkoutAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'
import CreateWorkoutPlanFormContextProvider from './CreateWorkoutPlanFormContextProvider'
import PlanTypeRadios from './PlanTypeRadios'
import WorkoutsList from './WorkoutsList'

const CreateWorkoutPlanForm: React.FC = () => {
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
          <WorkoutsList />
          
        </form>
      </div>
    </CreateWorkoutPlanFormContextProvider>
  )
}

export default CreateWorkoutPlanForm