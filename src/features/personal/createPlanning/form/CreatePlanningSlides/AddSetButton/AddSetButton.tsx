import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import { useSwiper } from 'swiper/react';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addSetAction, saveSetAction } from '../../slice';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';

const AddSetButton: React.FC = () => {
  const { setIndex, training, trainingIndex } = useSetSlideContext();
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  return (
    <IconButtonWithText
      Icon={MdOutlineAdd}
      text="Série de Exercícios"
      onClick={() => {
        dispatch(saveSetAction({
          set: training.sets[setIndex],
          trainingIndex,
          setIndex
        }))
        dispatch(addSetAction(training.id))
        swiper.slideNext();
      }}
    />
  )
}

export default AddSetButton
