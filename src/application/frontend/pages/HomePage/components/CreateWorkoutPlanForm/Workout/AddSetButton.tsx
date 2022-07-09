import { useAppDispatch } from '@application/frontend/store/hooks';
import { addSetAction } from '@application/frontend/store/slices/CreateWorkoutPlanForm';
import React, { useContext } from 'react';
import { useSwiper } from 'swiper/react';
import { SetSlideContext } from './SetSlideContext';

interface Props {
  workoutIndex: number,
  setIndex: number
}


const AddSetButton: React.FC<Props> = ({ workoutIndex, setIndex }) => {
  const dispatch = useAppDispatch();
  const swiper = useSwiper();
  const { validateSet } = useContext(SetSlideContext);

  return (
    <button 
      type="button" 
      className='border-2 flex-1 border-white py-2 mr-1 mb-2 flex justify-center items-center
      hover:scale-105 cursor-pointer
            active:opacity-75'
      onClick={() => {
        const isValid = validateSet();

        if(isValid){
          dispatch(addSetAction({ workoutIndex: workoutIndex }))
          swiper.slideNext();
        }

      }}>
      Adicionar Set
    </button>
  )
}

export default AddSetButton