import React from 'react'
import { usePlanTypes } from './usePlanTypes'

const planTypes = ['Hipertrofia', 'Força', 'Resistência']

const PlanTypeRadios: React.FC = () => {
  const { error, isLoading, planTypes } = usePlanTypes();
  console.log(planTypes)
  return (
    <>
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