import { Movement } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { SingleValue } from 'react-select';
import { selectMovementAction } from '../../../../slice';
import { useSetSlideContext } from '../../SetSlideContext';
import CustomSelect from '../CustomSelect';

type Props = {
  movements: Movement[]
}

const MovementsSelect: React.FC<Props> = ({ movements }) => {
  const dispatch = useDispatch();
  const { trainingIndex, setIndex } = useSetSlideContext();
  
  function handleMovementChange(selectedMovement: SingleValue<Movement>) {
    dispatch(selectMovementAction({
      trainingIndex,
      setIndex,
      movement: selectedMovement
    }))
  }

  return (
    <>
      <CustomSelect<Movement> 
        onChange={handleMovementChange}
        options={movements}
        placeholder="Selecione o exercício"
      />
    </>
  )
}

export default MovementsSelect