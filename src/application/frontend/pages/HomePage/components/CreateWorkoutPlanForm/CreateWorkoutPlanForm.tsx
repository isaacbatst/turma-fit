import { useAppDispatch } from '@application/frontend/store/hooks'
import { addWorkoutAction, selectError } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React from 'react'
import { useSelector } from 'react-redux'
import CreateWorkoutPlanFormContextProvider from './CreateWorkoutPlanFormContextProvider'
import PlanTypeRadios from './PlanTypeRadios'
import SubmitWorkoutPlanButton from './SubmitWorkoutPlanButton'
import WorkoutsList from './WorkoutsList'

const CreateWorkoutPlanForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);

  return (
    <CreateWorkoutPlanFormContextProvider>
      <form action="">
        <PlanTypeRadios />
        <button type="button" onClick={() => dispatch(addWorkoutAction())}>+ Treino</button>
        <WorkoutsList />
        <SubmitWorkoutPlanButton />
        {
          error && <div>{error}</div>
        }
      </form>
    </CreateWorkoutPlanFormContextProvider>
  )
}

export default CreateWorkoutPlanForm