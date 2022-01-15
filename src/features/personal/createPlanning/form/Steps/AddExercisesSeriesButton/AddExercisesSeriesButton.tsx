import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addExercisesSeriesAction, saveExercisesSeriesAction } from '../../slice';
import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';
import { useSwiperContext } from '../contexts/SwiperContext';

const AddExercisesSeriesButton: React.FC = () => {
  const { exercisesSeriesIndex, training, trainingIndex } = useExercisesSeriesSlideContext();
  const { setShouldMoveToNext } = useSwiperContext()
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      Icon={MdOutlineAdd}
      text="Série de Exercícios"
      onClick={() => {
        dispatch(saveExercisesSeriesAction({
          exercisesSeries: training.exercisesSeries[exercisesSeriesIndex],
          trainingIndex,
          exercisesSeriesIndex
        }))
        dispatch(addExercisesSeriesAction(training.id))
        setShouldMoveToNext(true);
      }}
    />
  )
}

export default AddExercisesSeriesButton
