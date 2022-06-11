import React from 'react'
import PlanTypeRadios from './PlanTypeRadios'
import SetInputs from './SetInputs/SetInputs'

const CreateWorkoutPlanForm: React.FC = () => {
  return (
    <div>
      <h2>Criar plano de treino</h2>
      <form action="">
        <PlanTypeRadios />
        <div>
          <h3>Treino A</h3>
          <SetInputs />
          <button>+ Série</button>
        </div>
      </form>
    </div>
  )
}

export default CreateWorkoutPlanForm