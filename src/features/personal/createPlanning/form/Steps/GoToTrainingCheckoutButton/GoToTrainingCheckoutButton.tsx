import React from 'react';
import { MdCheck } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { saveTrainingAction } from '../../slice';
import { useSwiperContext } from '../contexts/SwiperContext';
import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { setShouldMoveToNext } = useSwiperContext();
  const { training, trainingIndex } = useExercisesSeriesSlideContext()
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdCheck}
      text="Treino"
      onClick={() => {
        dispatch(saveTrainingAction({
          training,
          trainingIndex
        }));
        setShouldMoveToNext(true)
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
