import React from 'react'
import PlanTypeRadios from './PlanTypeRadios'

const CreateWorkoutPlanForm: React.FC = () => {

  return (
    <div>
      <h2>Criar plano de treino</h2>
      <form action="">
        <PlanTypeRadios />
      </form>
    </div>
  )
}

export default CreateWorkoutPlanForm