import Alert from '@application/frontend/components/common/Alert'
import React, { useContext, useEffect } from 'react'
import { indexToLetter } from 'src/lib/letters'
import { useSwiper } from 'swiper/react'
import AddSetButton from './AddSetButton'
import FinishWorkoutButton from './FinishWorkoutButton'
import RemoveSetButton from './RemoveSetButton'
import SetInputs from './SetInputs/SetInputs'
import { SetSlideContext } from './SetSlideContext'


const SetSlide: React.FC = () => {
  const { setIndex, setsLength, workoutIndex, error } = useContext(SetSlideContext);
  const isLastSet = setIndex === setsLength - 1;
  const swiper = useSwiper();

  useEffect(() => {
    swiper.updateAutoHeight();
  }, [error, swiper])

  return (
    <>
      {error && <Alert message={error} />}
      <section className="py-3 px-2 pb-10 bg-lime-500">
        <h3 className='font-bold mb-2'>Treino {indexToLetter(workoutIndex)}</h3>
        <div className="flex flex-col">
          <SetInputs
            setIndex={setIndex} 
          />
          <div className="flex">
            {
              isLastSet && <AddSetButton 
                workoutIndex={workoutIndex} 
                setIndex={setIndex}
              />
            }
            {
              setsLength > 1 && (
                <RemoveSetButton 
                  isLastSet={isLastSet}
                  setIndex={setIndex}
                  workoutIndex={workoutIndex}
                />
              )
            }
          </div>
          {
            isLastSet && <FinishWorkoutButton />
          }
        </div>
      </section>
    </>
  )
}

export default SetSlide