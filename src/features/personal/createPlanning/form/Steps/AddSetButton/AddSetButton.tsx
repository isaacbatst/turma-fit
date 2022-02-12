import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addSetAction, saveSetAction } from '../../slice';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';
import { useSwiperContext } from '../SwiperContext';

const AddSetButton: React.FC = () => {
  const { setIndex, training, trainingIndex } = useSetSlideContext();
  const { setShouldMoveToNext } = useSwiperContext()
  const dispatch = useAppDispatch();

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
        setShouldMoveToNext(true);
      }}
    />
  )
}

export default AddSetButton
