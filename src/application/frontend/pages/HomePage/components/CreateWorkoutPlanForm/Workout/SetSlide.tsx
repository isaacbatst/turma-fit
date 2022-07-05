import { useAppSelector } from '@application/frontend/store/hooks'
import { selectSetId } from '@application/frontend/store/slices/CreateWorkoutPlanForm'
import React, { useContext } from 'react'
import { indexToLetter } from 'src/lib/letters'
import AddSetButton from './AddSetButton'
import FinishWorkoutButton from './FinishWorkoutButton'
import RemoveSetButton from './RemoveSetButton'
import SetInputs from './SetInputs/SetInputs'
import { SetSlideContext } from './SetSlideContext'


const SetSlide: React.FC = () => {
  const { setIndex, setsLength, workoutIndex } = useContext(SetSlideContext);
  const setId = useAppSelector(selectSetId(workoutIndex, setIndex));
  const isLastSet = setIndex === setsLength - 1;

  return (
    <section className="py-3 px-2 pb-10 bg-lime-400">
      <h3 className='font-bold mb-2'>Treino {indexToLetter(workoutIndex)}</h3>
      <div className="flex flex-col">
        <SetInputs
          id={setId} 
          setIndex={setIndex} 
          workoutIndex={workoutIndex}
        />
        <div className="flex">
          {
            isLastSet && <AddSetButton workoutIndex={workoutIndex} />
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
  )
}

export default SetSlide