import React from 'react'

const planTypes = ['Hipertrofia', 'Força', 'Resistência']

const CreateWorkoutPlanForm: React.FC = () => {

  return (
    <div>
      <h2>Criar plano de treino</h2>
      <form action="">
        {planTypes.map(planType => (
          <label key={planType} htmlFor={`plan-type-${planType}`}>
            {planType}
            <input type="radio" name="plan-type" id={`plan-type-${planType}`} value={planType} />
          </label>
        ))}
      </form>
    </div>
  )
}

export default CreateWorkoutPlanForm