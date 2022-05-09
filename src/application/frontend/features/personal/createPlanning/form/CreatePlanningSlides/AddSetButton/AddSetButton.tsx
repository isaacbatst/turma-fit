import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import { useSwiper } from 'swiper/react';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch, useAppSelector } from '../../../../../../../../store/hooks';
import { addSetAction, saveSetAction } from '../../slice';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';

const AddSetButton: React.FC = () => {
  const { trainingIndex, setIndex } = useSetSlideContext();
  const training = useAppSelector((state) => state.personal.createPlanning.form.trainings[trainingIndex]);
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  return (
    <IconButtonWithText
      Icon={MdOutlineAdd}
      text="Série de Exercícios"
      onClick={() => {
        dispatch(addSetAction(training.id))
        swiper.slideNext();
      }}
    />
  )
}

export default AddSetButton
