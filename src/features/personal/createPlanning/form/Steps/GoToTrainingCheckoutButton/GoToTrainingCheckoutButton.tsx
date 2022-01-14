import React from 'react'
import { MdCheck } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addTrainingAction } from '../../slice';
import { useSwiperContext } from '../contexts/SwiperContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { setShouldMoveToNext } = useSwiperContext()
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdCheck}
      text="Treino"
      onClick={() => {
        dispatch(addTrainingAction());
        setShouldMoveToNext(true)
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
