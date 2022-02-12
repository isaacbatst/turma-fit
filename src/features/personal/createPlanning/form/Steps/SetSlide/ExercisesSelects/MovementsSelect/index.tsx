import { useDispatch } from 'react-redux';
import { SingleValue } from 'react-select';
import { MovementWithMuscleGroup } from '../../../../../../../../types/schema';
import { selectMovementAction } from '../../../../slice';
import { useSetSlideContext } from '../../SetSlideContext';
import CustomSelect from '../CustomSelect';

type Props = {
  movements: MovementWithMuscleGroup[]
}

const MovementsSelect: React.FC<Props> = ({ movements }) => {
  const dispatch = useDispatch();
  const { trainingIndex, setIndex } = useSetSlideContext();
  
  function handleMovementChange(selectedMovement: SingleValue<MovementWithMuscleGroup>) {
    dispatch(selectMovementAction({
      trainingIndex,
      setIndex,
      movement: selectedMovement
    }))
  }

  return (
    <>
      <CustomSelect<MovementWithMuscleGroup> 
        onChange={handleMovementChange}
        options={movements}
        placeholder="Selecione o exercício"
      />
    </>
  )
}

export default MovementsSelect