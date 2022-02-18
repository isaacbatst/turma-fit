import React from 'react';
import { MdCheck } from 'react-icons/md';
import { useSwiper } from 'swiper/react';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { saveSetAction } from '../../slice';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { training, trainingIndex, setIndex } = useSetSlideContext()
  const swiper = useSwiper();
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdCheck}
      text="Treino"
      onClick={() => {
        dispatch(saveSetAction({
          set: training.sets[setIndex],
          trainingIndex,
          setIndex
        }))
        swiper.slideNext();
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
