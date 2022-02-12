import { Equipment } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { SingleValue } from 'react-select';
import { selectEquipmentAction } from '../../../../slice';
import { useSetSlideContext } from '../../SetSlideContext';
import CustomSelect from '../CustomSelect';

type Props = {
  equipments: Equipment[]
}

const ExercisesSelects: React.FC<Props> = ({ equipments }) => {
  const dispatch = useDispatch();
  const { trainingIndex, setIndex } = useSetSlideContext();
  
  function handleMovementChange(selectedEquipment: SingleValue<Equipment>) {
    dispatch(selectEquipmentAction({
      trainingIndex,
      setIndex,
      equipment: selectedEquipment
    }))
  }

  return (
    <>
      <CustomSelect<Equipment> 
        onChange={handleMovementChange}
        options={equipments}
        placeholder="Equipamento (opcional)"
        clearable
      />
    </>
  )
}

export default ExercisesSelects