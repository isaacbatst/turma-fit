import React from 'react';
import { MdCheck } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { saveSetAction } from '../../slice';
import { useSwiperContext } from '../SwiperContext';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { setShouldMoveToNext } = useSwiperContext();
  const { training, trainingIndex, setIndex } = useSetSlideContext()
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
        setShouldMoveToNext(true)
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
