import React from 'react';
import { MdCheck } from 'react-icons/md';
import { useSwiper } from 'swiper/react';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { saveSetAction } from '../../slice';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { trainingIndex, setIndex } = useSetSlideContext()
  const training = useAppSelector((state) => state.personal.createPlanning.form.trainings[trainingIndex]);
  const swiper = useSwiper();
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdCheck}
      text="Treino"
      onClick={() => {
        swiper.slideNext();
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
