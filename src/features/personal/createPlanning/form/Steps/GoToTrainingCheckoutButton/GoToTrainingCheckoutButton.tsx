import React from 'react';
import { MdCheck } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { saveExercisesSeriesAction } from '../../slice';
import { useSwiperContext } from '../contexts/SwiperContext';
import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { setShouldMoveToNext } = useSwiperContext();
  const { training, trainingIndex, exercisesSeriesIndex } = useExercisesSeriesSlideContext()
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdCheck}
      text="Treino"
      onClick={() => {
        dispatch(saveExercisesSeriesAction({
          exercisesSeries: training.exercisesSeries[exercisesSeriesIndex],
          trainingIndex,
          exercisesSeriesIndex
        }))
        setShouldMoveToNext(true)
      }}
    />
  )
}

export default GoToTrainingCheckoutButton
