import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addExercisesSeriesAction } from '../../slice';
import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';
import { useSwiperContext } from '../contexts/SwiperContext';

const AddExercisesSeriesButton: React.FC = () => {
  const { training } = useExercisesSeriesSlideContext();
  const { setShouldMoveToNext } = useSwiperContext()
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdOutlineAdd}
      text="Série de Exercícios"
      onClick={() => {
        dispatch(addExercisesSeriesAction(training.id))
        setShouldMoveToNext(true);
      }}
    />
  )
}

export default AddExercisesSeriesButton
