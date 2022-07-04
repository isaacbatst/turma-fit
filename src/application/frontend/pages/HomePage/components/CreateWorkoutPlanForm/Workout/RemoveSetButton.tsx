import { useAppDispatch } from '@application/frontend/store/hooks';
import { removeSetAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useSwiper } from 'swiper/react'

interface Props {
  isLastSet: boolean,
  setIndex: number,
  workoutIndex: number
}

const RemoveSetButton: React.FC<Props> = ({
  isLastSet,
  setIndex,
  workoutIndex
}) => {
  const swiper = useSwiper();
  const dispatch = useAppDispatch();
  
  return (
    <button 
      type="button" 
      className={`border-2 border-white p-2 mb-2 
                          flex justify-center items-center 
                          ${!isLastSet && 'flex-1'}`}
      onClick={() => {
        swiper.once('slidePrevTransitionEnd', () => {
          dispatch(removeSetAction({ setIndex, workoutIndex }))
        })
        swiper.slidePrev();
      }}
    >
      <HiTrash className='mr-2' /> Set
    </button>  )
}

export default RemoveSetButton