import Loading from '@application/frontend/components/common/Loading';
import { useAppDispatch, useAppSelector } from '@application/frontend/store/hooks';
import { selectPlanType, selectPlanTypeAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import { usePlanTypes } from './usePlanTypes';

const PlanTypeRadios: React.FC = () => {
  const { error, isLoading, planTypes } = usePlanTypes();
  const selectedPlanType = useAppSelector(selectPlanType);
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  useEffect(() => {
    if(planTypes){
      swiper.updateAutoHeight();
    }
  }, [planTypes, swiper])

  return (
    <>
      <h2 className='mb-4'>Crie seu treino <span className='font-bold'>agora</span>!</h2>
      <h3 className='text-center mb-3 text-sm'>Tipo de treino</h3>
      {
        error && <div role={"alert"}>
          Não consegui recuperar os tipos de plano, tente novamente mais tarde.
        </div>
      }
      {
        isLoading && <Loading />
      }
      <div className='mb-3 flex justify-center flex-wrap'>
        {
          planTypes && planTypes.map(planType => (
            <div key={planType.id} className="flex mb-3 text-sm">
              <input 
                type="radio"  
                name="plan-type" 
                className='appearance-none peer'
                id={`plan-type-${planType.id}`} 
                value={planType.id} 
                checked={selectedPlanType?.id === planType.id} 
                onClick={() => swiper.slideNext()}
                onChange={() => dispatch(selectPlanTypeAction({ selectedPlanType: planType }))}
              />
              <label 
                className='p-3 mx-2 border-2 border-white block 
                  peer-checked:bg-white peer-checked:text-blue-900
                  hover:scale-105 cursor-pointer
                  active:opacity-75'  
                key={planType.id} htmlFor={`plan-type-${planType.id}`}>
                {planType.name}
              </label>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default PlanTypeRadios