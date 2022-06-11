import React from 'react'
import { usePlanTypes } from './usePlanTypes'

const PlanTypeRadios: React.FC = () => {
  const { error, isLoading, planTypes } = usePlanTypes();

  return (
    <>
      <h3>Tipo de plano</h3>
      {
        error && <div role={"alert"}>
          Não consegui recuperar os tipos de plano, tente novamente mais tarde.
        </div>
      }
      {
        isLoading && <div>Loading</div>
      }
      {
        planTypes && planTypes.map(planType => (
          <label key={planType.id} htmlFor={`plan-type-${planType.id}`}>
            {planType.name}
            <input type="radio" name="plan-type" id={`plan-type-${planType.id}`} value={planType.id} />
          </label>
        ))
      }
    </>
  )
}

export default PlanTypeRadios