import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectPlanType, selectPlanTypeAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react'
import { useSelector } from 'react-redux';
import { usePlanTypes } from './usePlanTypes'

const PlanTypeRadios: React.FC = () => {
  const { error, isLoading, planTypes } = usePlanTypes();
  const selectedPlanType = useAppSelector(selectPlanType);
  const dispatch = useAppDispatch();

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
            <input 
              type="radio"  
              name="plan-type" 
              id={`plan-type-${planType.id}`} 
              value={planType.id} 
              checked={selectedPlanType?.id === planType.id} 
              onChange={() => dispatch(selectPlanTypeAction(planType))}
            />
          </label>
        ))
      }
    </>
  )
}

export default PlanTypeRadios